import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Fireworks = () => {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const createFirework = () => {
      const colors = ['#ff4081', '#f50057', '#ff9a9e', '#fad0c4', '#ffffff'];
      const newFirework = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 2,
      };
      setFireworks(prev => [...prev, newFirework]);
    };

    const interval = setInterval(createFirework, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          initial={{ 
            x: firework.x,
            y: firework.y,
            scale: 0,
            opacity: 1
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [1, 0.5, 0],
            x: [
              firework.x,
              firework.x + (Math.random() - 0.5) * 100,
              firework.x + (Math.random() - 0.5) * 200
            ],
            y: [
              firework.y,
              firework.y + (Math.random() - 0.5) * 100,
              firework.y + (Math.random() - 0.5) * 200
            ]
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: firework.size,
            height: firework.size,
            background: firework.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${firework.size * 2}px ${firework.color}`
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks; 