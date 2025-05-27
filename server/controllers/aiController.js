import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY;

const callGemini = async (prompt) => {
  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
};

export const suggestTitle = async (req, res) => {
  try {
    const { content } = req.body;
    const title = await callGemini(`Suggest a blog post title for this content:\n\n${content}`);
    res.json({ title });
  } catch (err) {
    console.error('AI error (title):', err);
    res.status(500).json({ message: 'AI title suggestion failed' });
  }
};

export const generateOutline = async (req, res) => {
  try {
    const { topic } = req.body;
    const outlineRaw = await callGemini(`Generate a blog post outline for the topic: "${topic}"`);
    const outline = outlineRaw.split(/\r?\n/).filter(Boolean);
    res.json({ outline });
  } catch (err) {
    console.error('AI error (outline):', err);
    res.status(500).json({ message: 'AI outline generation failed' });
  }
};

export const summarizeBlog = async (req, res) => {
  try {
    const { content } = req.body;
    const summary = await callGemini(`Summarize this blog post:\n\n${content}`);
    res.json({ summary });
  } catch (err) {
    console.error('AI error (summary):', err);
    res.status(500).json({ message: 'AI summarization failed' });
  }
};
