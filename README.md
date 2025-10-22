# AI Chat App

A minimal chat application with OpenAI integration and MongoDB storage.

## Features
- Real-time chat with AI chatbot
- Message storage in MongoDB
- Clean, responsive UI
- Ready for Vercel deployment

## Local Development
```bash
npm install
npm run dev
```

## Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - MONGODB_URI
   - OPENAI_API_KEY
   - OPENAI_API_URL
4. Deploy

## Environment Variables
Already configured in `.env.local` for local development.