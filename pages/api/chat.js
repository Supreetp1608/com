import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body

  try {
    // Call OpenAI API
    const response = await fetch(process.env.OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
      }),
    })

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Store in MongoDB
    const client = await clientPromise
    const db = client.db('chatapp')
    await db.collection('chats').insertOne({
      userMessage: message,
      aiResponse,
      timestamp: new Date(),
    })

    res.json({ response: aiResponse })
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat' })
  }
}