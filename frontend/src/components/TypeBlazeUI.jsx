"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Clock, Crown, Star, Volume2, VolumeX, Settings, Zap, X, Copy, Check, Palette, Music, Type, Award, Target, TrendingUp } from "lucide-react";

// Utility
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Button
export function Button({ className, onClick, soundRef, muted, ...props }) {
  const handleClick = (e) => {
    if (!muted && soundRef?.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {});
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

// Card Components
export function Card({ className, ...props }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl border border-gray-700 bg-gray-800/90 backdrop-blur-xl text-gray-100 shadow-xl", className)} 
      {...props} 
    />
  );
}
export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("p-4 border-b border-gray-700 flex items-center justify-between", className)} {...props} />
  );
}
export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}

// Progress with smooth animation
export function Progress({ value, className }) {
  return (
    <div className={cn("w-full h-3 rounded-full bg-gray-700/50 overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-[#5865f2] to-[#8b5cf6] relative overflow-hidden"
      >
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2"
        />
      </motion.div>
    </div>
  );
}

// Tabs
export function Tabs({ defaultValue, children, className }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={cn("w-full", className)}>
      {children.map((child, index) => {
        if (child.type.displayName === "TabsList") {
          return <child.type key={index} {...child.props} active={active} setActive={setActive} />;
        }
        if (child.type.displayName === "TabsContent" && child.props.value === active) {
          return <div key={index}>{child}</div>;
        }
        return null;
      })}
    </div>
  );
}
export function TabsList({ children, className, active, setActive }) {
  return (
    <div className={cn("flex gap-2", className)}>
      {children.map((child, index) => (
        <child.type
          {...child.props}
          key={child.props.value || index}
          isActive={active === child.props.value}
          onClick={() => setActive(child.props.value)}
        />
      ))}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-lg transition-all shadow-md",
        isActive 
          ? "bg-gradient-to-r from-[#5865f2] to-[#8b5cf6] text-white" 
          : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
      )}
    >
      {children}
    </motion.button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ children }) {
  return <div>{children}</div>;
}
TabsContent.displayName = "TabsContent";

// Main UI
export default function TypeBlazeUI() {
  const easyParagraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is perfect for beginners to practice typing accuracy and rhythm.",
    "Typing is an essential skill in the digital era. Practicing simple sentences daily helps beginners improve speed and accuracy gradually without stress.",
    "Writing blogs is a great way to express thoughts online. Practicing typing regularly ensures ideas are captured quickly and clearly, helping beginners communicate efficiently.",
    "Technology evolves every year, bringing faster devices and smarter software. Learning to type efficiently allows students and professionals to stay ahead and communicate their ideas clearly.",
    "Consistency is the key to improvement. Spending even fifteen minutes a day on typing exercises can significantly boost confidence, speed and accuracy over time.",
  ];
  const mediumParagraphs = [
    "Artificial intelligence has quickly become part of daily life, powering voice assistants, recommendation systems, and smart devices. Typing practice helps students and professionals communicate clearly, write code, and document insights effectively.",
    "A lifestyle blog blends storytelling with advice. Writers share routines, hobbies, and challenges to connect with readers. Fast and accurate typing helps capture ideas before they fade, ensuring smooth and expressive writing.",
    "Programming is not only about solving problems but also writing code that others can read and understand. Clear comments and documentation are essential. Typing fluently allows developers to focus on logic instead of keystrokes and errors.",
    "Typing speed plays a crucial role in productivity. Quick and accurate typing saves hours over time, whether writing reports, essays, or research papers. Consistent practice produces long-term benefits in professional and academic life.",
  ];
  const hardParagraphs = [
    "Advancements in quantum computing promise to revolutionize problem-solving by performing calculations previously considered impossible. Typing proficiency is vital for researchers to communicate discoveries, publish papers, and collaborate globally.",
    "Modern blogging has evolved into platforms for critical discourse on politics, philosophy, and culture. Typing fluidly allows authors to express nuanced opinions rapidly, maintaining clarity, depth, and originality in a competitive digital space.",
    "Artificial intelligence influences healthcare, governance, and education. Ethical concerns regarding bias, transparency, and accountability require clear documentation. Accurate typing ensures timely communication, while strong writing skills elevate discussions about responsible technology use.",
    "Research demands precise communication of findings. Scholars write extensive papers under deadlines. Typing practice reduces fatigue, ensures accuracy, and helps maintain clarity across complex terminology, ensuring arguments are reliable and professional.",
  ];
  
  const codingTexts = [
    "function calculateSum(a, b) { return a + b; } // Simple addition function",
    "const ReactComponent = ({ props }) => { return <div>{props.value}</div>; }",
    "#include <iostream> using namespace std; int main() { cout << 'Hello World!'; return 0; }",
    "def fibonacci(n): if n <= 1: return n else: return fibonacci(n-1) + fibonacci(n-2)",
    "public class HelloWorld { public static void main(String[] args) { System.out.println('Hello, World!'); } }"
  ];

  // States
  const [difficulty, setDifficulty] = useState("easy");
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [showSettings, setShowSettings] = useState(false);
  const [fontChoice, setFontChoice] = useState("monospace");
  const [soundTheme, setSoundTheme] = useState("mechanical");
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  
  const [xp, setXp] = useState(0);
  
  // Room management state
  const [rooms, setRooms] = useState({
    // Pre-populate with some demo rooms
    "ABC123": { 
      code: "ABC123", 
      host: "Demo Host", 
      difficulty: "easy", 
      players: [
        { id: 1, name: "Demo Host", wpm: 45, accuracy: 95, avatar: "👑", level: 10, isHost: true },
        { id: 2, name: "Player1", wpm: 32, accuracy: 88, avatar: "🔥", level: 5, isHost: false }
      ] 
    }
  });
  
  // Room-related states
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("Player" + Math.floor(Math.random() * 1000));
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Default players for single player mode
  const [players, setPlayers] = useState([
    { id: 1, name: "You", wpm: 42, accuracy: 96, avatar: "🔥", level: 12 },
    { id: 2, name: "Alice", wpm: 50, accuracy: 93, avatar: "⭐", level: 15 },
    { id: 3, name: "Bob", wpm: 38, accuracy: 88, avatar: "⚡", level: 8 },
    { id: 4, name: "Charlie", wpm: 55, accuracy: 97, avatar: "🚀", level: 20 },
  ]);

  // Refs
  const textareaRef = useRef(null);
  const keySound = useRef(typeof Audio !== "undefined" ? new Audio("/sounds/key-press.mp3") : null);
  const successSound = useRef(typeof Audio !== "undefined" ? new Audio("/sounds/success.mp3") : null);
  const buttonSound = useRef(typeof Audio !== "undefined" ? new Audio("/sounds/button-click.mp3") : null);
  const errorSound = useRef(typeof Audio !== "undefined" ? new Audio("/sounds/error.mp3") : null);
  const levelUpSound = useRef(typeof Audio !== "undefined" ? new Audio("/sounds/level-up.mp3") : null);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.add("landing-style");
    return () => {
      document.body.classList.remove("landing-style");
    };
  }, []);

  const getParagraphs = () => {
    if (difficulty === "easy") return easyParagraphs;
    if (difficulty === "medium") return mediumParagraphs;
    if (difficulty === "hard") return hardParagraphs;
    return codingTexts;
  };

  // Timer
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Calculate WPM and accuracy
  useEffect(() => {
    if (elapsed > 0 && typed.length > 0) {
      const words = typed.trim().split(/\s+/).length;
      const newWpm = Math.round((words / elapsed) * 60);
      setWpm(newWpm);
      
      const currentText = getParagraphs()[currentParaIndex];
      let correctChars = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentText[i]) {
          correctChars++;
        }
      }
      const newAccuracy = Math.round((correctChars / typed.length) * 100);
      setAccuracy(newAccuracy);
    }
  }, [elapsed, typed, currentParaIndex, difficulty]);

  // Handle level up and XP
  useEffect(() => {
    if (showResults) {
      // Calculate XP based on performance
      const xpGained = Math.round((wpm * 0.5) + (accuracy * 0.3) - (errors * 0.2));
      setXp(prev => {
        const newXp = prev + xpGained;
        const xpNeededForNextLevel = level * 100;
        
        if (newXp >= xpNeededForNextLevel) {
          setLevel(prevLevel => {
            const newLevel = prevLevel + 1;
            if (!isMuted && levelUpSound.current) {
              levelUpSound.current.play().catch(() => {});
            }
            return newLevel;
          });
          return newXp - xpNeededForNextLevel;
        }
        return newXp;
      });
      
      // Update streak
      if (accuracy >= 90) {
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    }
  }, [showResults]);

  // Room functions
  const generateRoomCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (rooms[code]); // Ensure unique code
    return code;
  };
 
  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    
    const newRoomCode = generateRoomCode();
    setRoomCode(newRoomCode);
    
    // Create new room object
    const newRoom = {
      code: newRoomCode,
      host: playerName.trim(),
      difficulty: difficulty,
      players: [
        { 
          id: Date.now(), 
          name: playerName.trim(), 
          wpm: 0, 
          accuracy: 100, 
          avatar: "🔥", 
          level: level,
          isHost: true 
        }
      ]
    };
    
    console.log("Creating room:", newRoomCode, newRoom); // Debug log
    
    // Add room to rooms object
    setRooms(prev => ({
      ...prev,
      [newRoomCode]: newRoom
    }));
    
    // Set current room info
    setRoomInfo(newRoom);
    setIsInRoom(true);
    setShowCreateRoom(false);
    
    // Show the room code to user
    alert(`Room created successfully! Your room code is: ${newRoomCode}\nShare this code with others to join.`);
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    
    const codeToJoin = joinRoomCode.trim().toUpperCase();
    
    if (!codeToJoin) {
      alert("Please enter room code");
      return;
    }
    
    console.log("Trying to join room:", codeToJoin); // Debug log
    console.log("Available rooms:", rooms); // Debug log
    
    // Check if room exists with exact code match
    if (!rooms[codeToJoin]) {
      alert(`Room "${codeToJoin}" not found. Please check the room code and try again.`);
      return;
    }
    
    // Get the room
    const targetRoom = rooms[codeToJoin];
    
    // Check if player name already exists in room
    if (targetRoom.players.some(player => player.name === playerName.trim())) {
      alert("A player with this name already exists in the room. Please use a different name.");
      return;
    }
    
    // Add player to room
    const updatedRoom = {
      ...targetRoom,
      players: [
        ...targetRoom.players,
        { 
          id: Date.now(), 
          name: playerName.trim(), 
          wpm: 0, 
          accuracy: 100, 
          avatar: "🔥", 
          level: level,
          isHost: false 
        }
      ]
    };
    
    console.log("Joining room:", updatedRoom); // Debug log
    
    // Update rooms
    setRooms(prev => ({
      ...prev,
      [codeToJoin]: updatedRoom
    }));
    
    // Set current room info
    setRoomCode(codeToJoin);
    setRoomInfo(updatedRoom);
    setIsInRoom(true);
    setShowJoinRoom(false);
    setJoinRoomCode("");
    
    // Update difficulty to match room
    setDifficulty(updatedRoom.difficulty);
  };

  const handleLeaveRoom = () => {
    if (roomCode && roomInfo) {
      console.log("Leaving room:", roomCode); // Debug log
      
      // Remove current player from room
      const updatedRoom = {
        ...roomInfo,
        players: roomInfo.players.filter(player => player.name !== playerName.trim())
      };
      
      // If no players left, delete the room
      if (updatedRoom.players.length === 0) {
        const newRooms = { ...rooms };
        delete newRooms[roomCode];
        setRooms(newRooms);
        console.log("Room deleted (empty):", roomCode); // Debug log
      } else {
        // Update the room with remaining players
        setRooms(prev => ({
          ...prev,
          [roomCode]: updatedRoom
        }));
        console.log("Room updated:", roomCode, updatedRoom); // Debug log
      }
    }
    
    setIsInRoom(false);
    setRoomInfo(null);
    setRoomCode("");
    setJoinRoomCode("");
  };

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Update players in room based on performance
  useEffect(() => {
    if (isInRoom && roomCode && roomInfo && showResults) {
      // Update current player's stats in the room
      const updatedPlayers = roomInfo.players.map(player => 
        player.name === playerName.trim() 
          ? { ...player, wpm: wpm, accuracy: accuracy }
          : player
      );
      
      const updatedRoom = {
        ...roomInfo,
        players: updatedPlayers
      };
      
      setRoomInfo(updatedRoom);
      setRooms(prev => ({
        ...prev,
        [roomCode]: updatedRoom
      }));
    }
  }, [showResults, wpm, accuracy]);

  // Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    const currentText = getParagraphs()[currentParaIndex];
    
    if (!isRunning && value.length > 0) setIsRunning(true);
    
    // Check for errors
    if (value.length > 0 && value[value.length - 1] !== currentText[value.length - 1]) {
      setErrors(errors + 1);
      if (!isMuted && errorSound.current) {
        errorSound.current.pause();
        errorSound.current.currentTime = 0;
        errorSound.current.play().catch(() => {});
      }
    }
    
    setTyped(value);

    // Play key sound
    if (!isMuted && keySound.current && value.length > typed.length) {
      keySound.current.pause();
      keySound.current.currentTime = 0;
      keySound.current.play().catch(() => {});
    }

    // Check if text is completed
    if (value === currentText) {
      setIsRunning(false);
      setShowResults(true);
      if (!isMuted && successSound.current) {
        successSound.current.play().catch(() => {});
      }
    }
  };

  // New paragraph
  const handleNewText = () => {
    const paras = getParagraphs();
    const nextIndex = Math.floor(Math.random() * paras.length);
    setCurrentParaIndex(nextIndex);
    setTyped("");
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setIsRunning(false);
    setShowResults(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Reset current text
  const handleReset = () => {
    setTyped("");
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setIsRunning(false);
    setShowResults(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Save settings
  const handleSaveSettings = () => {
    setShowSettings(false);
  };

  // Font class mapping
  const fontClasses = {
    "monospace": "font-mono",
    "sans": "font-sans",
    "serif": "font-serif"
  };

  // Get available rooms for display
  const availableRooms = Object.values(rooms).filter(room => room.players.length > 0);

  // Add landing page styles
  const landingStyles = `
    .landing-style {
      background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%) !important;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      min-height: 100vh;
    }
    
    .landing-bg-glow-1 {
      position: fixed;
      top: -200px;
      left: -200px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(88, 101, 242, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(80px);
      animation: float 20s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    }
    
    .landing-bg-glow-2 {
      position: fixed;
      bottom: -200px;
      right: -200px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(80px);
      animation: float 20s ease-in-out infinite;
      animation-delay: -10s;
      pointer-events: none;
      z-index: 1;
    }
    
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(100px, -100px) scale(1.1); }
      66% { transform: translate(-100px, 100px) scale(0.9); }
    }
    
    .neon-text-gradient {
      background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      text-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
    }
    
    .glass-card-landing {
      background: linear-gradient(135deg, rgba(16, 20, 48, 0.8) 0%, rgba(26, 31, 58, 0.8) 100%);
      border-radius: 24px;
      border: 1px solid rgba(139, 92, 246, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.1);
      backdrop-filter: blur(20px);
    }
    
    .btn-gradient-primary {
      background: linear-gradient(135deg, #5865f2 0%, #7c3aed 100%);
      color: white;
      box-shadow: 0 8px 24px rgba(88, 101, 242, 0.4);
    }
    
    .btn-gradient-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(88, 101, 242, 0.6);
    }
    
    .btn-glass-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-glass-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    .stat-value-landing {
      background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .practice-text-landing {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 300;
    }
    
    .text-gray-landing {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .border-landing {
      border-color: rgba(255, 255, 255, 0.1);
    }
  `;

  return (
    <>
      <style>{landingStyles}</style>
      <div className="landing-bg-glow-1" />
      <div className="landing-bg-glow-2" />
      
      <div className={cn(
        "min-h-screen flex flex-col transition-colors duration-300 relative z-10",
        fontClasses[fontChoice]
      )}>
        {/* Header */}
        <header className={cn(
          "px-6 py-4 flex items-center justify-between border-b border-landing backdrop-blur-xl shadow-lg glass-card-landing mx-6 mt-4 rounded-2xl"
        )}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#5865f2] to-[#8b5cf6] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className={cn(
                "relative flex items-center gap-2 rounded-lg px-4 py-2 ring-1 border-landing"
              )}>
                <h1 className="text-4xl font-extrabold tracking-wide neon-text-gradient">
                  TypeBlaze
                </h1>
              </div>
            </div>
            {isInRoom && roomInfo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg btn-glass-secondary"
                )}
              >
                <Users size={16} />
                <span className="text-sm font-medium">Room: {roomInfo.code}</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {roomInfo.players.length} player{roomInfo.players.length !== 1 ? 's' : ''}
                </span>
                <Button
                  onClick={handleLeaveRoom}
                  muted={isMuted}
                  soundRef={buttonSound}
                  className="p-1 hover:bg-red-500/20 text-red-400"
                >
                  <X size={14} />
                </Button>
              </motion.div>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1 rounded-full border-landing">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Level {level}</span>
              <div className="w-16 h-1 bg-gray-600/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#5865f2] to-[#8b5cf6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / (level * 100)) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            {streak > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-[#5865f2]/20 px-3 py-1 rounded-full text-[#8b5cf6] border border-[#8b5cf6]/30"
              >
                <Zap size={14} />
                <span className="text-sm font-medium">{streak} streak</span>
              </motion.div>
            )}
            <Button
              onClick={() => setIsMuted((m) => !m)}
              muted={isMuted}
              soundRef={buttonSound}
              className="btn-glass-secondary"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Button 
              onClick={() => setShowSettings(true)}
              muted={isMuted} 
              soundRef={buttonSound} 
              className="btn-glass-secondary"
            >
              <Settings size={18} />
            </Button>
            {!isInRoom && (
              <>
                <Button 
                  muted={isMuted} 
                  soundRef={buttonSound} 
                  className="btn-gradient-primary px-4"
                  onClick={() => setShowCreateRoom(true)}
                >
                  Create Room
                </Button>
                <Button 
                  muted={isMuted} 
                  soundRef={buttonSound} 
                  className="btn-gradient-primary px-4"
                  onClick={() => setShowJoinRoom(true)}
                >
                  Join Room
                </Button>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 grid md:grid-cols-3 gap-6 p-6">
          {/* Typing Area */}
          <div className={cn(
            "col-span-2 rounded-2xl shadow-xl glass-card-landing"
          )}>
            <div className={cn(
              "p-4 border-b border-landing flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            )}>
              <h3 className={cn(
                "text-xl font-semibold neon-text-gradient"
              )}>
                Typing Challenge ({difficulty})
                {isInRoom && <span className="ml-2 text-sm text-green-400">• Multiplayer ({roomInfo.players.length} players)</span>}
              </h3>
              <div className="flex gap-2 items-center">
                <select
                  value={difficulty}
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                    handleNewText();
                  }}
                  disabled={isInRoom}
                  className={cn(
                    "p-2 rounded-lg border-landing focus:ring-2 focus:ring-[#5865f2] outline-none btn-glass-secondary",
                    isInRoom && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="coding">Coding</option>
                </select>
                <Button 
                  muted={isMuted} 
                  soundRef={buttonSound} 
                  className="btn-gradient-primary px-3" 
                  onClick={handleNewText}
                  disabled={isInRoom}
                >
                  New Text
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Results Screen */}
              {showResults ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "p-6 rounded-lg border-landing text-center glass-card-landing"
                  )}
                >
                  <h3 className={cn(
                    "text-2xl font-bold mb-4 neon-text-gradient"
                  )}>Test Completed! 🎉</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={cn(
                        "p-4 rounded-lg glass-card-landing"
                      )}
                    >
                      <div className={cn(
                        "text-3xl font-bold neon-text-gradient"
                      )}>{wpm}</div>
                      <div className="text-gray-landing">WPM</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={cn(
                        "p-4 rounded-lg glass-card-landing"
                      )}
                    >
                      <div className={cn(
                        "text-3xl font-bold neon-text-gradient"
                      )}>{accuracy}%</div>
                      <div className="text-gray-landing">Accuracy</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={cn(
                        "p-4 rounded-lg glass-card-landing"
                      )}
                    >
                      <div className={cn(
                        "text-3xl font-bold neon-text-gradient"
                      )}>{elapsed}s</div>
                      <div className="text-gray-landing">Time</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={cn(
                        "p-4 rounded-lg glass-card-landing"
                      )}
                    >
                      <div className={cn(
                        "text-3xl font-bold neon-text-gradient"
                      )}>{errors}</div>
                      <div className="text-gray-landing">Errors</div>
                    </motion.div>
                  </div>
                  <Button
                    muted={isMuted}
                    soundRef={buttonSound}
                    onClick={handleNewText}
                    className="btn-gradient-primary px-6 py-3"
                    disabled={isInRoom}
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className={cn(
                      "p-4 rounded-lg border-landing text-2xl leading-relaxed break-words whitespace-pre-wrap practice-text-landing glass-card-landing"
                    )}
                  >
                    {getParagraphs()[currentParaIndex].split("").map((char, idx) => {
                      const typedChar = typed[idx];
                      let className = "text-gray-landing";
                      if (typedChar !== undefined) {
                        className = typedChar === char 
                          ? "text-green-400" 
                          : "text-red-400 underline";
                      }
                      if (idx === typed.length) {
                        className += " bg-[#5865f2]/30 border-l-2 border-[#8b5cf6]";
                      }
                      return (
                        <span key={idx} className={className}>
                          {char}
                        </span>
                      );
                    })}
                  </motion.div>

                  <textarea
                    ref={textareaRef}
                    value={typed}
                    onChange={handleChange}
                    placeholder="Start typing here..."
                    className={cn(
                      "w-full p-4 rounded-lg border-landing focus:ring-2 focus:ring-[#5865f2] outline-none text-xl glass-card-landing"
                    )}
                    rows={4}
                  />

                  <Progress value={(typed.length / getParagraphs()[currentParaIndex].length) * 100} className="h-2" />

                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <Button
                        muted={isMuted}
                        soundRef={buttonSound}
                        onClick={() => setIsRunning(true)}
                        disabled={isRunning}
                        className="btn-gradient-primary px-4 disabled:opacity-50"
                      >
                        Start
                      </Button>
                      <Button
                        muted={isMuted}
                        soundRef={buttonSound}
                        onClick={handleReset}
                        className="btn-glass-secondary px-4"
                      >
                        Reset
                      </Button>
                    </div>
                    
                    <div className="flex gap-4 text-md">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-landing font-medium">Time</span>
                        <span className={cn(
                          "font-bold text-lg neon-text-gradient"
                        )}>{elapsed}s</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-landing font-medium">WPM</span>
                        <span className={cn(
                          "font-bold text-lg neon-text-gradient"
                        )}>{wpm}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-landing font-medium">Accuracy</span>
                        <span className={cn(
                          "font-bold text-lg neon-text-gradient"
                        )}>{accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats + Leaderboard */}
          <div className="space-y-6">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid grid-cols-2 bg-transparent mt-2">
                <TabsTrigger value="stats">📊 Stats</TabsTrigger>
                <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <div className={cn(
                  "rounded-2xl shadow-md mt-4 glass-card-landing"
                )}>
                  <div className={cn(
                    "p-4 space-y-4 break-words whitespace-normal"
                  )}>
                    <div className="flex items-center gap-3">
                      <Users className={cn(
                        "w-5 h-5 neon-text-gradient"
                      )} />
                      <p className="text-gray-landing">Players Online: {isInRoom ? roomInfo?.players?.length || 1 : players.length}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className={cn(
                        "w-5 h-5 neon-text-gradient"
                      )} />
                      <p className="text-gray-landing">Time Elapsed: {elapsed}s</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 text-center neon-text-gradient"
                      )}>✓</div>
                      <p className="text-gray-landing">Accuracy: {accuracy}%</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 text-center neon-text-gradient"
                      )}>⚡</div>
                      <p className="text-gray-landing">WPM: {wpm}</p>
                    </div>
                    {isInRoom && roomInfo && (
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 text-center text-green-400"
                        )}>🏠</div>
                        <p className="text-gray-landing">Room: {roomInfo.code}</p>
                        <Button
                          onClick={copyRoomCode}
                          className="p-1 hover:bg-gray-600/20 btn-glass-secondary"
                          muted={isMuted}
                          soundRef={buttonSound}
                        >
                          {copySuccess ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="leaderboard">
                <div className={cn(
                  "rounded-2xl shadow-md mt-4 glass-card-landing"
                )}>
                  <div className={cn(
                    "p-4 break-words whitespace-normal"
                  )}>
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className={cn(
                        "w-5 h-5 neon-text-gradient"
                      )} />
                      <p className="font-semibold neon-text-gradient">{isInRoom ? 'Room Leaderboard' : 'Leaderboard'}</p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      {(isInRoom ? roomInfo?.players || [] : players)
                        .sort((a, b) => b.wpm - a.wpm)
                        .map((p, index) => (
                          <motion.li 
                            key={p.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                              "flex justify-between items-center py-2 px-3 rounded-lg glass-card-landing",
                              p.name === playerName.trim() && "border border-[#5865f2] bg-[#5865f2]/10"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-lg">{p.avatar}</span>
                              <span className="text-gray-landing">
                                {p.name} 
                                {p.isHost && <span className="ml-1 text-xs text-yellow-400">👑</span>}
                                {p.name === playerName.trim() && <span className="ml-1 text-xs text-blue-400">(You)</span>}
                              </span>
                              <span className="text-xs bg-gray-600/30 px-1.5 py-0.5 rounded-full text-gray-landing">
                                Lvl {p.level || 1}
                              </span>
                              {index === 0 && <Crown className={cn(
                                "w-4 h-4 text-yellow-400"
                              )} />}
                              {index === 1 && <Star className={cn(
                                "w-4 h-4 text-gray-400"
                              )} />}
                              {index === 2 && <Star className={cn(
                                "w-4 h-4 text-[#8b5cf6]"
                              )} />}
                            </span>
                            <span className={cn(
                              "font-medium neon-text-gradient"
                            )}>{p.wpm} WPM</span>
                          </motion.li>
                        ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Additional Stats Card */}
            <div className={cn(
              "rounded-2xl shadow-md glass-card-landing"
            )}>
              <div className={cn(
                "p-4 border-b border-landing"
              )}>
                <h3 className={cn(
                  "text-sm font-semibold neon-text-gradient"
                )}>Session Stats</h3>
              </div>
              <div className={cn(
                "p-4 space-y-3"
              )}>
                <div className="flex justify-between">
                  <span className="text-gray-landing">Characters:</span>
                  <span className="font-mono">{typed.length}/{getParagraphs()[currentParaIndex].length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-landing">Errors:</span>
                  <span className="font-mono text-red-400">{errors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-landing">Progress:</span>
                  <span className="font-mono">{Math.round((typed.length / getParagraphs()[currentParaIndex].length) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Create Room Modal */}
        {showCreateRoom && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "border rounded-2xl p-6 w-full max-w-md glass-card-landing border-landing"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn(
                  "text-xl font-bold neon-text-gradient"
                )}>Create Room</h3>
                <Button
                  onClick={() => setShowCreateRoom(false)}
                  className="p-1 hover:bg-gray-600/20 btn-glass-secondary"
                  muted={isMuted}
                  soundRef={buttonSound}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={cn(
                    "block mb-2 text-sm font-medium text-gray-landing"
                  )}>Your Name</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className={cn(
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  />
                </div>
                <div>
                  <label className={cn(
                    "block mb-2 text-sm font-medium text-gray-landing"
                  )}>Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className={cn(
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="coding">Coding</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={() => setShowCreateRoom(false)}
                    className="btn-glass-secondary"
                    muted={isMuted}
                    soundRef={buttonSound}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateRoom}
                    className="btn-gradient-primary"
                    muted={isMuted}
                    soundRef={buttonSound}
                  >
                    Create Room
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Join Room Modal */}
        {showJoinRoom && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "border rounded-2xl p-6 w-full max-w-md glass-card-landing border-landing"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={cn(
                  "text-xl font-bold neon-text-gradient"
                )}>Join Room</h3>
                <Button
                  onClick={() => setShowJoinRoom(false)}
                  className="p-1 hover:bg-gray-600/20 btn-glass-secondary"
                  muted={isMuted}
                  soundRef={buttonSound}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={cn(
                    "block mb-2 text-sm font-medium text-gray-landing"
                  )}>Your Name</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className={cn(
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  />
                </div>
                <div>
                  <label className={cn(
                    "block mb-2 text-sm font-medium text-gray-landing"
                  )}>Room Code</label>
                  <input
                    type="text"
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit room code"
                    maxLength={6}
                    className={cn(
                      "w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none font-mono tracking-wider glass-card-landing"
                    )}
                  />
                </div>
                {/* Available Rooms List */}
                <div>
                  <label className={cn(
                    "block mb-2 text-sm font-medium text-gray-landing"
                  )}>Available Rooms ({availableRooms.length})</label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {availableRooms.map((room) => (
                      <div 
                        key={room.code}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer hover:bg-gray-700/30 transition-colors",
                          joinRoomCode === room.code 
                            ? "border-[#5865f2] bg-[#5865f2]/10" 
                            : "border-landing"
                        )}
                        onClick={() => {
                          setJoinRoomCode(room.code);
                          setDifficulty(room.difficulty);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-mono font-bold">{room.code}</div>
                            <div className="text-sm text-gray-landing">Host: {room.host}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{room.difficulty}</div>
                            <div className="text-xs text-gray-landing">{room.players.length} players</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {availableRooms.length === 0 && (
                      <div className="text-center py-4 text-gray-landing">
                        No rooms available. Create one!
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={() => setShowJoinRoom(false)}
                    className="btn-glass-secondary"
                    muted={isMuted}
                    soundRef={buttonSound}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleJoinRoom}
                    className="btn-gradient-primary"
                    muted={isMuted}
                    soundRef={buttonSound}
                  >
                    Join Room
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "border rounded-2xl p-6 w-full max-w-md glass-card-landing border-landing"
              )}
            >
              <h3 className={cn(
                "text-xl font-bold mb-4 neon-text-gradient"
              )}>Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className={cn(
                    "block mb-2 flex items-center gap-2 text-gray-landing"
                  )}><Volume2 size={16} /> Sound Effects</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg",
                        !isMuted 
                          ? 'btn-gradient-primary' 
                          : 'btn-glass-secondary'
                      )}
                    >
                      On
                    </button>
                    <button
                      onClick={() => setIsMuted(true)}
                      className={cn(
                        "px-4 py-2 rounded-lg",
                        isMuted 
                          ? 'btn-gradient-primary' 
                          : 'btn-glass-secondary'
                      )}
                    >
                      Off
                    </button>
                  </div>
                </div>
                <div>
                  <label className={cn(
                    "block mb-2 flex items-center gap-2 text-gray-landing"
                  )}><Palette size={16} /> Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className={cn(
                      "w-full p-2 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
                <div>
                  <label className={cn(
                    "block mb-2 flex items-center gap-2 text-gray-landing"
                  )}><Type size={16} /> Font</label>
                  <select 
                    value={fontChoice}
                    onChange={(e) => setFontChoice(e.target.value)}
                    className={cn(
                      "w-full p-2 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  >
                    <option value="monospace">Monospace</option>
                    <option value="sans">Sans-serif</option>
                    <option value="serif">Serif</option>
                  </select>
                </div>
                <div>
                  <label className={cn(
                    "block mb-2 flex items-center gap-2 text-gray-landing"
                  )}><Music size={16} /> Sound Theme</label>
                  <select 
                    value={soundTheme}
                    onChange={(e) => setSoundTheme(e.target.value)}
                    className={cn(
                      "w-full p-2 rounded-lg border focus:ring-2 focus:ring-[#5865f2] outline-none glass-card-landing"
                    )}
                  >
                    <option value="mechanical">Mechanical</option>
                    <option value="soft">Soft</option>
                    <option value="retro">Retro</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={() => setShowSettings(false)}
                    className="btn-glass-secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveSettings}
                    className="btn-gradient-primary"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}