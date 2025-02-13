import { useState, useEffect, useRef } from 'react'
import { getDeepSeekResponse } from './deepseekService';
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

  //send message by enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newMessage.trim() !== '') {
      sendMessage();
    }
  };

  // scroll control
  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom every time the messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to start a new chat
  const startNewChat = () => {
    setMessages([]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col w-full min-w-sm max-w-2xl items-center">

      <div className="top w-full bg-[#242424] z-50 mb-2">
      {/* <div className="bg-red-800 w-full font-light rounded-b-sm text-sm">
        <p>Bot not available right now due to DeepSeek platform error</p>
      </div> */}

      <h1 className='text-lg font-bold mt-4'>DeepSeek AI Chat</h1>
      </div>
      
  <div className='rounded-lg w-full lg:min-w-2xl p-2 flex flex-col min-h-[calc(100vh-17rem)] max-h-[calc(100vh-17rem)]'>

    {/* Messages container: make it scrollable and flexible */}
    <div className={`flex-1 overflow-y-auto space-y-6 pl-2 md:pr-4 
      ${messages.length === 0 ? ' items-center flex justify-center' : '' }`}>

      {messages.length === 0 ? (
            // Display welcome message when no messages
            <div className="p-4 text-xl text-center text-gray-400 my-auto">
              <strong>Welcome!</strong>
              <p>Start chatting Now</p>
            </div>
          ) : (
      messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 break-words ${
            msg.role === 'user' ? 'bg-blue-800 text-white text-right rounded-l-lg' : 'bg-gray-700 text-left rounded-r-lg -translate-x-3'
          }`}
        >
          <strong className="font-bold">{msg.role === 'user' ? 'You' : 'AI'}</strong>
          <p>{msg.content}</p>
        </div>
      )))}

      {/* Scroll to bottom marker */}
      <div ref={messagesEndRef} />
    </div>
  </div>

    {/* New chat button */}
      <button
        onClick={startNewChat}
        className={`p-2 font-medium text-sm bg-red-800 text-white rounded-lg hover:bg-red-900 focus:outline-none hover:cursor-pointer ${messages.length === 0 ? 'hidden' : ''}`}>
        New Chat +
      </button>

     {/* Input box and button fixed at the bottom */}
   <div className="z-50 flex items-center space-x-2 p-2 md:min-w-2xl min-w-sm max-w-2xl">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        className="w-full p-3 rounded-lg outline-2 text-gray-100 outline-gray-300 focus:outline-1 focus:outline-none focus:ring-3 focus:ring-blue-500"
      />
      <button
      disabled={!newMessage}
      onClick={sendMessage}
      className={`p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none ${!newMessage ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
      >
          Send
      </button>

    </div>
    <div className="info mt-2 text-center mx-auto w-fit text-gray-500">
      <p>Developed by <a href="https://github.com/zeiadsalhin" target='_blank'>Alfa</a> v0.1</p>
    </div>
</div>


  );
};

export default App;
