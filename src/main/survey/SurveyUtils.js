const questionsAndAnswers = [
    [
      'Business and Management',
      'Engineering and Technology',
      'Healthcare and Medicine',
      'Arts and Humanities',
    ],
    [
      'Fast-paced and dynamic',
      'Collaborative and team-oriented',
      'Analytical and data-driven',
      'Creative and innovative',
    ],
    [
      'Logical analysis and reasoning',
      'Hands-on experimentation and trial-and-error',
      'Strategic planning and forecasting',
      'Intuitive insights and creativity',
    ],
    [
      'Leadership and management',
      'Technical and engineering expertise',
      'Communication and interpersonal skills',
      'Critical thinking and problem-solving abilities',
    ],
    [
      'Leading and delegating tasks',
      'Building and designing systems',
      'Helping and supporting others',
      'Creating and expressing ideas',
    ],
    [
      'Reading and studying independently',
      'Hands-on experimentation and projects',
      'Group discussions and collaborative projects',
      'Visual demonstrations and multimedia presentations',
    ],
    [
      'Climbing the corporate ladder',
      'Starting my own business or venture',
      'Making a positive impact on society',
      'Pursuing artistic or creative endeavors',
    ],
    [
      'Financial success and stability',
      'Making a difference and helping others',
      'Solving complex problems and challenges',
      'Personal growth and development',
    ],
    [
      'Persevere and push through difficulties',
      'Seek guidance and support from others',
      'Analyze the situation and develop a strategic plan',
      'Embrace change and adapt quicky',
    ],
    [
      'Strive for a challenging and demanding career',
      'Prioritize personal and family time over work commitments',
      'Find a balance between work and personal life',
      'Integrate work and personal passions seamlessly',
    ],
  ];
  
const studyFields = [
    'Language and Communication',
    'Behaviour and Society',
    'Business and Economics',
    'Exact and Information Sciences',
    'Sports and Health',
    'Science and Engineering',
    'Arts and Culture',
];
  
const surveyAnswerKeys = [
    'careerInterests',
    'workEnvironment',
    'problemSolving',
    'skillsDevelopment',
    'taskPreference',
    'learningPreference',
    'careerGoals',
    'careerMotivation',
    'adversityHandling',
    'workLifeBalance',
];

const jsonRegex = /```json|```/g;

export const getQuestionsAndAnswers = () => {
  return questionsAndAnswers;
};

export const getQuestions = () => {
  return questionsAndAnswers.map((arr) => arr[0]);
};

export const getStudyFields = () => {
  return studyFields;
};

export const getJsonRegex = () => {
  return jsonRegex;
};

export const getSurveyAnswersKeys = () => {
  return surveyAnswerKeys;
};