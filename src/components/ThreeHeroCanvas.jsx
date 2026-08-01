import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    let animId;

    // Viewport IntersectionObserver to pause WebGL rendering loop when offscreen (High Performance 120 FPS Scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!animId) animate();
          } else {
            if (animId) {
              cancelAnimationFrame(animId);
              animId = null;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.8;

    // Optimized Renderer setup (Capped pixel ratio for mobile GPU performance)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Responsive Geometry: TorusKnot
    const isMobile = window.innerWidth < 768;
    const geometry = new THREE.TorusKnotGeometry(
      isMobile ? 1.0 : 1.2,
      isMobile ? 0.32 : 0.38,
      isMobile ? 80 : 120,
      isMobile ? 20 : 28,
      2,
      3
    );

    // Custom Physical Material with glossy metallic pink-purple sheen
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ff2a85'),
      emissive: new THREE.Color('#3a0ca3'),
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Pink Neon Point Light
    const lightPink = new THREE.PointLight(0xff2a85, 4, 20);
    lightPink.position.set(4, 4, 4);
    scene.add(lightPink);

    // Purple Point Light
    const lightPurple = new THREE.PointLight(0x9d4edd, 4, 20);
    lightPurple.position.set(-4, -4, 2);
    scene.add(lightPurple);

    // Cyan Accent Light
    const lightCyan = new THREE.PointLight(0x00f5d4, 2, 15);
    lightCyan.position.set(0, 5, -2);
    scene.add(lightCyan);

    // Interaction Handlers (Mouse & Touch for Mobile)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (clientX, clientY) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (clientX - windowHalfX) / windowHalfX;
      mouseY = (clientY - windowHalfY) / windowHalfY;

      targetRotationY = mouseX * 0.7;
      targetRotationX = mouseY * 0.7;
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.007;

      // Smooth tilt lerp
      torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.05;

      // Floating wave movement
      torusKnot.position.y = Math.sin(elapsedTime * 1.4) * 0.12;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[280px] sm:h-[360px] lg:h-[460px] touch-none" />;
}
