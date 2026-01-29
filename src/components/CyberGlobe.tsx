'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function CyberGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
        {/* Main Wireframe Globe */}
        <Sphere args={[2.5, 32, 32]} ref={meshRef}>
            <meshBasicMaterial 
                color="#06b6d4" 
                wireframe 
                transparent 
                opacity={0.15} 
            />
        </Sphere>
        
        {/* Inner Core Glow */}
        <Sphere args={[2, 16, 16]}>
             <meshBasicMaterial 
                color="#0891b2" 
                transparent 
                opacity={0.05} 
                blending={THREE.AdditiveBlending}
            />
        </Sphere>
    </group>
  );
}
