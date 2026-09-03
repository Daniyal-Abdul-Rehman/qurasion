'use client';

import { Canvas } from '@react-three/fiber';

interface Scene3DProps {
  children: React.ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
      </Canvas>
    </div>
  );
}