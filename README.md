# TypeBlaze ⚡
**TypeBlaze** is a high-performance, real-time multiplayer typing platform. Compete with friends, track your WPM in real-time, and master your typing speed with an immersive UI.

---

## 🚀 Tech Stack

### Frontend
* **React.js** (Vite) - Component-based UI logic.
* **Socket.io-client** - Real-time bidirectional event handling.
* **Tailwind CSS** - Modern, responsive styling.
* **Lucide React** - High-quality UI icons.

### Backend
* **Node.js & Express** - Server-side architecture.
* **Socket.io** - Powering real-time multiplayer lobbies and live sync.
* **CORS** - Secure cross-origin resource sharing.

---

## 📸 Project Showcase

### 🏠 Landing Page
Master your typing speed with our modern dashboard.
<br/>

![Landing](./screenshot/landing.png)

<br/>
<br/>

### ⌨️ Main Typing UI
Real-time stats including WPM, Accuracy, and Progress tracking.
<br/>

![UI](./screenshot/ui.png)

<br/>
<br/>

### 🛠️ Create Room
Start a private session and choose your difficulty level.
<br/>

![Create](./screenshot/create.png)

<br/>
<br/>

### 👥 Join Room
Enter a 6-digit code to compete against your friends via WebSockets.
<br/>

![Join](./screenshot/join.png)

---

## 📂 Project Structure

```text
typeblaze/
├── backend/                # Node.js / Express / Socket.io
│   ├── .env                # Private API keys (Hidden)
│   └── server.js           # Main entry point
├── frontend/               # React.js / Vite Client
│   ├── .env                # Public API URLs (Hidden)
│   └── src/                # UI Components
├── screenshot/             # Project UI Images
│   ├── landing.png
│   ├── ui.png
│   ├── create.png
│   └── join.png
├── .gitignore              # Hides .env & node_modules
└── README.md               # Documentation


cd frontend
npm install
npm run dev

License
Distributed under the MIT License.
