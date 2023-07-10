import axios from 'axios';

async function generateDiagnosis(summaryInput: string) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical assistant who is an expert in medicine that aids the doctor by providing preliminary diagnosis and treatment suggestions. Please return the response data as html inside a div with id="response".',
          },
          {
            role: 'user',
            content: `The patient has presented with the following symptoms: ${summaryInput}`
          },
        ],
        max_tokens: 1500,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export default generateDiagnosis;