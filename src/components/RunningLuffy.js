import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const RunningLuffy = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const moveLuffy = () => {
      setPosition(prev => {
        let newX = prev.x + (5 * direction);
        let newY = prev.y;
        
        // Change direction when hitting screen edges
        if (newX > window.innerWidth - 100) {
          setDirection(-1);
          newX = window.innerWidth - 100;
        } else if (newX < 0) {
          setDirection(1);
          newX = 0;
        }

        // Random vertical movement
        if (Math.random() > 0.95) {
          newY = Math.random() * (window.innerHeight - 100);
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
        zIndex: 9999,
        pointerEvents: 'none',
        width: '100px',
        height: '100px',
        transform: `scaleX(${direction})`
      }}
    >
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <img
          src="https://i.imgur.com/8ZQZQZQ.png"
          alt="Luffy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default RunningLuffy; 