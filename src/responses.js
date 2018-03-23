/**
 * Created by sbardian on 5/12/17.
 */

export const OK = {
  status: 0,
  message: 'Success.',
};

export const NO_RESULTS = {
  status: 1,
  message: 'Your query return no results.',
};

export const INVALID_PARAMETER = {
  status: 2,
  message:
    'Could not return results. The API does not have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)',
};

export const TOKEN_NOT_FOUND = {
  status: 3,
  message: 'Session Token does not exist.',
};

export const TOKEN_EMPTY = {
  status: 4,
  message:
    'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.',
};

export const DEFAULT_ERROR = {
  response_code: 6,
  message: 'An unknown response_code error was return from the API.',
};

export const CATEGORIES_OK = {
  status: 200,
  message: 'Success',
};
