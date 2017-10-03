export const ERR = new Error('Request completely failed.');
export const OK_QUERY = 'ok';
export const OK_RESPONSE = {
  response_code: 0,
  results: [
    {
      category: 'Monty Python',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What...is your favorite color?',
      correct_answer: 'Blue',
      incorrect_answers: ['Yellow', 'Red', 'Green'],
    },
  ],
};
export const NORESULTS_QUERY = 'no results';
export const NORESULTS_RESPONSE = {
  response_code: 1,
  results: [],
};
export const INVALIDPARAM_QUERY = 'invalid parameter';
export const INVALIDPARAM_RESPONSE = {
  response_code: 2,
  results: [],
};
export const TOKENNOTFOUND_QUERY = 'token not found';
export const TOKENNOTFOUND_RESPONSE = {
  response_code: 3,
  results: [],
};
export const TOKENEMPTY_QUERY = 'token empty';
export const TOKENEMPTY_RESPONSE = {
  response_code: 4,
  results: [],
};
export const UNEXPECTED_QUERY = 'unexpected';
export const UNEXPECTED_RESPONSE = {
  response_code: 6,
  results: [],
};
export const TOKEN = 'myToken';
export const GET_TOKEN_QUERY = 'api_token.php?command=request';
export const GET_TOKEN_RESPONSE = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: TOKEN,
};
export const RESET_TOKEN_QUERY = `api_token.php?command=reset&token=${TOKEN}`;
export const RESET_TOKEN_RESPONSE = {
  response_code: 0,
  token: TOKEN,
};
export const OPTIONS_ALL = {
  amount: 1,
  category: 9,
  difficulty: 'easy',
  type: 'multiple',
  encode: 'url3986',
  token: TOKEN,
};
export const OPTIONS_EMPTY = {};
