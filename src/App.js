import "./App.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function App() {
  const [received, setReceived] = useState("Empty");
  const [confirmed, setConfirmed] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const msgRef = useRef();
  const roomRef = useRef();
  const joinRoom = () => {
    socket.emit("join", roomRef.current.value);
    setCurrentRoom(roomRef.current.value)
    setConfirmed(true)
  };
  const sendMessage = () => {
    console.log("----SENDING----");
    socket.emit("send", {message: msgRef.current.value, room: currentRoom});
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log(data);
      setReceived(data);
    });
  }, []);
  if (confirmed) {
    return (
      <div className="App">
        <h1>Room: {currentRoom}</h1>
        <h2>Send Something</h2>
        <input type="text" ref={msgRef} />
        <button onClick={sendMessage}>Send</button>
        <h2>Receive</h2>
        <h3 className="colored-text">{received}</h3>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Join a room to begin</h1>
        <input type="text" ref={roomRef} />
        <button onClick={joinRoom}>Send</button>
      </div>
    );
  }
}

export default App;
