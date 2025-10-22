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
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
        }
        .chat-box {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        .header {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(10px);
          color: #ffffff;
          padding: 24px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .messages {
          height: 420px;
          overflow-y: auto;
          padding: 24px;
          background: rgba(0, 0, 0, 0.1);
        }
        .messages::-webkit-scrollbar {
          width: 6px;
        }
        .messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .message {
          margin-bottom: 20px;
          display: flex;
          animation: fadeIn 0.5s ease-out;
        }
        .message.user {
          justify-content: flex-end;
        }
        .message-bubble {
          max-width: 85%;
          padding: 16px 20px;
          border-radius: 20px;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 400;
          position: relative;
        }
        .message.user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .message.ai .message-bubble {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .typing {
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .typing::after {
          content: '●●●';
          animation: pulse 1.5s infinite;
        }
        .input-area {
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .input {
          flex: 1;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          outline: none;
          font-size: 14px;
          color: #ffffff;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .input:focus {
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: rgba(255, 255, 255, 0.15);
        }
        .send-btn {
          padding: 16px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
        }
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div className="container">
        <div className="chat-box">
          <div className="header">
            ✨ Luxe AI Assistant
          </div>
          
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div className="typing">AI is crafting response</div>}
          </div>

          <div className="input-area">
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Share your thoughts..."
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