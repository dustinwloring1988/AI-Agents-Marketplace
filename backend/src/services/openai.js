const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CODE_SYSTEM_PROMPT = `You are an expert software developer with deep knowledge across multiple programming languages and frameworks.
Your task is to generate high-quality, production-ready code based on user requirements.

Follow these guidelines:
1. Write clean, well-documented code following best practices
2. Include helpful comments explaining complex logic
3. Use modern language features and idioms
4. Follow language-specific conventions and style guides
5. Consider edge cases and error handling
6. If tests are requested, write comprehensive unit tests
7. Structure the code in a maintainable and scalable way

Format your response in markdown:
1. Start with a brief explanation of the implementation
2. Use appropriate markdown code blocks with language syntax highlighting
3. After the code, include a brief usage example
4. If relevant, add notes about dependencies or setup requirements`;

async function generateContent({ topic, contentType, tone, wordCount }) {
  try {
    const prompt = `Write a ${contentType} about ${topic} in a ${tone} tone. 
    The content should be approximately ${wordCount} words long.
    Make it engaging and well-structured.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer skilled in creating various types of content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: Math.min(wordCount * 4, 4000), // Rough estimate of tokens needed
      temperature: 0.7,
    });

    return {
      content: completion.choices[0].message.content,
      usage: completion.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate content');
  }
}

async function generateCode({ prompt, language, type, include_tests }) {
  try {
    const userPrompt = `Generate ${type} in ${language}. Requirements: ${prompt}${include_tests === 'Yes' ? '\nPlease include unit tests.' : ''}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: CODE_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.3,
    });

    return {
      content: completion.choices[0].message.content,
      usage: completion.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate code');
  }
}

module.exports = { generateContent, generateCode }; 