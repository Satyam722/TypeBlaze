import React, { useState, useEffect } from "react";
import socket from "../socket";

function Lobby({ onGameStart }) {
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [joinRoomId, setJoinRoomId] = useState("");

  // CREATE ROOM
  const handleCreateRoom = () => {
    socket.emit("createRoom");

    socket.once("roomCreated", (data) => {
      setRoomCode(data.roomId);
      setPlayers([data.userId]);
    });
  };

  // JOIN ROOM
  const handleJoinRoom = () => {
    if (!joinRoomId) return alert("Enter room code");

    socket.emit("joinRoom", joinRoomId);

    socket.once("userJoined", (data) => {
      onGameStart(data.roomId); // automatically join game
    });

    socket.once("error", (msg) => {
      alert(msg);
    });
  };

  // Listen for new players joining the creator's room
  useEffect(() => {
    socket.on("userJoined", (data) => {
      if (data.roomId === roomCode) {
        setPlayers((prev) => [...prev, data.userId]);
        onGameStart(roomCode); // automatically move creator when someone joins
      }
    });

    return () => {
      socket.off("userJoined");
    };
  }, [roomCode]);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold text-orange-500">TypeBlaze</h1>

      {/* CREATE ROOM */}
      <button
        onClick={handleCreateRoom}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Create Room
      </button>

      {roomCode && (
        <p className="text-green-500 mt-2">
          Room Code: <span className="font-bold">{roomCode}</span>
        </p>
      )}

      {/* JOIN ROOM */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Enter Room Code"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Lobby;
