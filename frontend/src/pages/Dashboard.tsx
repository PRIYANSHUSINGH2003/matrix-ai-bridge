import React from 'react'
import { ChatWindow } from '../components/ChatWindow'

export const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Matrix Dashboard</h1>
      <ChatWindow />
    </div>
  )
}
