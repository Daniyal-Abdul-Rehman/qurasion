'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InvestmentGraph3DProps {
  animated?: boolean;
  scenario?: 'bear' | 'base' | 'bull';
  showLabels?: boolean;
}

export default function InvestmentGraph3D({ animated = true, scenario = 'base', showLabels = true }: InvestmentGraph3DProps) {
  const graphRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  // Investment scenarios data
  const scenarioData = useMemo(() => {
    const scenarios = {
      bear: {
        arv: 320000,
        totalCost: 295000,
        netProfit: 25000,
        roi: 8.5,
        bars: [0.8, 0.6, 0.7, 0.5, 0.4, 0.3],
      },
      base: {
        arv: 335000,
        totalCost: 291000,
        netProfit: 44000,
        roi: 15.1,
        bars: [1.0, 0.8, 0.9, 0.7, 0.6, 0.5],
      },
      bull: {
        arv: 350000,
        totalCost: 288000,
        netProfit: 62000,
        roi: 21.5,
        bars: [1.2, 1.0, 1.1, 0.9, 0.8, 0.7],
      },
    };
    return scenarios[scenario];
  }, [scenario]);

  // Create 3D bar chart
  const barChart = useMemo(() => {
    const bars: THREE.Mesh[] = [];
    const barLabels = ['PURCHASE', 'RENOVATION', 'FINANCING', 'HOLD', 'ARV', 'PROFIT'];
    const barColors = ['#3B82F6', '#F59E0B', '#8B5CF6', '#22C55E', '#B7FF4A', '#EF4444'];

    scenarioData.bars.forEach((height, index) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, height, 0.8),
        new THREE.MeshStandardMaterial({
          color: barColors[index],
          metalness: 0.3,
          roughness: 0.7,
          emissive: barColors[index],
          emissiveIntensity: 0.1,
        })
      );

      bar.position.set(
        (index - 2.5) * 1.2,
        height / 2,
        0
      );

      bar.userData = {
        label: barLabels[index],
        value: height,
        targetHeight: height,
        currentHeight: 0,
      };

      bars.push(bar);
    });

    return bars;
  }, [scenarioData]);

  // Create connecting lines
  const trendLines = useMemo(() => {
    const linePoints: THREE.Vector3[] = [];
    
    barChart.forEach((bar, index) => {
      linePoints.push(new THREE.Vector3(bar.position.x, bar.position.y, bar.position.z));
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const material = new THREE.LineBasicMaterial({
      color: '#B7FF4A',
      transparent: true,
      opacity: 0.5,
    });

    return new THREE.Line(geometry, material);
  }, [barChart]);

  useFrame((state) => {
    if (!graphRef.current) return;

    const time = state.clock.getElapsedTime();

    // Animate bars growing
    barsRef.current.forEach((bar, index) => {
      if (animated) {
        const targetHeight = bar.userData.targetHeight;
        const currentHeight = bar.userData.currentHeight;
        
        if (currentHeight < targetHeight) {
          bar.userData.currentHeight = Math.min(currentHeight + 0.02, targetHeight);
          bar.scale.y = bar.userData.currentHeight / targetHeight;
          bar.position.y = bar.userData.currentHeight / 2;
        }

        // Subtle pulse effect
        const pulse = 1 + Math.sin(time * 2 + index) * 0.02;
        bar.scale.x = pulse;
        bar.scale.z = pulse;
      }
    });

    // Rotate graph slightly
    if (animated) {
      graphRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={graphRef}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#111419" metalness={0.5} roughness={0.9} />
      </mesh>

      {/* Grid lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, i * 0.5, 0]}>
          <planeGeometry args={[8, 0.02]} />
          <meshBasicMaterial color="#292E36" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* 3D Bars */}
      {barChart.map((bar, index) => (
        <primitive 
          key={index} 
          object={bar} 
          ref={(el: THREE.Mesh | null) => { if (el) barsRef.current[index] = el; }}
        />
      ))}

      {/* Trend line */}
      <primitive object={trendLines} />

      {/* Labels (simplified as floating text) */}
      {showLabels && barChart.map((bar, index) => (
        <group key={`label-${index}`} position={[bar.position.x, bar.userData.targetHeight + 0.3, bar.position.z]}>
          <mesh>
            <planeGeometry args={[0.8, 0.2]} />
            <meshBasicMaterial color="#B7FF4A" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Summary text */}
      {showLabels && (
        <group position={[0, 4, 0]}>
          <mesh>
            <planeGeometry args={[3, 0.5]} />
            <meshBasicMaterial color="#B7FF4A" transparent opacity={0.1} />
          </mesh>
        </group>
      )}
    </group>
  );
}