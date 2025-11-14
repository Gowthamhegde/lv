import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Paper, Typography, TextField, Button, Avatar, 
  IconButton, Chip, Stack 
} from '@mui/material';
import { FaArrowLeft, FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = ({ girlfriendData, setGirlfriendData, onBackClick }) => {
  const [newResponse, setNewResponse] = useState('');
  const [imageUrl, setImageUrl] = useState(girlfriendData.image);
  const [name, setName] = useState(girlfriendData.name);

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      setGirlfriendData({
        ...girlfriendData,
        responses: [...girlfriendData.responses, newResponse]
      });
      setNewResponse('');
    }
  };

  const handleDeleteResponse = (index) => {
    const updatedResponses = girlfriendData.responses.filter((_, i) => i !== index);
    setGirlfriendData({
      ...girlfriendData,
      responses: updatedResponses
    });
  };

  const handleSaveChanges = () => {
    setGirlfriendData({
      ...girlfriendData,
      name,
      image: imageUrl
    });
    alert('Changes saved successfully! 💖');
  };

  return (
    <Box className="admin-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper className="admin-panel" elevation={5}>
          <Box className="admin-header">
            <IconButton onClick={onBackClick} sx={{ color: '#fff' }}>
              <FaArrowLeft />
            </IconButton>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600 }}>
              Admin Panel
            </Typography>
            <Box sx={{ width: 40 }} />
          </Box>

          <Box className="admin-content">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: '15px' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#ff4081', fontWeight: 600 }}>
                  <FaImage style={{ marginRight: '10px' }} />
                  Profile Settings
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar src={imageUrl} sx={{ width: 100, height: 100, border: '4px solid #ff4081' }} />
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Box>
                </Box>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper elevation={2} sx={{ p: 3, borderRadius: '15px' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#ff4081', fontWeight: 600 }}>
                  Response Messages
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Add a new response..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddResponse()}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddResponse}
                    sx={{ minWidth: '50px' }}
                  >
                    <FaPlus />
                  </Button>
                </Box>

                <Stack spacing={1} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {girlfriendData.responses.map((response, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Chip
                        label={response}
                        onDelete={() => handleDeleteResponse(index)}
                        deleteIcon={<FaTrash />}
                        sx={{ 
                          p: 2, 
                          height: 'auto',
                          '& .MuiChip-label': { whiteSpace: 'normal' }
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSaveChanges}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #ff4081 0%, #f50057 100%)',
                  boxShadow: '0 4px 15px rgba(255, 64, 129, 0.4)'
                }}
              >
                Save Changes
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AdminPanel;
