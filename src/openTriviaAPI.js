/**
 * Created by sbardian on 5/12/17.
 */

import Axios from 'axios';
import {
  NO_RESULTS,
  INVALID_PARAMETER,
  TOKEN_NOT_FOUND,
  TOKEN_EMPTY,
} from './responses';

const openTriviaAPI = {
  /**
   * The Axios instance used for API queries. Not meant for general use.
   *
   * @private
   */
  _axios: Axios.create({
    baseURL: 'https://opentdb.com/',
    headers: {
      // TODO: Check what headers are needed.
    },
  }),

  /**
   * Fetches data from the supplied API endpoint.
   *
   * HTTP status code 1 returns an Object (data found).
   * HTTP status code 2 TODO test API for what is returned.
   * HTTP status code 3 TODO test API for what is returned.
   * HTTP status code 4 TODO test API for what is returned.
   *
   * @private
   * @param {string} query - The query for the API.
   * @returns {Promise} - Promise which resolves to the data resulting from the
   * query (or null for 404 Not Found responses), or rejects with an Error
   */
  _fetchFromApi: query => Promise
    .resolve(openTriviaAPI._axios.get(query))
    .then(res => res.data)
    .catch((err) => {
      if (err.response) {
        switch (err.response.response_code) {
          case NO_RESULTS.status:
            throw new Error(NO_RESULTS.message);
          case INVALID_PARAMETER.status:
            throw new Error(INVALID_PARAMETER.message);
          case TOKEN_NOT_FOUND.status:
            throw new Error(TOKEN_NOT_FOUND.message);
          case TOKEN_EMPTY.status:
            throw new Error(TOKEN_EMPTY.message);
          default:
            throw new Error(err.response.status);
        }
      } else {
        throw err;
      }
    }),

  /**
   * Fetches a session token from the API
   *
   * @param {string} token - current token.
   * @returns {Number} response_code - 0 = Success.
   */
  resetToken: (token) => {
    return openTriviaAPI._fetchFromApi(`api_token.php?command=reset?token=${token}`);
  },

  /**
   * Resets a session token from the API
   *
   * @returns {string} token - Session token.
   */
  getToken: () => {
    return openTriviaAPI._fetchFromApi('api_token.php?command=request');
  },

  /**
   * Fetches the questions based on the query provided.
   *
   * @param {Object} [options] a configuration object
   * @returns {Promise} a Promise which resolves to an Object representing a single or
   * question or a set of questions (or null if no breaches were found), or rejects with
   * an Error
   */
  getQuestions: (options = { amount: 10 }) => {
    const endpoint = 'api.php';
    const params = [];
    if (options.amount) {
      params.push(`amount=${encodeURIComponent(options.amount)}`);
    }
    if (options.category) {
      params.push(`category=${encodeURIComponent(options.category)}`);
    }
    if (options.difficulty) {
      params.push(`difficulty=${encodeURIComponent(options.difficulty)}`);
    }
    if (options.type) {
      params.push(`type=${encodeURIComponent(options.type)}`);
    }
    if (options.encode) {
      params.push(`encode=${encodeURIComponent(options.encoding)}`);
    }
    return openTriviaAPI._fetchFromApi(`${endpoint}?${params.join('&')}`);
  },
};

export default openTriviaAPI;
