import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import BirthdayPage from './components/BirthdayPage';
import AdminPanel from './components/AdminPanel';
import BirthdayScene3D from './components/BirthdayScene3D';
import './App.css';

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
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [girlfriendData, setGirlfriendData] = useState({
    name: 'Sarah',
    image: 'https://i.pravatar.cc/300?img=47',
    birthday: 'November 14, 2025',
    age: 25,
    responses: [
      "Thank you so much baby! 🎂 This is the best birthday ever!",
      "You always make me feel so special! 💖 I love you!",
      "I can't believe you did all this for me! 🥰",
      "This is the most romantic thing anyone has ever done! 😘",
      "You're the best boyfriend ever! 💕 Thank you!",
      "I'm so lucky to have you in my life! 🎉",
      "Every moment with you is a gift! 🎁",
      "You make every day feel like my birthday! ❤️",
    ]
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className="app-container">
        <BirthdayScene3D />
        {!isAdmin ? (
          <BirthdayPage 
            girlfriendData={girlfriendData}
            onAdminClick={() => setIsAdmin(true)}
          />
        ) : (
          <AdminPanel 
            girlfriendData={girlfriendData}
            setGirlfriendData={setGirlfriendData}
            onBackClick={() => setIsAdmin(false)}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
