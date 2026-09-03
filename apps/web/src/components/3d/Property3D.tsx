'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Property3DProps {
  animated?: boolean;
  highlight?: boolean;
  scale?: number;
}

export default function Property3D({ animated = true, highlight = false, scale = 1 }: Property3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const layersRef = useRef<THREE.Group[]>([]);

  // Create building geometry
  const buildingGeometry = useMemo(() => {
    const group = new THREE.Group();
    
    // Main building structure
    const mainBuilding = new THREE.Mesh(
      new THREE.BoxGeometry(2, 3, 2),
      new THREE.MeshStandardMaterial({
        color: highlight ? '#B7FF4A' : '#181C22',
        metalness: 0.3,
        roughness: 0.7,
      })
    );
    mainBuilding.position.y = 1.5;
    group.add(mainBuilding);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 1, 4),
      new THREE.MeshStandardMaterial({
        color: highlight ? '#A3E642' : '#111419',
        metalness: 0.2,
        roughness: 0.8,
      })
    );
    roof.position.y = 4;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Windows
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: '#292E36',
      metalness: 0.5,
      roughness: 0.3,
      emissive: '#B7FF4A',
      emissiveIntensity: highlight ? 0.3 : 0.1,
    });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        const window = new THREE.Mesh(
          new THREE.PlaneGeometry(0.3, 0.4),
          windowMaterial
        );
        window.position.set(-0.5 + j * 1, 1 + i * 0.8, 1.01);
        group.add(window);

        const windowBack = window.clone();
        windowBack.position.z = -1.01;
        windowBack.rotation.y = Math.PI;
        group.add(windowBack);
      }
    }

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(0.6, 1.2),
      new THREE.MeshStandardMaterial({
        color: '#1E232B',
        metalness: 0.4,
        roughness: 0.6,
      })
    );
    door.position.set(0, 0.6, 1.01);
    group.add(door);

    return group;
  }, [highlight]);

  // Create data layers
  const dataLayers = useMemo(() => {
    const layers: THREE.Group[] = [];
    const layerColors = ['#B7FF4A', '#3B82F6', '#F59E0B', '#22C55E', '#EF4444'];
    const layerLabels = ['OWNERSHIP', 'SALES', 'MORTGAGE', 'TAX', 'PERMITS'];

    for (let i = 0; i < 5; i++) {
      const layer = new THREE.Group();
      const radius = 3 + i * 0.8;
      const particleCount = 12 + i * 4;

      // Create orbital ring
      const ringGeometry = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: layerColors[i],
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      layer.add(ring);

      // Create particles on the ring
      for (let j = 0; j < particleCount; j++) {
        const angle = (j / particleCount) * Math.PI * 2;
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshBasicMaterial({
            color: layerColors[i],
            transparent: true,
            opacity: 0.8,
          })
        );
        particle.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius
        );
        layer.add(particle);
      }

      layer.userData = { 
        radius, 
        speed: 0.001 + i * 0.0005,
        color: layerColors[i],
        label: layerLabels[i]
      };
      layers.push(layer);
    }

    return layers;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Subtle building rotation
    if (animated) {
      meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }

    // Animate data layers
    layersRef.current.forEach((layer, index) => {
      if (animated) {
        layer.rotation.y = time * layer.userData.speed * (index + 1);
        layer.position.y = Math.sin(time * 0.5 + index) * 0.3;
      }
    });
  });

  return (
    <group ref={meshRef} scale={scale}>
      <primitive object={buildingGeometry} />
      {dataLayers.map((layer, index) => (
        <primitive 
          key={index} 
          object={layer} 
          ref={(el: THREE.Object3D | null) => { if (el) layersRef.current[index] = el; }}
        />
      ))}
    </group>
  );
}