import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaQuoteLeft } from 'react-icons/fa';
import PhotoGallery from './components/PhotoGallery';
import Fireworks from './components/Fireworks';
import RomanticBackground from './components/RomanticBackground';
import AnimatedHeader from './components/AnimatedHeader';
import Footer from './components/Footer';
import ThreeDLuffy from './components/ThreeDLuffy';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }
      }
    }
  }
});

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function App() {
  const [showNoButton, setShowNoButton] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://www.transparenttextures.com/patterns/flowers.png")',
            opacity: 0.1,
            pointerEvents: 'none'
          }
        }}
      >
        <ThreeDLuffy />
        <RomanticBackground />
        <AnimatePresence>
          {showCelebration && <Fireworks />}
        </AnimatePresence>

        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,64,129,0.05) 0%, rgba(245,0,87,0.05) 100%)',
                zIndex: 0
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <AnimatedHeader />

              <Box sx={{ 
                textAlign: 'center', 
                mb: 4,
                position: 'relative'
              }}>
                <FaQuoteLeft 
                  size={24} 
                  color="#ff4081" 
                  style={{ 
                    position: 'absolute',
                    left: '20%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.5
                  }} 
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ 
                    mb: 4, 
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1,
                    color: '#666'
                  }}
                >
                  "Every moment with you is a treasure I hold dear to my heart"
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  textAlign: 'center', 
                  mb: 4,
                  cursor: 'pointer'
                }}
                onClick={() => setShowHeart(!showHeart)}
              >
                <motion.div
                  animate={{ 
                    scale: showHeart ? 1.2 : 1,
                    rotate: showHeart ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <FaHeart 
                    size={40} 
                    color="#ff4081" 
                    style={{
                      filter: 'drop-shadow(0 0 5px rgba(255, 64, 129, 0.5))'
                    }}
                  />
                </motion.div>
              </Box>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#444'
                  }}
                >
                  From the moment I met you, my life has been filled with endless joy and love.
                  Your smile brightens my darkest days, and your laughter is the melody that plays
                  in my heart. You are my sunshine, my moon, and all my stars.
                </Typography>

                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#444'
                  }}
                >
                  I cherish every moment we spend together, whether we're laughing, talking,
                  or simply being in each other's presence. Your kindness, intelligence, and
                  beautiful soul make me fall in love with you more each day.
                </Typography>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <Box sx={{ mt: 4 }}>
                  <Typography 
                    variant="h4" 
                    align="center" 
                    color="primary" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    What I Love About You
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    p: 2,
                    background: 'rgba(255, 64, 129, 0.05)',
                    borderRadius: '10px'
                  }}>
                    {[
                      "Your beautiful smile that lights up any room",
                      "Your kind and caring heart",
                      "Your intelligence and wisdom",
                      "Your sense of humor that always makes me laugh",
                      "Your strength and determination",
                      "Your beautiful soul that shines through everything you do"
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          p: 1,
                          borderRadius: '5px',
                          '&:hover': {
                            background: 'rgba(255, 64, 129, 0.1)',
                            transform: 'translateX(5px)',
                            transition: 'transform 0.3s ease'
                          }
                        }}>
                          <FaStar color="#ff4081" />
                          <Typography>{item}</Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>

              <PhotoGallery />

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
              >
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      color: '#333'
                    }}
                  >
                    Will you be mine forever?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ 
                          px: 4,
                          borderRadius: '25px',
                          boxShadow: '0 4px 8px rgba(255, 64, 129, 0.3)',
                          '&:hover': {
                            boxShadow: '0 6px 12px rgba(255, 64, 129, 0.4)'
                          }
                        }}
                        onClick={handleYesClick}
                      >
                        Yes
                      </Button>
                    </motion.div>
                    {showNoButton && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="large"
                          sx={{ 
                            px: 4,
                            borderRadius: '25px',
                            borderWidth: '2px',
                            '&:hover': {
                              borderWidth: '2px'
                            }
                          }}
                          onClick={() => setShowNoButton(false)}
                        >
                          No
                        </Button>
                      </motion.div>
                    )}
                  </Box>
                </Box>
              </motion.div>

              <AnimatePresence>
                {showCelebration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginTop: '2rem' }}
                  >
                    <Typography
                      variant="h3"
                      color="primary"
                      sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        mb: 2
                      }}
                    >
                      Yay! I Love You! 💖
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontStyle: 'italic',
                        color: '#666'
                      }}
                    >
                      You've made me the happiest person in the world!
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
