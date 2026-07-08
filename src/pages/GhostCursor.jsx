import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const GhostCursor = ({
  className,
  style,

  trailLength = 50,
  inertia = 0.5,

  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1.0,
  bloomThreshold = 0.025,

  brightness = 1,
  color = '#B19EEF',
  mixBlendMode = 'screen',
  edgeIntensity = 0,

  maxDevicePixelRatio = 1,
  targetPixels,

  fadeDelayMs,
  fadeDurationMs,

  zIndex = 10
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const materialRef = useRef(null);
  const bloomPassRef = useRef(null);
  const filmPassRef = useRef(null);

  const trailBufRef = useRef([]);
  const headRef = useRef(0);

  const rafRef = useRef(null);
  const resizeObsRef = useRef(null);
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const fadeOpacityRef = useRef(1.0);
  const lastMoveTimeRef = useRef(performance.now());
  const pointerActiveRef = useRef(false);
  const runningRef = useRef(false);

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec2 iMouse;
    uniform vec2 iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3 iBaseColor;
    uniform float iBrightness;
    varying vec2 vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main(){
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0)
                * vec2(iResolution.x / iResolution.y, 1.0);

      vec3 col = vec3(0.0);
      float a = 0.0;

      for(int i=0;i<MAX_TRAIL_LENGTH;i++){
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        vec2 m = (iPrevMouse[i] * 2.0 - 1.0)
                 * vec2(iResolution.x / iResolution.y, 1.0);
        float d = length(uv - m);
        float f = smoothstep(0.4, 0.0, d) * t;
        col += iBaseColor * f;
        a += f;
      }

      col *= iBrightness;
      gl_FragColor = vec4(col, a * iOpacity);
    }
  `;

  const FilmGrainShader = useMemo(() => ({
    uniforms: {
      tDiffuse: { value: null },
      iTime: { value: 0 },
      intensity: { value: grainIntensity }
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float iTime;
      uniform float intensity;
      varying vec2 vUv;
      float hash(float n){ return fract(sin(n)*43758.5453); }
      void main(){
        vec4 c = texture2D(tDiffuse, vUv);
        float n = hash(vUv.x*1000. + vUv.y*2000. + iTime);
        c.rgb += n * intensity;
        gl_FragColor = c;
      }
    `
  }), [grainIntensity]);

  useEffect(() => {
    const host = containerRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.mixBlendMode = mixBlendMode;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    trailBufRef.current = Array.from({ length: trailLength }, () => new THREE.Vector2(0.5, 0.5));

    const mat = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: trailLength },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },
        iOpacity: { value: 1 },
        iScale: { value: 1 },
        iBaseColor: { value: new THREE.Color(color) },
        iBrightness: { value: brightness }
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true
    });
    materialRef.current = mat;

    scene.add(new THREE.Mesh(geom, mat));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);
    composer.addPass(bloom);

    const grain = new ShaderPass(FilmGrainShader);
    composer.addPass(grain);

    const resize = () => {
      const r = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, maxDevicePixelRatio);
      renderer.setPixelRatio(dpr);
      renderer.setSize(r.width, r.height, false);
      composer.setSize(r.width * dpr, r.height * dpr);
      mat.uniforms.iResolution.value.set(r.width * dpr, r.height * dpr, 1);
    };

    resize();
    resizeObsRef.current = new ResizeObserver(resize);
    resizeObsRef.current.observe(parent);

    const animate = t => {
      mat.uniforms.iTime.value = t * 0.001;
      composer.render();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const move = e => {
      const r = parent.getBoundingClientRect();
      currentMouseRef.current.set(
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height
      );
      mat.uniforms.iMouse.value.copy(currentMouseRef.current);
    };

    parent.addEventListener('pointermove', move);

    return () => {
      parent.removeEventListener('pointermove', move);
      resizeObsRef.current?.disconnect();
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, zIndex, ...style }}
    />
  );
};

export default GhostCursor;
