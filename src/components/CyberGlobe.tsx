'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ... imports ...
import { Points, PointMaterial } from '@react-three/drei';

export default function CyberGlobe() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate particles
  const particles = new Float32Array(5000 * 3);
  for(let i=0; i<5000; i++) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5; 
    
    // Add some random noise for "cloud" effect
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    particles[i*3] = x;
    particles[i*3+1] = y;
    particles[i*3+2] = z;
  }

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group rotation={[0,0,Math.PI/6]}>
       <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#06b6d4"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
       </Points>
       {/* Core */}
       <Sphere args={[2.4, 32, 32]}>
             <meshBasicMaterial color="black" />
       </Sphere>
    </group>
  );
}
