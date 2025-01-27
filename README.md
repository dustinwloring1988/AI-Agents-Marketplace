![image](https://github.com/user-attachments/assets/331b450c-fec8-4cb9-b119-ddb140cadd9d)

# AI Agents Marketplace

A modern web application that provides access to various AI agents for content generation, image creation, code generation, and more. Built with Next.js, Express, and various AI models.

## Features

### Content Generation
- **Content Writer**: Generate high-quality, engaging content for various purposes
- **Code Generator**: Create production-ready code with explanations and best practices

### Image Processing
- **Flux Image Generator**: Create stunning AI-generated images from text descriptions
- **Recraft Image Generator**: Generate images with customizable styles using Recraft AI
- **Background Remover**: Remove backgrounds from images with high precision
- **Image Enlarger**: Upscale images by 2x or 4x while maintaining quality

### Audio & Vision
- **Text to Audio**: Convert text to natural-sounding speech using Kokoro voice model
- **Image Caption**: Generate accurate descriptions of images using AI

## Tech Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- React Markdown

### Backend
- Express.js
- Node.js
- OpenAI API
- Replicate API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key
- Replicate API token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-agent.git
cd ai-agent
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables:
```bash
# In the backend directory
cp .env.example .env
```
Edit `.env` and add your API keys:
- `OPENAI_API_KEY`: Your OpenAI API key
- `REPLICATE_API_TOKEN`: Your Replicate API token

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The server will run on http://localhost:3001

2. In a new terminal, start the frontend:
```bash
# From the root directory
npm run dev
```
The application will be available at http://localhost:3000

## Available Agents

1. **Content Writer**
   - Generate blog posts, articles, and marketing content
   - Adjustable tone and style
   - Customizable word count

2. **Flux Image Generator**
   - Create images from text descriptions
   - Multiple art styles available
   - Customizable aspect ratios

3. **Code Generator**
   - Support for multiple programming languages
   - Different code types (functions, classes, APIs)
   - Optional test generation

4. **Text to Audio**
   - Convert text to natural speech
   - Multiple voices available
   - Adjustable speech speed

5. **Image Caption**
   - Generate detailed image descriptions
   - Custom analysis prompts
   - Natural language output

6. **Background Remover**
   - Clean background removal
   - Supports various image formats
   - High-precision output

7. **Image Enlarger**
   - 2x and 4x upscaling
   - Maintains image quality
   - AI-powered enhancement

8. **Recraft Image Generator**
   - Multiple artistic styles
   - Various size options
   - Professional-quality output

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for their powerful language models
- Replicate for their diverse AI model marketplace
- The open-source community for various tools and libraries used in this project

## Other Images
![image](https://github.com/user-attachments/assets/7e901b35-4b57-4e4c-9632-7225c732c115)

