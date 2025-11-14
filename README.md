# 🎂 3D Birthday Website for Your Girlfriend 💖

A stunning 3D animated birthday website with floating balloons, birthday cake, confetti, and a special chat interface!

## ✨ Features

### 🎉 Birthday Landing Page
- Beautiful 3D animated birthday cake with candle
- Floating colorful balloons
- Falling confetti particles
- Animated starfield background
- Birthday countdown timer
- Personalized birthday message
- Girlfriend's photo with elegant styling

### 💬 Interactive Chat
- Send birthday messages
- Receive sweet responses
- Beautiful animations and transitions
- Typing indicators

### ⚙️ Admin Panel
- Customize girlfriend's name
- Change profile picture
- Set birthday date and age
- Add/remove response messages
- Easy-to-use interface

### 🎨 3D Animations
- Rotating birthday cake with glowing candle
- Floating balloons with realistic movement
- Falling confetti particles
- Animated spheres and particle rings
- Auto-rotating camera
- Starfield background

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the Website
```bash
npm start
```

Opens at `http://localhost:3000`

## 📝 Customization

Edit `src/App.js` to personalize:

```javascript
const [girlfriendData, setGirlfriendData] = useState({
  name: 'Sarah',                    // Her name
  image: 'https://...',             // Her photo URL
  birthday: 'November 14, 2025',    // Birthday date
  age: 25,                          // Her age
  responses: [...]                  // Birthday messages
});
```

Or use the Admin Panel (click ⚙️ icon) to change everything!

## 🎁 How It Works

1. **Landing Page**: Shows birthday wishes with countdown
2. **Click "Open Your Gift"**: Reveals the chat interface
3. **Chat**: Send messages and get sweet responses
4. **Admin Panel**: Click ⚙️ to customize everything

## 💻 Technologies

- React 19
- Three.js & React Three Fiber (3D graphics)
- Framer Motion (animations)
- Material-UI (components)
- React Icons

## 🎨 Color Scheme

- Primary: Pink (#ff4081)
- Secondary: Deep Pink (#f50057)
- Background: Dark gradient with 3D elements

Make her birthday unforgettable! 🎉💖
