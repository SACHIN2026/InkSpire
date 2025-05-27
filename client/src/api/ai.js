import axios from './axios';

export const suggestTitle = (content, token) =>
  axios.post('/ai/suggest-title', { content }, { headers: { Authorization: `Bearer ${token}` } });

export const generateOutline = (topic, token) =>
  axios.post('/ai/generate-outline', { topic }, { headers: { Authorization: `Bearer ${token}` } });

export const summarizeBlog = (content, token) =>
  axios.post('/ai/summarize-blog', { content }, { headers: { Authorization: `Bearer ${token}` } });
