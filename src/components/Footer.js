import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4,
        py: 3,
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#ff4081',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          Made with
        </Typography>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FaHeart 
            size={24} 
            color="#ff4081"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255,64,129,0.5))'
            }}
          />
        </motion.div>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            mt: 2,
            fontStyle: 'italic'
          }}
        >
          For the most beautiful person in my life
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#999',
            display: 'block',
            mt: 1
          }}
        >
          © {new Date().getFullYear()} My Love Letter
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Footer; 