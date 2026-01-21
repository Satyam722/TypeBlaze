import { useState, useEffect } from "react";

export function useTypingEngine(targetText, isMuted = false) {
  const [typed, setTyped] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errors, setErrors] = useState(0);

  // Timer logic derived from your original implementation
  useEffect(() => {
    let timer;
    if (isRunning && typed !== targetText) {
      timer = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, typed, targetText]);

  // WPM and Accuracy calculations from your original source
  const words = typed.trim().split(/\s+/).length;
  const wpm = Math.round((words / (elapsed || 1)) * 60);
  
  const correctChars = typed.split("").filter((char, i) => char === targetText[i]).length;
  const accuracy = typed.length > 0 
    ? Math.round((correctChars / typed.length) * 100) 
    : 100;

  // Handle errors and sound effects logic
  const handleType = (value) => {
    if (!isRunning && value.length > 0) setIsRunning(true);
    
    if (value.length > typed.length) {
      const lastChar = value[value.length - 1];
      if (lastChar !== targetText[value.length - 1]) {
        setErrors((prev) => prev + 1);
        // Sound logic would be triggered here if provided in props
      }
    }
    setTyped(value);
  };

  const reset = () => {
    setTyped("");
    setElapsed(0);
    setIsRunning(false);
    setErrors(0);
  };

  return { typed, handleType, wpm, accuracy, elapsed, errors, isRunning, reset };
}