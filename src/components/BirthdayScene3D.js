import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const BirthdayCake = ({ position }) => {
  const cakeRef = useRef();
  
  useFrame((state) => {
    cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    cakeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={cakeRef} position={position}>
        {/* Bottom layer */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
          <meshStandardMaterial color="#ff69b4" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Middle layer */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.4, 32]} />
          <meshStandardMaterial color="#ff1493" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Top layer */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color="#ff4081" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Candle */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial color="#fff8dc" />
        </mesh>
        
        {/* Flame */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffa500" 
            emissive="#ff4500"
            emissiveIntensity={2}
          />
        </mesh>
        
        <pointLight position={[0, 1.6, 0]} intensity={2} distance={5} color="#ffa500" />
      </group>
    </Float>
  );
};

const Balloon = ({ position, color }) => {
  const balloonRef = useRef();
  
  useFrame((state) => {
    balloonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    balloonRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={balloonRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
};

const ConfettiParticles = () => {
  const particlesRef = useRef();
  const particleCount = 200;
  
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    const colorPalette = [
      [1, 0.3, 0.5], [1, 0.8, 0.2], [0.3, 0.8, 1], 
      [0.8, 0.3, 1], [1, 0.5, 0.8], [0.5, 1, 0.5]
    ];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 15 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = -Math.random() * 0.05 - 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);
  
  useFrame(() => {
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 15;
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors transparent opacity={0.9} />
    </points>
  );
};

const BirthdayScene3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 2, 12], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#ff4081" intensity={0.8} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffa500" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <BirthdayCake position={[0, 0, -3]} />
        
        <Balloon position={[-3, 3, -2]} color="#ff1744" />
        <Balloon position={[3, 4, -2]} color="#2196f3" />
        <Balloon position={[-4, 2, 0]} color="#ffc107" />
        <Balloon position={[4, 3, 0]} color="#9c27b0" />
        <Balloon position={[0, 5, -1]} color="#4caf50" />
        <Balloon position={[-2, 4, 1]} color="#ff4081" />
        <Balloon position={[2, 2, 1]} color="#00bcd4" />
        
        <ConfettiParticles />
        
        <Sphere args={[1.5, 32, 32]} position={[-5, 1, -5]}>
          <MeshDistortMaterial
            color="#ff4081"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        <Sphere args={[1.2, 32, 32]} position={[5, -1, -5]}>
          <MeshDistortMaterial
            color="#764ba2"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default BirthdayScene3D;
