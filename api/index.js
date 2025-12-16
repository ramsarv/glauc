const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Allow requests from your Vercel deployment
app.use(cors({
  origin: "*", // For production, restrict this to your Vercel domain later
  methods: ["GET", "POST"]
}));

app.use(express.json());

// Ideally, set GEMINI_API_KEY in Vercel Settings > Environment Variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

app.get('/api/health', (req, res) => {
  res.send('Glauc Backend Server is Running');
});

app.post('/api/glauc/analyze', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API Error:", errorText);
      throw new Error(`Gemini API Error: ${geminiResponse.statusText}`);
    }

    const data = await geminiResponse.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis available.";

    res.json({ result: aiText });

  } catch (error) {
    console.error("Server Error calling Gemini:", error);
    res.status(500).json({ error: "Failed to process AI request" });
  }
});

// EXPORT THE APP FOR VERCEL (Do not use app.listen)
module.exports = app;
