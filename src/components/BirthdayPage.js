import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Avatar, Typography, IconButton, Paper, Button } from '@mui/material';
import { FaCog, FaHeart, FaGift, FaBirthdayCake } from 'react-icons/fa';
import ChatInterface from './ChatInterface';
import './BirthdayPage.css';

const BirthdayPage = ({ girlfriendData, onAdminClick }) => {
  const [showWishes, setShowWishes] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const birthday = new Date(girlfriendData.birthday);
      const now = new Date();
      const diff = birthday - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown("It's her birthday! 🎉");
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [girlfriendData.birthday]);

  if (showChat) {
    return <ChatInterface girlfriendData={girlfriendData} onAdminClick={onAdminClick} />;
  }

  return (
    <Box className="birthday-container">
      <IconButton 
        onClick={onAdminClick}
        sx={{ 
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 100,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
        }}
      >
        <FaCog color="#ff4081" />
      </IconButton>

      <AnimatePresence>
        {showWishes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="birthday-content"
          >
            <Paper className="birthday-card" elevation={10}>
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <FaBirthdayCake size={80} color="#ff4081" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ff4081 0%, #f50057 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Happy Birthday!
                </Typography>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <Avatar 
                  src={girlfriendData.image}
                  sx={{ 
                    width: 150,
                    height: 150,
                    margin: '20px auto',
                    border: '5px solid #ff4081',
                    boxShadow: '0 8px 20px rgba(255, 64, 129, 0.4)'
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                  {girlfriendData.name}
                </Typography>
                <Typography variant="h5" sx={{ color: '#666', mb: 3 }}>
                  {girlfriendData.age ? `Turning ${girlfriendData.age} Today! 🎉` : 'Happy Birthday! 🎉'}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="countdown-box"
              >
                <Typography variant="h6" sx={{ color: '#ff4081', fontWeight: 600 }}>
                  {countdown}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Box className="wishes-text">
                  <FaHeart color="#ff4081" size={24} />
                  <Typography variant="h6" sx={{ my: 2, fontStyle: 'italic', color: '#555' }}>
                    "To the most amazing person in my life, happy birthday! 
                    You make every day brighter and fill my heart with endless joy. 
                    I love you more than words can express! 💖"
                  </Typography>
                  <FaHeart color="#ff4081" size={24} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<FaGift />}
                      onClick={() => setShowChat(true)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '25px',
                        background: 'linear-gradient(135deg, #ff4081 0%, #f50057 100%)',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 15px rgba(255, 64, 129, 0.4)',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(255, 64, 129, 0.6)'
                        }
                      }}
                    >
                      Open Your Gift
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>

              <Box className="floating-emojis">
                {['🎂', '🎉', '🎁', '🎈', '💖', '🥳', '✨', '🎊'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="emoji"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default BirthdayPage;
