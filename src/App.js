import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    try {
      const { data } = await axios.post('https://your-railway-backend-url/api/chat', { message: input });
      const botResponse = data.choices[0].message.content;
      setChat([...newChat, { role: 'bot', content: botResponse }]);
    } catch (error) {
      setChat([...newChat, { role: 'bot', content: "Error: Could not get response from server" }]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Chatlyme AI Chatbot</h1>
      <div style={{ border: '1px solid #ccc', minHeight: 300, padding: 10, marginBottom: 10, overflowY: 'auto' }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', color: msg.role === 'bot' ? 'blue' : 'black' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}: </strong>{msg.content}
          </p>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..." 
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
    </div>
  );
}
