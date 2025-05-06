import React, { useState } from 'react'

export const ChatWindow = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  return (
    <div className="border p-4 rounded bg-white shadow">
      <div className="h-64 overflow-y-auto mb-4 border-b">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-medium">You:</span> {msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}
