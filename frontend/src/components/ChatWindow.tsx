import { useState } from 'react';

export const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(50); // Default slider value

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
      <div className="h-64 overflow-y-auto mb-4 border-b border-gray-300 bg-white p-3 rounded-md custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-medium text-blue-600">You:</span> {msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">AI Response Style</h3>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 shadow-sm">
            {sliderValue < 30 ? 'Precise' : sliderValue < 70 ? 'Balanced' : 'Creative'} ({sliderValue}%)
          </span>
        </div>
        
        <div className="relative mt-3">
          <div className="absolute -top-2 left-0 right-0 flex justify-between px-1">
            <div className={`h-4 w-1 ${sliderValue < 30 ? 'bg-blue-500' : 'bg-gray-300'} rounded-full transition-colors duration-300`}></div>
            <div className={`h-4 w-1 ${sliderValue >= 30 && sliderValue < 70 ? 'bg-purple-500' : 'bg-gray-300'} rounded-full transition-colors duration-300`}></div>
            <div className={`h-4 w-1 ${sliderValue >= 70 ? 'bg-pink-500' : 'bg-gray-300'} rounded-full transition-colors duration-300`}></div>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full appearance-none cursor-pointer"
            style={{
              backgroundSize: `${sliderValue}% 100%`,
            }}
          />
          
          <div className="w-full flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span className={`transition-all duration-300 ${sliderValue < 30 ? 'font-bold text-blue-600' : ''}`}>Precise</span>
            <span className={`transition-all duration-300 ${sliderValue >= 30 && sliderValue < 70 ? 'font-bold text-purple-600' : ''}`}>Balanced</span>
            <span className={`transition-all duration-300 ${sliderValue >= 70 ? 'font-bold text-pink-600' : ''}`}>Creative</span>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-inner">
          <p className="text-xs text-gray-600">
            {sliderValue < 30 
              ? 'Precise responses focus on accuracy and factual information with minimal elaboration.'
              : sliderValue < 70 
                ? 'Balanced responses provide helpful context while staying focused on your question.'
                : 'Creative responses explore possibilities and provide more detailed explanations.'}
          </p>
        </div>
      </div>
    </div>
  );
}
