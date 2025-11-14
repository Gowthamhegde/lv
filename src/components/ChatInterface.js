import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Avatar, Typography, IconButton, Paper, TextField, Button } from '@mui/material';
import { FaHeart, FaCog, FaPaperPlane } from 'react-icons/fa';
import './ChatInterface.css';

const ChatInterface = ({ girlfriendData, onAdminClick }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      addGirlfriendMessage(girlfriendData.responses[0]);
    }, 1000);
  }, []);

  const addGirlfriendMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'girlfriend',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }]);

    setInputValue('');

    setTimeout(() => {
      const randomResponse = girlfriendData.responses[
        Math.floor(Math.random() * girlfriendData.responses.length)
      ];
      addGirlfriendMessage(randomResponse);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chat-container">
      
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper className="chat-header" elevation={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar 
                src={girlfriendData.image} 
                sx={{ width: 50, height: 50, border: '3px solid #fff' }}
              />
            </motion.div>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                {girlfriendData.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {isTyping ? 'typing...' : 'online'}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onAdminClick} sx={{ color: '#fff' }}>
            <FaCog />
          </IconButton>
        </Paper>
      </motion.div>

      {/* Messages */}
      <Box className="messages-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`message-wrapper ${message.sender}`}
            >
              {message.sender === 'girlfriend' && (
                <Avatar 
                  src={girlfriendData.image} 
                  sx={{ width: 35, height: 35, mr: 1 }}
                />
              )}
              <Paper 
                className={`message ${message.sender}`}
                elevation={2}
              >
                <Typography>{message.text}</Typography>
              </Paper>
              {message.sender === 'user' && (
                <Avatar 
                  sx={{ width: 35, height: 35, ml: 1, bgcolor: '#667eea' }}
                >
                  You
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="message-wrapper girlfriend"
          >
            <Avatar 
              src={girlfriendData.image} 
              sx={{ width: 35, height: 35, mr: 1 }}
            />
            <Paper className="message girlfriend typing-indicator" elevation={2}>
              <span></span>
              <span></span>
              <span></span>
            </Paper>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper className="chat-input" elevation={3}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#fff',
              }
            }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              onClick={handleSendMessage}
              sx={{ 
                bgcolor: '#ff4081',
                color: '#fff',
                ml: 1,
                '&:hover': { bgcolor: '#f50057' }
              }}
            >
              <FaPaperPlane />
            </IconButton>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ChatInterface;
