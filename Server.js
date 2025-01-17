const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error response from OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while communicating with OpenAI." });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
