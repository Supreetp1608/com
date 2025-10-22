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
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .chat-box {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 24px;
          font-weight: 600;
        }
        .messages {
          height: 400px;
          overflow-y: auto;
          padding: 20px;
          background: #f8f9fa;
        }
        .message {
          margin-bottom: 15px;
          display: flex;
        }
        .message.user {
          justify-content: flex-end;
        }
        .message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }
        .message.user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .message.ai .message-bubble {
          background: white;
          color: #333;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .typing {
          color: #666;
          font-style: italic;
          padding: 10px 20px;
        }
        .input-area {
          padding: 20px;
          background: white;
          display: flex;
          gap: 10px;
        }
        .input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        .input:focus {
          border-color: #667eea;
        }
        .send-btn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
      
      <div className="container">
        <div className="chat-box">
          <div className="header">
            AI Chat Assistant
          </div>
          
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div className="typing">AI is typing...</div>}
          </div>

          <div className="input-area">
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}