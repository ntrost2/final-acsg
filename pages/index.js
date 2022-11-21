import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      socketInitializer();
      return () => {
        console.log("This will be logged on unmount");
      }
    }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('messageToBeDisplayed', msg => {
      setMessages((currentMsg) => [
        ...currentMsg,
        {author: msg.author, message: msg.message},
      ]);
    })
  }

  const sendMessage = async () => {
    socket.emit("messageToPropogate", { author: chosenUsername, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message },
    ]);
    setMessage("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <main>
      {!chosenUsername ? (
        <>
          <h1>What is your name?</h1>
          <input type="text" placeholder="Identity..." value={username} onChange={(e) => setUsername(e.target.value)}/>
          <button onClick={() => {setChosenUsername(username);}}> Go! </button>
          </>
        ) : (
          <>
           <p>Your username: {username}</p>
           {messages.map((msg, i) => {
                  return (
                    <div key={i}>
                      {msg.author} : {msg.message}
                    </div>
                  );
                })}
                <input type="text" placeholder="New message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={handleKeypress}/>
                <button onClick={() => {sendMessage();}} >Send</button>
              </>
        )}
        </main>
      )
   }
