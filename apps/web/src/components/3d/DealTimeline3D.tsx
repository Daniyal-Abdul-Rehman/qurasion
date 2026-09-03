'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DealTimeline3DProps {
  animated?: boolean;
  currentStage?: number;
  stages?: string[];
}

export default function DealTimeline3D({ 
  animated = true, 
  currentStage = 3,
  stages = ['DISCOVER', 'ANALYZE', 'OFFER', 'DUE DILIGENCE', 'CONTRACT', 'FINANCING', 'CLOSING']
}: DealTimeline3DProps) {
  const timelineRef = useRef<THREE.Group>(null);
  const stageNodesRef = useRef<THREE.Group[]>([]);

  // Create timeline stages
  const timelineStages = useMemo(() => {
    const nodes: THREE.Group[] = [];
    const spacing = 2.5;

    stages.forEach((stage, index) => {
      const node = new THREE.Group();
      const isCompleted = index < currentStage;
      const isCurrent = index === currentStage;
      const isPending = index > currentStage;

      // Stage node
      const nodeColor = isCompleted ? '#22C55E' : isCurrent ? '#B7FF4A' : '#292E36';
      const nodeSize = isCurrent ? 0.5 : 0.3;

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(nodeSize, 32, 32),
        new THREE.MeshStandardMaterial({
          color: nodeColor,
          metalness: 0.5,
          roughness: 0.3,
          emissive: nodeColor,
          emissiveIntensity: isCurrent ? 0.5 : isCompleted ? 0.2 : 0,
        })
      );
      node.add(sphere);

      // Outer ring for current stage
      if (isCurrent) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.7, 0.05, 16, 32),
          new THREE.MeshBasicMaterial({
            color: '#B7FF4A',
            transparent: true,
            opacity: 0.8,
          })
        );
        ring.rotation.x = Math.PI / 2;
        node.add(ring);
      }

      // Vertical line connecting to timeline
      const lineHeight = 1;
      const line = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, lineHeight),
        new THREE.MeshBasicMaterial({
          color: isCompleted ? '#22C55E' : '#292E36',
          transparent: true,
          opacity: isCompleted ? 0.6 : 0.3,
        })
      );
      line.position.y = -lineHeight / 2;
      node.add(line);

      // Position along timeline
      node.position.set(
        (index - (stages.length - 1) / 2) * spacing,
        0,
        0
      );

      node.userData = {
        stage,
        index,
        isCompleted,
        isCurrent,
        isPending,
        baseY: 0,
      };

      nodes.push(node);
    });

    return nodes;
  }, [stages, currentStage]);

  // Create connecting lines between stages
  const connectionLines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    
    timelineStages.forEach((node, index) => {
      if (index < timelineStages.length - 1) {
        points.push(node.position.clone());
        points.push(timelineStages[index + 1].position.clone());
      }
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#292E36',
      transparent: true,
      opacity: 0.5,
    });

    return new THREE.LineSegments(geometry, material);
  }, [timelineStages]);

  // Create progress indicator
  const progressIndicator = useMemo(() => {
    const progress = currentStage / (stages.length - 1);
    const geometry = new THREE.BoxGeometry(progress * (stages.length - 1) * 2.5, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: '#B7FF4A',
      transparent: true,
      opacity: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      -((stages.length - 1) / 2) * 2.5 + (progress * (stages.length - 1) * 2.5) / 2,
      -0.1,
      0
    );

    return mesh;
  }, [currentStage, stages]);

  useFrame((state) => {
    if (!timelineRef.current) return;

    const time = state.clock.getElapsedTime();

    // Animate stage nodes
    stageNodesRef.current.forEach((node, index) => {
      if (animated) {
        const userData = node.userData;

        // Floating animation
        node.position.y = userData.baseY + Math.sin(time + index) * 0.1;

        // Pulse effect for current stage
        if (userData.isCurrent) {
          const scale = 1 + Math.sin(time * 3) * 0.1;
          node.scale.setScalar(scale);
        }

        // Gentle rotation for completed stages
        if (userData.isCompleted) {
          node.rotation.y = time * 0.5;
        }
      }
    });

    // Rotate entire timeline slightly
    if (animated) {
      timelineRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={timelineRef}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[stages.length * 3, 4]} />
        <meshStandardMaterial color="#111419" metalness={0.5} roughness={0.9} />
      </mesh>

      {/* Timeline base line */}
      <mesh>
        <boxGeometry args={[stages.length * 2.5, 0.05, 0.05]} />
        <meshBasicMaterial color="#292E36" transparent opacity={0.5} />
      </mesh>

      {/* Progress indicator */}
      <primitive object={progressIndicator} />

      {/* Connection lines */}
      <primitive object={connectionLines} />

      {/* Stage nodes */}
      {timelineStages.map((node, index) => (
        <primitive 
          key={index} 
          object={node} 
          ref={(el: THREE.Group | null) => { if (el) stageNodesRef.current[index] = el; }}
        />
      ))}

      {/* Current stage highlight */}
      {currentStage >= 0 && currentStage < stages.length && (
        <pointLight
          position={[
            (currentStage - (stages.length - 1) / 2) * 2.5,
            1,
            1
          ]}
          intensity={1}
          color="#B7FF4A"
          distance={3}
        />
      )}
    </group>
  );
}