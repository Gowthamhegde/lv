import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const PhotoGallery = () => {
  // Beautiful random images from Unsplash
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60',
      caption: 'Your Beautiful Smile'
    },
    {
      url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60',
      caption: 'Our Special Moments'
    },
    {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60',
      caption: 'Forever in My Heart'
    },
    {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
      caption: 'My Sunshine'
    },
    {
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60',
      caption: 'Perfect Together'
    },
    {
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60',
      caption: 'Love of My Life'
    },
    {
      url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&auto=format&fit=crop&q=60',
      caption: 'My Everything'
    },
    {
      url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&auto=format&fit=crop&q=60',
      caption: 'My Heart Beats for You'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          color="primary" 
          sx={{ 
            mb: 4,
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Our Beautiful Moments
        </Typography>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    height: 250,
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      '&::after': {
                        opacity: 0.7
                      },
                      '& .caption': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,64,129,0.8), rgba(245,0,87,0.8))',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }
                  }}
                >
                  <Typography
                    className="caption"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 2,
                      color: 'white',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {image.caption}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default PhotoGallery; 