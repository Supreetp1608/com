import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })
      
      const data = await res.json()
      setMessages(prev => [...prev, { type: 'ai', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', content: 'Error occurred' }])
    }
    
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>AI Chat</h1>
      
      <div style={{ height: '400px', border: '1px solid #ccc', padding: '10px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '8px 12px', 
              borderRadius: '8px',
              backgroundColor: msg.type === 'user' ? '#007bff' : '#f1f1f1',
              color: msg.type === 'user' ? 'white' : 'black'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div>AI is typing...</div>}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '10px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px' }}>
          Send
        </button>
      </div>
    </div>
  )
}