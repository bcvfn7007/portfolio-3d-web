import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3D Geometry: TorusKnot
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);

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

    // Lighting
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

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / windowHalfX;
      mouseY = (e.clientY - windowHalfY) / windowHalfY;

      targetRotationY = mouseX * 0.8;
      targetRotationX = mouseY * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.008;

      // Mouse tilt smooth lerp
      torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.05;

      // Floating wave movement
      torusKnot.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[350px] md:min-h-[450px]" />;
}
