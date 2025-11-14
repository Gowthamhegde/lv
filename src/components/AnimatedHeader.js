import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const AnimatedHeader = () => {
  const text = "My Dearest Love";
  const letters = text.split("");

  return (
    <Box sx={{ 
      textAlign: 'center',
      mb: 4,
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          color="primary"
          sx={{ 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '3px',
              background: 'linear-gradient(45deg, #ff4081, #f50057)',
              borderRadius: '3px'
            }
          }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        style={{
          display: 'inline-block',
          marginTop: '1rem'
        }}
      >
        <FaHeart 
          size={40} 
          color="#ff4081"
          style={{
            filter: 'drop-shadow(0 0 5px rgba(255,64,129,0.5))'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default AnimatedHeader; 