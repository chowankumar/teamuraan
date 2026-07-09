import React, { useEffect, useRef } from "react";
import * as THREE from 'three';

const Scene = () => {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_res: { value: new THREE.Vector2(width, height) },
        u_color: { value: new THREE.Color("#FE8535") }
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_res;
        uniform vec3 u_color;
        varying vec2 vUv;
        float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec2 st = gl_FragCoord.xy / u_res.xy;
          float aspect = u_res.x / u_res.y;
          st.x *= aspect;
          vec2 m = u_mouse;
          m.x *= aspect;
          float d = distance(st, m);
          float glow = 0.08 / (d + 0.15);
          float n = noise(st + u_time * 0.1);
          glow *= (0.8 + n * 0.2);
          float alpha = smoothstep(0.8, 0.2, d);
          gl_FragColor = vec4(u_color, glow * alpha * 0.6);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      targetMouse.current.x = (e.clientX - rect.left) / rect.width;
      targetMouse.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    let animationId;
    const animate = (t) => {
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;
      material.uniforms.u_time.value = t * 0.001;
      material.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default Scene;