'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DataCloudProps {
  scrollProgress: number;
  stage: number;
}

function ParticleCloud({ scrollProgress, stage }: DataCloudProps) {
  const ref = useRef<THREE.Points>(null);

  // Generate particle positions
  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Initial chaotic distribution
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Color variation based on data source type
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Amber - tax data
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.67;
        colors[i * 3 + 2] = 0.0;
      } else if (colorType < 0.6) {
        // Emerald - title data
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 0.53;
      } else {
        // Violet - zoning data
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.96;
      }

      // Size variation
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Subtle rotation based on stage
      const rotationSpeed = stage === 0 ? 0.05 : 0.02;
      ref.current.rotation.y = time * rotationSpeed;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;

      // Animate particles based on scroll progress and stage
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        
        if (stage === 0) {
          // Stage 0: Chaotic floating
          positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.002;
        } else if (stage === 1) {
          // Stage 1: Coalescing toward center
          const targetX = 0;
          const targetY = 0;
          const targetZ = 0;
          const speed = 0.02 * scrollProgress;
          
          positions[i3] += (targetX - positions[i3]) * speed;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * speed;
          positions[i3 + 2] += (targetZ - positions[i3 + 2]) * speed;
        } else if (stage === 2) {
          // Stage 2: Forming grid structure
          const gridSize = 10;
          const spacing = 1.5;
          const ix = i % gridSize;
          const iy = Math.floor(i / gridSize) % gridSize;
          const iz = Math.floor(i / (gridSize * gridSize));
          
          const targetX = (ix - gridSize / 2) * spacing;
          const targetY = (iy - gridSize / 2) * spacing;
          const targetZ = (iz - gridSize / 2) * spacing;
          
          const speed = 0.03 * scrollProgress;
          positions[i3] += (targetX - positions[i3]) * speed;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * speed;
          positions[i3 + 2] += (targetZ - positions[i3 + 2]) * speed;
        } else if (stage === 3) {
          // Stage 3: Valuation layers rising
          const gridSize = 10;
          const spacing = 1.5;
          const ix = i % gridSize;
          const iy = Math.floor(i / gridSize) % gridSize;
          const iz = Math.floor(i / (gridSize * gridSize));
          
          const baseX = (ix - gridSize / 2) * spacing;
          const baseY = (iy - gridSize / 2) * spacing;
          const baseZ = (iz - gridSize / 2) * spacing;
          
          // Add height based on value
          const valueHeight = Math.sin(ix * 0.5 + iy * 0.3) * 2 * scrollProgress;
          
          positions[i3] += (baseX - positions[i3]) * 0.05;
          positions[i3 + 1] += ((baseY + valueHeight) - positions[i3 + 1]) * 0.05;
          positions[i3 + 2] += (baseZ - positions[i3 + 2]) * 0.05;
        } else if (stage === 4) {
          // Stage 4: Investor matching
          const gridSize = 10;
          const spacing = 1.5;
          const ix = i % gridSize;
          const iy = Math.floor(i / gridSize) % gridSize;
          const iz = Math.floor(i / (gridSize * gridSize));
          
          const baseX = (ix - gridSize / 2) * spacing;
          const baseY = (iy - gridSize / 2) * spacing;
          const baseZ = (iz - gridSize / 2) * spacing;
          
          const valueHeight = Math.sin(ix * 0.5 + iy * 0.3) * 2;
          
          // Orbital motion for investor matching
          const orbitRadius = 3;
          const orbitSpeed = time * 0.5;
          const orbitX = Math.cos(orbitSpeed + ix * 0.1) * orbitRadius;
          const orbitZ = Math.sin(orbitSpeed + ix * 0.1) * orbitRadius;
          
          positions[i3] += ((baseX + orbitX * scrollProgress) - positions[i3]) * 0.02;
          positions[i3 + 1] += ((baseY + valueHeight) - positions[i3 + 1]) * 0.02;
          positions[i3 + 2] += ((baseZ + orbitZ * scrollProgress) - positions[i3 + 2]) * 0.02;
        } else if (stage === 5) {
          // Stage 5: Transaction beams
          const gridSize = 10;
          const spacing = 1.5;
          const ix = i % gridSize;
          const iy = Math.floor(i / gridSize) % gridSize;
          const iz = Math.floor(i / (gridSize * gridSize));
          
          const baseX = (ix - gridSize / 2) * spacing;
          const baseY = (iy - gridSize / 2) * spacing;
          const baseZ = (iz - gridSize / 2) * spacing;
          
          const valueHeight = Math.sin(ix * 0.5 + iy * 0.3) * 2;
          
          // Solidify positions
          positions[i3] += (baseX - positions[i3]) * 0.1;
          positions[i3 + 1] += ((baseY + valueHeight) - positions[i3 + 1]) * 0.1;
          positions[i3 + 2] += (baseZ - positions[i3 + 2]) * 0.1;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function DataCloud({ scrollProgress, stage }: DataCloudProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <ParticleCloud scrollProgress={scrollProgress} stage={stage} />
      </Canvas>
    </div>
  );
}