'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Octahedron, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { Group, Mesh } from 'three';

function Geometries() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Main Icosahedron */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[-3, 2, -2]}>
          <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>

      {/* Floating Torus */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[0.8, 0.2, 16, 32]} position={[4, -1, -3]} rotation={[1, 1, 0]}>
          <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.2} />
        </Torus>
      </Float>

      {/* Distorted Octahedron */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Octahedron args={[0.7]} position={[-2, -3, -1]}>
             <MeshDistortMaterial
                color="#22d3ee"
                attach="material"
                distort={0.4}
                speed={2}
                wireframe
                transparent
                opacity={0.3}
              />
        </Octahedron>
      </Float>
    </group>
  );
}

export default function CyberShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Geometries />
      </Canvas>
    </div>
  );
}
