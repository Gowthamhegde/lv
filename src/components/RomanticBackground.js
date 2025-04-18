import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const RomanticBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const colors = ['#ff4081', '#f50057', '#ff9a9e', '#fad0c4'];
      const newHeart = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      };
      setHearts(prev => [...prev, newHeart]);
    };

    const interval = setInterval(createHeart, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      background: 'linear-gradient(45deg, rgba(255,154,158,0.1) 0%, rgba(250,208,196,0.1) 100%)'
    }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            x: heart.x,
            y: heart.y,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: -100,
            opacity: [0, 1, 0],
            rotate: heart.rotate + 360
          }}
          transition={{ 
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            position: 'absolute',
            color: heart.color,
            fontSize: `${heart.size}px`,
            filter: 'drop-shadow(0 0 5px rgba(255,64,129,0.3))'
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
};

export default RomanticBackground; 