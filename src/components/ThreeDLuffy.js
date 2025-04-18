import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box as ThreeBox, OrbitControls } from '@react-three/drei';
import { Box } from '@mui/material';
import * as THREE from 'three';

function LuffyModel({ position, direction }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = position.x;
      meshRef.current.position.y = position.y;
      meshRef.current.rotation.y = direction === 1 ? 0 : Math.PI;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <ThreeBox
      ref={meshRef}
      args={[1, 1, 1]}
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      <meshStandardMaterial
        color="#ff4081"
        metalness={0.5}
        roughness={0.2}
        emissive="#ff4081"
        emissiveIntensity={0.2}
      />
    </ThreeBox>
  );
}

const ThreeDLuffy = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const moveLuffy = () => {
      setPosition(prev => {
        let newX = prev.x + (0.1 * direction);
        let newY = prev.y;
        
        if (newX > 10) {
          setDirection(-1);
          newX = 10;
        } else if (newX < -10) {
          setDirection(1);
          newX = -10;
        }

        if (Math.random() > 0.95) {
          newY = Math.random() * 5 - 2.5;
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveLuffy, 50);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <LuffyModel position={position} direction={direction} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </Box>
  );
};

export default ThreeDLuffy; 