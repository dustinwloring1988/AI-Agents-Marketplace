const express = require('express');
const router = express.Router();
const { generateContent, generateCode } = require('../services/openai');
const { generateImage, generateAudio, generateCaption, removeBackground, enlargeImage, generateRecraftImage } = require('../services/replicate');

// Code Generator
router.post('/code-generator', async (req, res) => {
    try {
      const result = await generateCode(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Recraft Image Generator
router.post('/recraft-image', async (req, res) => {
    try {
    const result = await generateRecraftImage(req.body);
    res.json(result);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Flux Image Generator
router.post('/flux-image', async (req, res) => {
  try {
    const result = await generateImage(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Content Writer Agent
router.post('/content-writer', async (req, res) => {
    try {
      const result = await generateContent(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Text to Audio Generator
router.post('/text-to-audio', async (req, res) => {
  try {
    const result = await generateAudio(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Image Caption Generator
router.post('/image-caption', async (req, res) => {
  try {
    const result = await generateCaption(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Background Remover
router.post('/remove-background', async (req, res) => {
  try {
    const result = await removeBackground(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Image Enlarger
router.post('/enlarge-image', async (req, res) => {
  try {
    const result = await enlargeImage(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 