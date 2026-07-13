/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  type: 'hero-sphere' | 'clapperboard' | 'brand-nexus' | 'celebrity-star' | 'creative-sculpt' | 'youtube-play';
}

export default function ThreeCanvas({ type }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- SETUP SCENE & CAMERA ---
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12;

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // Accent directional light based on page type
    const accentLight = new THREE.PointLight(0xffffff, 2, 50);
    accentLight.position.set(-5, -3, 3);
    scene.add(accentLight);

    // Set colors according to theme
    let accentColorHex = 0xe0a96d; // Gold default
    if (type === 'brand-nexus') accentColorHex = 0x3a86ff; // Blue
    else if (type === 'celebrity-star') accentColorHex = 0xfcfcfc; // Silver/White
    else if (type === 'creative-sculpt') accentColorHex = 0xec4899; // Pink
    else if (type === 'youtube-play') accentColorHex = 0xef4444; // Red

    accentLight.color.setHex(accentColorHex);

    // --- GROUP & GEOMETRIES ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Visual elements to animate
    const animators: Array<(time: number, mx: number, my: number) => void> = [];

    // Particle Cloud (Universal backdrop)
    const particleCount = type === 'hero-sphere' ? 600 : 300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(accentColorHex);
    const c2 = new THREE.Color(0x0a0a0a);

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in space
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color interpolation: mix accent color with dark grey for depth
      const mixWeight = Math.random();
      const mixedColor = new THREE.Color().copy(c1).lerp(c2, mixWeight * 0.8);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Round particle texture using custom canvas helper
    const createCircleTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    animators.push((time) => {
      particles.rotation.y = time * 0.03;
      particles.rotation.x = time * 0.01;
    });

    // --- TYPE CHARACTERISTIC GEOMETRY ---
    if (type === 'hero-sphere') {
      // Core glowing golden wireframe sphere with orbit tracks
      const sphereGeo = new THREE.SphereGeometry(2.2, 24, 24);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0xe0a96d,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const solidCoreGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const solidCoreMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0xc18a4d,
        emissiveIntensity: 0.1,
        roughness: 0.2,
        metalness: 0.9,
        wireframe: false
      });

      const wireSphere = new THREE.Mesh(sphereGeo, wireframeMat);
      const coreSphere = new THREE.Mesh(solidCoreGeo, solidCoreMat);
      mainGroup.add(wireSphere);
      mainGroup.add(coreSphere);

      // Rings of light (orbits)
      const ringCount = 3;
      const rings: THREE.LineLoop[] = [];
      const ringColors = [0xe0a96d, 0x111111, 0x9a7147];

      for (let r = 0; r < ringCount; r++) {
        const ringGeo = new THREE.BufferGeometry();
        const pointsArr = [];
        const ringRadius = 2.8 + r * 0.3;
        const segments = 64;
        for (let s = 0; s <= segments; s++) {
          const u = (s / segments) * Math.PI * 2;
          pointsArr.push(Math.cos(u) * ringRadius, Math.sin(u) * ringRadius, 0);
        }
        ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(pointsArr, 3));
        const ringMat = new THREE.LineBasicMaterial({
          color: ringColors[r % ringColors.length],
          transparent: true,
          opacity: 0.5 - r * 0.1
        });
        const ring = new THREE.LineLoop(ringGeo, ringMat);
        // Random slant
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        mainGroup.add(ring);
        rings.push(ring);
      }

      animators.push((time) => {
        wireSphere.rotation.y = time * 0.1;
        wireSphere.rotation.x = -time * 0.05;
        coreSphere.rotation.y = -time * 0.15;
        coreSphere.rotation.z = time * 0.08;

        rings.forEach((ring, i) => {
          ring.rotation.z = time * (0.05 * (i + 1));
          ring.rotation.y += Math.sin(time * 0.02) * 0.001;
        });
      });

    } else if (type === 'clapperboard') {
      // Cinematic rotating film reel / camera mechanism
      const outerTorusGeo = new THREE.TorusGeometry(2, 0.12, 12, 48);
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.1,
        metalness: 0.95,
        emissive: 0x5a4128,
        emissiveIntensity: 0.2
      });

      const innerTorusGeo = new THREE.TorusGeometry(1.6, 0.06, 8, 36);

      const mainReel = new THREE.Mesh(outerTorusGeo, metalMat);
      const secondaryReel = new THREE.Mesh(innerTorusGeo, metalMat);
      secondaryReel.rotation.x = Math.PI / 2;

      mainGroup.add(mainReel);
      mainGroup.add(secondaryReel);

      // Add film holes inside (using small spoke cylinders)
      const spokeCount = 6;
      const spokeGroup = new THREE.Group();
      for (let s = 0; s < spokeCount; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.1, 1.9, 0.05);
        const spoke = new THREE.Mesh(spokeGeo, metalMat);
        spoke.rotation.z = (s / spokeCount) * Math.PI;
        spokeGroup.add(spoke);
      }
      mainGroup.add(spokeGroup);

      animators.push((time) => {
        mainReel.rotation.y = time * 0.25;
        mainReel.rotation.z = time * 0.05;
        secondaryReel.rotation.y = -time * 0.12;
        spokeGroup.rotation.z = time * 0.25;
      });

    } else if (type === 'brand-nexus') {
      // Constellation / glowing network of connected brand nodes
      const nodeCount = 18;
      const nodeGroup = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x3a86ff });
      
      const nodePositions: THREE.Vector3[] = [];
      const nodeMeshArray: THREE.Mesh[] = [];

      for (let n = 0; n < nodeCount; n++) {
        // Distribute within sphere volume
        const rad = 2.4 * Math.pow(Math.random(), 0.5);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const pos = new THREE.Vector3(
          rad * Math.sin(phi) * Math.cos(theta),
          rad * Math.sin(phi) * Math.sin(theta),
          rad * Math.cos(phi)
        );

        nodePositions.push(pos);

        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(pos);
        nodeGroup.add(nodeMesh);
        nodeMeshArray.push(nodeMesh);
      }

      mainGroup.add(nodeGroup);

      // Create lines connecting adjacent nodes
      const linePositions: number[] = [];
      // Connect nodes that are close to each other
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const d = nodePositions[i].distanceTo(nodePositions[j]);
          if (d < 1.8) {
            linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
            linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
          }
        }
      }

      const connectionGeo = new THREE.BufferGeometry();
      connectionGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      const connectionMat = new THREE.LineBasicMaterial({
        color: 0x3a86ff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });

      const connections = new THREE.LineSegments(connectionGeo, connectionMat);
      mainGroup.add(connections);

      animators.push((time) => {
        nodeGroup.rotation.y = time * 0.15;
        nodeGroup.rotation.x = time * 0.08;
        connections.rotation.y = time * 0.15;
        connections.rotation.x = time * 0.08;

        // Soft ripple node scaling
        nodeMeshArray.forEach((mesh, index) => {
          const scale = 1 + Math.sin(time * 1.5 + index * 0.6) * 0.25;
          mesh.scale.set(scale, scale, scale);
        });
      });

    } else if (type === 'celebrity-star') {
      // Spinning geometric elite crystal star + outer glowing orbit
      // Standard geometry representing an elite star (Dodecahedron looks highly sophisticated)
      const outerStarGeo = new THREE.DodecahedronGeometry(1.6, 0);
      const goldReflectMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.02,
        metalness: 0.95,
        emissive: 0x1a1a1a,
        flatShading: true
      });

      const crystalStar = new THREE.Mesh(outerStarGeo, goldReflectMat);
      mainGroup.add(crystalStar);

      const floatingRingGeo = new THREE.RingGeometry(2.1, 2.15, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });

      const orbitRing = new THREE.Mesh(floatingRingGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 2;
      mainGroup.add(orbitRing);

      animators.push((time) => {
        crystalStar.rotation.y = time * 0.3;
        crystalStar.rotation.x = time * 0.1;
        orbitRing.rotation.y = -time * 0.05;
        orbitRing.rotation.z = Math.sin(time * 0.4) * 0.12;
      });

    } else if (type === 'creative-sculpt') {
      // Rotating torus knot representing fluid/dynamic creative imagination
      const torusKnotGeo = new THREE.TorusKnotGeometry(1.3, 0.35, 100, 16, 2, 3);
      const fluidMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0x301020,
        flatShading: false
      });

      const sculpt = new THREE.Mesh(torusKnotGeo, fluidMat);
      mainGroup.add(sculpt);

      const ringOuterGeo = new THREE.TorusGeometry(2.3, 0.05, 8, 32);
      const ringOuterMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.7
      });
      const sculptRing = new THREE.Mesh(ringOuterGeo, ringOuterMat);
      sculptRing.rotation.x = Math.PI / 4;
      mainGroup.add(sculptRing);

      animators.push((time) => {
        sculpt.rotation.y = time * 0.22;
        sculpt.rotation.z = time * 0.12;
        sculpt.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05);
        sculptRing.rotation.y = -time * 0.1;
      });

    } else if (type === 'youtube-play') {
      // Abstract vector play rings representing algorithmic video flow
      const vortexGroup = new THREE.Group();
      mainGroup.add(vortexGroup);

      const circleMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.2,
        metalness: 0.8,
        side: THREE.DoubleSide
      });

      // Render overlapping geometric layers
      const layersCount = 4;
      const vortexLayers: THREE.Mesh[] = [];

      for (let l = 0; l < layersCount; l++) {
        // Outer rings
        const ringRad = 0.8 + l * 0.45;
        const width = 0.1 + l * 0.02;
        const frameGeo = new THREE.RingGeometry(ringRad, ringRad + width, 32);
        const layer = new THREE.Mesh(frameGeo, circleMat);
        layer.position.z = -l * 0.25;
        vortexGroup.add(layer);
        vortexLayers.push(layer);
      }

      // Inside play icon cylinder representation
      const centerConeGeo = new THREE.ConeGeometry(0.7, 0.8, 3);
      const coreCone = new THREE.Mesh(centerConeGeo, new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x5a1818,
        metalness: 0.9,
        roughness: 0.1
      }));
      coreCone.rotation.z = -Math.PI / 2; // Point sideways like play button
      coreCone.rotation.x = Math.PI / 2;
      mainGroup.add(coreCone);

      animators.push((time) => {
        vortexGroup.rotation.y = time * 0.15;
        vortexGroup.rotation.x = time * 0.08;

        vortexLayers.forEach((layer, l) => {
          layer.rotation.z = time * (0.05 * (l + 1)) * (l % 2 === 0 ? 1 : -1);
          layer.position.z = -l * 0.25 + Math.sin(time + l) * 0.12;
        });

        coreCone.rotation.y = -time * 0.4;
      });
    }

    // --- INTERACTIVE MOUSE TRACKING ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Calculate normalized coordinates (-1 to +1) centering screen
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = ((x / rect.width) * 2 - 1) * 1.5;
      targetY = -((y / rect.height) * 2 - 1) * 1.5;
    };

    container.addEventListener('mousemove', onMouseMove);

    // --- ANIMATION LOOP ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth lag / interpolation on mouse input
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation/tilt using mouse coordinates
      mainGroup.rotation.y = mouseX * 0.4;
      mainGroup.rotation.x = -mouseY * 0.4;

      // Execute custom animation scripts
      animators.forEach((anim) => anim(time, mouseX, mouseY));

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // --- RESPONSIVE RESIZE OBSERVATION ---
    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!entries || entries.length === 0) return;
        const entry = entries[0];
        
        // Ensure container is still mounted
        if (!containerRef.current) return;
        
        const w = entry.contentRect.width || container.clientWidth;
        const h = entry.contentRect.height || container.clientHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
      });
    });

    resizeObserver.observe(container);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
      id={`canvas-container-${type}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" id={`3d-canvas-${type}`} />
    </div>
  );
}
