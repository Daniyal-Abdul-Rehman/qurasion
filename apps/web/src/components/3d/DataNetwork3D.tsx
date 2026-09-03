'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataNetwork3DProps {
  animated?: boolean;
  stage?: 'chaos' | 'normalize' | 'resolve' | 'enrich' | 'verify';
}

export default function DataNetwork3D({ animated = true, stage = 'chaos' }: DataNetwork3DProps) {
  const networkRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group[]>([]);

  // Create network nodes
  const networkNodes = useMemo(() => {
    const nodes: THREE.Group[] = [];
    const nodeCount = 30;
    const sourceTypes = ['MLS', 'TAX', 'PERMITS', 'GOVERNMENT', 'GEOGRAPHY', 'TRANSACTIONS'];
    const colors = ['#B7FF4A', '#3B82F6', '#F59E0B', '#22C55E', '#EF4444', '#8B5CF6'];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Group();
      const sourceType = sourceTypes[i % sourceTypes.length];
      const color = colors[i % colors.length];

      // Node sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.5,
          roughness: 0.3,
          emissive: color,
          emissiveIntensity: 0.2,
        })
      );
      node.add(sphere);

      // Outer ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.05, 8, 32),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.5,
        })
      );
      ring.rotation.x = Math.PI / 2;
      node.add(ring);

      // Initial chaotic position
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 5 + Math.random() * 5;

      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      node.userData = {
        sourceType,
        color,
        originalPosition: node.position.clone(),
        targetPosition: new THREE.Vector3(),
        resolved: false,
      };

      nodes.push(node);
    }

    return nodes;
  }, []);

  // Create connection lines
  const connectionLines = useMemo(() => {
    const lineCount = 50;
    const positions = new Float32Array(lineCount * 6); // 2 points per line, 3 coordinates per point
    const colors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const nodeA = Math.floor(Math.random() * networkNodes.length);
      const nodeB = Math.floor(Math.random() * networkNodes.length);
      
      const color = new THREE.Color(networkNodes[nodeA].userData.color);
      
      colors[i * 6] = color.r;
      colors[i * 6 + 1] = color.g;
      colors[i * 6 + 2] = color.b;
      colors[i * 6 + 3] = color.r;
      colors[i * 6 + 4] = color.g;
      colors[i * 6 + 5] = color.b;
    }

    return { positions, colors };
  }, [networkNodes]);

  // Calculate target positions based on stage
  const calculateTargetPositions = () => {
    networkNodes.forEach((node, index) => {
      switch (stage) {
        case 'chaos':
          node.userData.targetPosition.copy(node.userData.originalPosition);
          break;
        case 'normalize':
          // Move toward center
          node.userData.targetPosition.set(
            node.userData.originalPosition.x * 0.5,
            node.userData.originalPosition.y * 0.5,
            node.userData.originalPosition.z * 0.5
          );
          break;
        case 'resolve':
          // Group by source type
          const groupSize = 5;
          const groupIndex = Math.floor(index / groupSize);
          const groupAngle = (groupIndex / 6) * Math.PI * 2;
          const groupRadius = 3;
          node.userData.targetPosition.set(
            Math.cos(groupAngle) * groupRadius + (Math.random() - 0.5),
            (Math.random() - 0.5) * 2,
            Math.sin(groupAngle) * groupRadius + (Math.random() - 0.5)
          );
          break;
        case 'enrich':
          // Form central canonical entity
          const angle = (index / networkNodes.length) * Math.PI * 2;
          const radius = 2;
          node.userData.targetPosition.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * 0.5,
            Math.sin(angle) * radius
          );
          break;
        case 'verify':
          // Tight formation around center
          const tightAngle = (index / networkNodes.length) * Math.PI * 2;
          const tightRadius = 1;
          node.userData.targetPosition.set(
            Math.cos(tightAngle) * tightRadius,
            (index % 3 - 1) * 0.3,
            Math.sin(tightAngle) * tightRadius
          );
          node.userData.resolved = true;
          break;
      }
    });
  };

  useFrame((state) => {
    if (!networkRef.current) return;

    const time = state.clock.getElapsedTime();
    calculateTargetPositions();

    // Rotate entire network
    if (animated) {
      networkRef.current.rotation.y = time * 0.05;
      networkRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Animate nodes toward target positions
    nodesRef.current.forEach((node, index) => {
      if (animated) {
        const speed = 0.02;
        node.position.lerp(node.userData.targetPosition, speed);

        // Subtle floating
        node.position.y += Math.sin(time + index) * 0.002;

        // Pulse effect for resolved nodes
        if (node.userData.resolved) {
          const scale = 1 + Math.sin(time * 2 + index) * 0.1;
          node.scale.setScalar(scale);
        }
      }
    });

    // Update connection lines
    if (animated && nodesRef.current.length > 0) {
      const positions = connectionLines.positions;
      for (let i = 0; i < 50; i++) {
        const nodeA = nodesRef.current[i % nodesRef.current.length];
        const nodeB = nodesRef.current[(i + 1) % nodesRef.current.length];
        
        positions[i * 6] = nodeA.position.x;
        positions[i * 6 + 1] = nodeA.position.y;
        positions[i * 6 + 2] = nodeA.position.z;
        positions[i * 6 + 3] = nodeB.position.x;
        positions[i * 6 + 4] = nodeB.position.y;
        positions[i * 6 + 5] = nodeB.position.z;
      }
    }
  });

  return (
    <group ref={networkRef}>
      {/* Central canonical entity */}
      {stage === 'verify' && (
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#B7FF4A"
            metalness={0.8}
            roughness={0.2}
            emissive="#B7FF4A"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Network nodes */}
      {networkNodes.map((node, index) => (
        <primitive 
          key={index} 
          object={node} 
          ref={(el: THREE.Group | null) => { if (el) nodesRef.current[index] = el; }}
        />
      ))}

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionLines.positions.length / 3}
            array={connectionLines.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connectionLines.colors.length / 3}
            array={connectionLines.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}