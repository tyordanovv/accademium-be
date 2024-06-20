import { studyFields, answers, surveyAnswerKeys, jsonRegex } from './SurveyUtils.js';

class SurveyService {
  constructor({ openAIClient }) {
    this.openAIClient = openAIClient;
  }

  formatSurveyAnswers(body) {
    return Object.keys(body).map((key) => {
      const questionIndex = parseInt(key) - 1; // Adjust to zero-based index
      const question = Object.keys(answers)[questionIndex];
      if (!question) {
        throw new Error(`Question not found for key: ${key}`);
      }
      const answerIndex = body[key];
      const answer = answers[question][answerIndex];
      if (answer === undefined) {
        throw new Error(`Answer not found for question: ${question} with index: ${answerIndex}`);
      }
      return `${key}. ${question}: ${answer}`;
    }).join('\n');
  }

  async evaluateResults(body) {
    const surveyAnswers = this.formatSurveyAnswers(body);

    const prompt = 
    `Based on the answers provided in the orientation survey below, recommend three study fields from the predefined study fields that would be the most suitable for the individual. 
    Orientation Survey Questions and Answers:
    ${surveyAnswers}

    Predefined Study Fields: ${studyFields.join(', ')}

    Please provide the recommendations in the following JSON format:

    {
        "recommendations": [
            {
                "study_field": "Field 1",
                "reason": "Reason for recommending Field 1 based on the orientation survey answers."
            },
            {
                "study_field": "Field 2",
                "reason": "Reason for recommending Field 2 based on the orientation survey answers."
            },
            {
                "study_field": "Field 3",
                "reason": "Reason for recommending Field 3 based on the orientation survey answers."
            }
        ]
    }`;

    const messages = [
      {
        role: 'system',
        content: 'You are an expert in education and career counseling.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    try {
      const response = await this.openAIClient.sendRequest(messages);
      const data = response.choices[0].message.content;
      const dataFormatted = data.replace(jsonRegex, '');
      const dataParsed = JSON.parse(dataFormatted);
      return dataParsed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default SurveyService;