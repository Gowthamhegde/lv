import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingHeart = ({ position, scale, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    meshRef.current.rotation.y += 0.01;
  });

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const AnimatedSphere = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const ParticleRing = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 8;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = Math.sin(angle * 2) * 2;
    
    colors[i * 3] = 1;
    colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
  }
  
  useFrame((state) => {
    particlesRef.current.rotation.z = state.clock.elapsedTime * 0.1;
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
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
    </points>
  );
};

const Scene3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff4081" intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedSphere position={[-4, 2, -5]} color="#ff4081" />
        <AnimatedSphere position={[4, -2, -5]} color="#764ba2" />
        
        <FloatingHeart position={[-3, 1, 0]} scale={0.3} color="#ff1744" />
        <FloatingHeart position={[3, -1, 0]} scale={0.25} color="#f50057" />
        <FloatingHeart position={[0, 2, -2]} scale={0.2} color="#ff4081" />
        <FloatingHeart position={[-2, -2, -1]} scale={0.28} color="#e91e63" />
        <FloatingHeart position={[2, 2, -3]} scale={0.22} color="#ff6090" />
        
        <ParticleRing />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
