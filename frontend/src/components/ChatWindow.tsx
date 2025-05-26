import { useState } from 'react';

// Using OpenRouter's Mistral-7B Instruct model (free, no key for public model)
// Docs: https://openrouter.ai/docs
const AI_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const AI_MODEL = "mistralai/mistral-7b-instruct:free";

export const ChatWindow = () => {
  const [message, setMessage] = useState('');
  // Conversation now holds sender and text for both user and ai
  const [messages, setMessages] = useState<{sender: 'user'|'ai'; text: string}[]>([]);
  const [sliderValue, setSliderValue] = useState(50); // Default slider value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setMessage('');
    setLoading(true);
    setError(null);

    // Build chat history in OpenAI format (for context)
    const conversation = [...messages, {sender: 'user', text: userMsg}]
      .map(m => ({role: m.sender === 'user' ? 'user' : 'assistant', content: m.text}));

    // Set temperature for creativity
    const temperature = sliderValue < 30 ? 0.2 : sliderValue < 70 ? 0.6 : 1.0;

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: conversation,
          temperature,
        }),
      });

      if (!response.ok) {
        let msg = "API error.";
        try { msg = (await response.json()).error?.message || msg; } catch {}
        setError("AI error: " + msg);
        setMessages(prev => [...prev, { sender: 'ai', text: "❌ AI Error: " + msg }]);
      } else {
        const data = await response.json();
        const aiText =
          data?.choices?.[0]?.message?.content?.trim() ||
          "🤖 [No reply. Try again or ask differently!]";
        setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      }
    } catch (err: any) {
      setError("Network error, try again later.");
      setMessages(prev => [...prev, { sender: 'ai', text: "❌ Network error or CORS block." }]);
    }
    setLoading(false);
  };

  return (
    <div className="border p-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
      <div className="h-64 overflow-y-auto mb-4 border-b border-gray-300 bg-white p-3 rounded-md custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 italic p-4">
            Send a message to start chatting with the AI
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span
                className={`font-medium ${msg.sender === "user"
                  ? "text-blue-600"
                  : "text-purple-600"
                }`}
              >
                {msg.sender === "user" ? "You:" : "AI:"}
              </span>{" "}
              {msg.text}
            </div>
          ))
        )}
        {loading && (
          <div className="mb-2 animate-pulse text-purple-500">AI is typing...</div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          disabled={loading}
        />
        <button
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-xs bg-red-50 rounded-lg px-2 py-1">
          {error}
        </div>
      )}
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
