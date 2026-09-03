'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

interface Scene3DProps {
  children: React.ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        divRef.current.style.width = '100%';
        divRef.current.style.height = '100%';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      ref={divRef}
    >
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
      </Canvas>
    </div>
  );
}