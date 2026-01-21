import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useClerk, 
  SignedIn, 
  SignedOut, 
  UserButton 
} from "@clerk/clerk-react"; 
import './LandingPage.css';

const LandingPage = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  // Animation & Stats States
  const [seconds, setSeconds] = useState(49);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [wpm, setWpm] = useState(86);
  const [accuracy, setAccuracy] = useState(96);
  const [rank, setRank] = useState(12);
  
  const originalText = "Success is the sum of small efforts repeated day in and day out";

  // CORRECTED LOGIC: Direct navigation to TypeBlaze UI
  // This ignores auth status and goes straight to the game
  const handleStartTyping = () => {
    navigate('/typeblaze'); 
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev <= 0 ? 59 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Preview Typing logic
  useEffect(() => {
    if (!isTyping) return;
    const typingTimer = setTimeout(() => {
      if (typingIndex < originalText.length) {
        const newTypedText = originalText.substring(0, typingIndex + 1);
        setTypedText(newTypedText);
        setTypingIndex(typingIndex + 1);
        setAccuracy(prev => (Math.random() > 0.8 ? 95 : 98));
      } else {
        setIsTyping(false);
      }
    }, 50);
    return () => clearTimeout(typingTimer);
  }, [typingIndex, isTyping]);

  const handlePreview = () => {
    setTypedText('');
    setTypingIndex(0);
    setIsTyping(true);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="landing-page">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <nav className="nav-bar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <div className="logo-icon">⚡</div>
          <span>TypeBlaze</span>
        </div>
        <ul className="nav-links">
          <li>
            <SignedOut>
              <button onClick={() => openSignIn()} className="nav-link-btn">
                Sign In
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </li>
          <li><a href="#features">Features</a></li>
          <li>
            <button onClick={handleStartTyping} className="nav-link-btn">
               Play
            </button>
          </li>
        </ul>
      </nav>

      <div className="main-container">
        <div className="hero-content">
          <h1>
            Type<span className="neon-text">Blaze</span>
          </h1>
          <p className="subtitle">Master your typing. Ignite your speed.</p>
          <p className="description">
            Experience the future of typing practice with real-time multiplayer battles, 
            stunning visuals, and instant feedback on every keystroke.
          </p>

          <div className="button-group">
            {/* Direct Link to UI */}
            <button className="btn btn-primary" onClick={handleStartTyping}>
              Start Typing Now
            </button>
            <button className="btn btn-secondary" onClick={handlePreview}>
              Watch Preview
            </button>
          </div>

          <div className="features">
            <div className="feature">Live PvP</div>
            <div className="feature">Per-keystroke accuracy</div>
            <div className="feature">Daily challenges</div>
          </div>
        </div>

        <div className="practice-card">
          <div className="card-header">
            <span>ROOM • Practice</span>
            <span className="timer">{formatTime(seconds)}</span>
          </div>
          <div className="practice-text">
            {typedText || originalText}
            {isTyping && <span className="cursor">|</span>}
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-label">WPM</div>
              <div className="stat-value">{wpm}</div>
            </div>
            <div className="stat">
              <div className="stat-label">ACC</div>
              <div className="stat-value">{accuracy}%</div>
            </div>
            <div className="stat">
              <div className="stat-label">RANK</div>
              <div className="stat-value">#{rank}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;