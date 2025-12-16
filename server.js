const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed: npm install node-fetch

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your React app
app.use(express.json());

// --- CONFIGURATION ---
// Ideally, put this in a .env file (process.env.GEMINI_API_KEY)
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 

// --- ROUTES ---

// 1. Health Check
app.get('/', (req, res) => {
  res.send('Glauc Backend Server is Running');
});

// 2. AI Analysis Endpoint
// This endpoint receives a prompt from the frontend, calls Gemini securely, and returns the result.
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

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});