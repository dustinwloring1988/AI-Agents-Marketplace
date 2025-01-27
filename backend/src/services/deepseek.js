const axios = require('axios');

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

async function analyzeData({ datasetUrl, analysisType, targetVariable }) {
  try {
    // First, fetch the dataset
    const dataResponse = await axios.get(datasetUrl);
    const dataset = dataResponse.data;

    // Prepare the analysis prompt based on the type
    const prompt = getAnalysisPrompt(analysisType, targetVariable, dataset);

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a data analysis expert skilled in statistical analysis and data interpretation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      analysis: response.data.choices[0].message.content,
      usage: response.data.usage
    };
  } catch (error) {
    console.error('Deepseek API Error:', error);
    throw new Error('Failed to analyze data');
  }
}

function getAnalysisPrompt(analysisType, targetVariable, dataset) {
  switch (analysisType) {
    case 'Descriptive':
      return `Perform a descriptive analysis of the dataset, focusing on ${targetVariable}. 
      Include summary statistics, distribution analysis, and key insights.
      Dataset: ${JSON.stringify(dataset)}`;
    
    case 'Predictive':
      return `Perform a predictive analysis for ${targetVariable} using the available data. 
      Include correlation analysis, potential predictive factors, and model recommendations.
      Dataset: ${JSON.stringify(dataset)}`;
    
    case 'Diagnostic':
      return `Perform a diagnostic analysis of ${targetVariable}, identifying any anomalies, 
      patterns, or issues in the data. Include root cause analysis and recommendations.
      Dataset: ${JSON.stringify(dataset)}`;
    
    default:
      return `Analyze the dataset focusing on ${targetVariable}. 
      Provide comprehensive insights and recommendations.
      Dataset: ${JSON.stringify(dataset)}`;
  }
}

module.exports = { analyzeData }; 