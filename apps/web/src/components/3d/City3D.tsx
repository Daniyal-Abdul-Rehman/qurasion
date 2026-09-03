'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface City3DProps {
  animated?: boolean;
  dataStreams?: boolean;
}

export default function City3D({ animated = true, dataStreams = true }: City3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && animated) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple buildings that are visible */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = (i % 3 - 1) * 3;
        const z = (Math.floor(i / 3) - 1) * 3;
        const height = 2 + Math.random() * 4;
        
        return (
          <mesh key={i} position={[x, height / 2, z]}>
            <boxGeometry args={[2, height, 2]} />
            <meshStandardMaterial color="#D4C4A8" />
          </mesh>
        );
      })}

      {/* Data particles */}
      {dataStreams && Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`particle-${i}`} position={[
          (Math.random() - 0.5) * 10,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 10
        ]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#B7D83D" />
        </mesh>
      ))}
    </group>
  );
}