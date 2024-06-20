import fetch from 'node-fetch';
import { openaiConfig } from '../config/environment.js';

class OpenAIClient {
  constructor() {
    this.apiKey = openaiConfig.openai_key;
    this.apiUrl = openaiConfig.openai_url;
  }

  async sendRequest(messages, model = 'gpt-4o', temperature = 0.2, max_tokens = 1000) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        messages,
        model,
        temperature,
        max_tokens,
      }),
    };

    try {
      const response = await fetch(this.apiUrl, options);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error with OpenAI request:', error);
      throw error;
    }
  }
}

export default OpenAIClient;
