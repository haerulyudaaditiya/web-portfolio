'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
    }
    if (coreRef.current) {
        coreRef.current.rotation.x -= delta * 0.1;
        coreRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Outer Wireframe */}
      <Icosahedron args={[1.5, 0]} ref={meshRef}>
        <meshBasicMaterial 
            color="#06b6d4" 
            wireframe 
            transparent 
            opacity={0.3} 
        />
      </Icosahedron>

      {/* Inner Glowing Core */}
      <Icosahedron args={[0.8, 4]} ref={coreRef}>
        <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            transparent
            opacity={0.8}
            emissive="#06b6d4"
            emissiveIntensity={0.5}
        />
      </Icosahedron>
      
      {/* Point Light for Glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#06b6d4" distance={3} />
    </Float>
  );
}
