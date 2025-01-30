import { useState, useEffect, useRef } from 'react'
// import { getDeepSeekResponse } from './deepseekService';
import './App.css'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim()) {
      // Add user message to the chat
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: newMessage }]);
      setNewMessage('');

      // Get response from DeepSeek API
      const botResponse = await getDeepSeekResponse(newMessage);

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: botResponse },
      ]);
    }
  };

  // scroll control
  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom every time the messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full min-h-screen abg-gray-100 min-w-sm max-w-2xl">
      <div className="bg-red-800 w-full font-light rounded-b-sm text-sm sticky top-0">
        <p>Bot not available right now due to DeepSeek platform error</p>
      </div>
      <h1 className='text-lg font-bold sticky top-5 -mb-16'>DeepSeek Chat by Alfa</h1>
  <div className="rounded-lg shadow-md w-full md:min-w-2xl p-2 flex flex-col py-20 h-screen">
    {/* Messages container: make it scrollable and flexible */}
    <div className="flex-1 overflow-y-auto space-y-4 pl-2 md:pr-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg break-words ${
            msg.role === 'user' ? 'bg-blue-800 text-white text-right' : 'bg-gray-200 text-left'
          }`}
        >
          <strong className="font-bold">{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
          <p>{msg.content}</p>
        </div>
      ))}
      {/* Scroll to bottom marker */}
      <div ref={messagesEndRef} />
    </div>
  </div>
   {/* Input box and button fixed at the bottom */}
   <div className="absolute bottom-0 flex items-center space-x-2 p-2 md:min-w-2xl min-w-sm max-w-2xl">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="w-full p-3 rounded-lg border-1 border-gray-300 focus:border-1 focus:outline-none focus:ring-3 focus:ring-blue-700"
      />
      <button
      disabled={!newMessage}
      onClick={sendMessage}
      className={`p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none ${!newMessage ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
      >
          Send
      </button>

    </div>
</div>


  );
};

export default App;
