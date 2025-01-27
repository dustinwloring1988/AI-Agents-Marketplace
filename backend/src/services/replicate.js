const Replicate = require('replicate');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImage({ prompt, style, aspectRatio = '1:1 (Square)', negativePrompt }) {
  try {
    const stylePrompt = style ? `${style} style: ${prompt}` : prompt;
    
    // Extract just the ratio part (e.g., "1:1" from "1:1 (Square)")
    const ratio = aspectRatio.split(' ')[0].toLowerCase();
    
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: stylePrompt,
          negative_prompt: negativePrompt || "",
          num_outputs: 1,
          aspect_ratio: ratio,
          go_fast: true,
          megapixels: "1",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4
        }
      }
    );

    return {
      images: output,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    throw new Error('Failed to generate image: ' + error.message);
  }
}

async function generateRecraftImage({ prompt, size = "1024x1024", style = "any" }) {
  try {
    console.log('Recraft request:', { prompt, size, style });
    
    const output = await replicate.run(
      "recraft-ai/recraft-v3",
      {
        input: {
          prompt,
          size,
          style
        }
      }
    );

    console.log('Recraft response:', output);

    // Handle both array and string responses
    const images = Array.isArray(output) ? output : 
                  typeof output === 'string' ? [output] : 
                  output && output.output ? [output.output] : [];

    if (images.length === 0) {
      throw new Error('No image was generated');
    }

    return {
      images,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response,
      stack: error.stack
    });
    throw new Error('Failed to generate recraft image: ' + error.message);
  }
}

async function generateAudio({ text, speed = 1.1, voice = "af_bella" }) {
  try {
    console.log('Audio request:', { text, speed, voice });
    
    // Convert speed to number
    const speedValue = parseFloat(speed);
    
    if (isNaN(speedValue)) {
      throw new Error('Invalid speed value');
    }

    const output = await replicate.run(
      "jaaari/kokoro-82m:dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6",
      {
        input: {
          text,
          speed: speedValue,
          voice
        }
      }
    );

    console.log('Audio response:', output);

    // The model returns a URL directly
    if (typeof output !== 'string') {
      throw new Error('Invalid response from audio model');
    }

    return {
      audio_url: output,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response,
      stack: error.stack
    });
    throw new Error('Failed to generate audio: ' + error.message);
  }
}

async function generateCaption({ image, prompt = "Describe this image" }) {
  try {
    const output = await replicate.run(
      "lucataco/moondream2:72ccb656353c348c1385df54b237eeb7bfa874bf11486cf0b9473e691b662d31",
      {
        input: {
          image,
          prompt
        }
      }
    );

    // Convert array response to string if needed
    const caption = Array.isArray(output) ? output.join(' ') : output;

    return {
      caption,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    throw new Error('Failed to generate caption: ' + error.message);
  }
}

async function removeBackground({ image }) {
  try {
    const output = await replicate.run(
      "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
      {
        input: {
          image
        }
      }
    );

    return {
      image: output,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    throw new Error('Failed to remove background: ' + error.message);
  }
}

async function enlargeImage({ image, scale }) {
  try {
    // Convert user-friendly 2x/4x to actual scale factor
    const scaleMap = {
      '2x': 2,
      '4x': 4
    };
    
    const output = await replicate.run(
      "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
      {
        input: {
          image,
          scale: scaleMap[scale] || 2,
          face_enhance: false
        }
      }
    );

    return {
      image: output,
    };
  } catch (error) {
    console.error('Replicate API Error:', error);
    throw new Error('Failed to enlarge image: ' + error.message);
  }
}

module.exports = { 
  generateImage, 
  generateAudio, 
  generateCaption, 
  removeBackground,
  enlargeImage,
  generateRecraftImage
}; 