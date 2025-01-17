const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// ChatGPT API Route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message content is required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 50,
    });

    // Log the full response to inspect the structure
    console.log("API Response:", response);

    // Now directly access choices from the response object
    if (response.choices && response.choices.length > 0) {
      const reply = response.choices[0].message.content;
      res.json({ reply });
    } else {
      res.status(500).json({ error: "No valid response received from OpenAI." });
    }
  } catch (error) {
    console.error("Error response from OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while communicating with OpenAI." });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
