/**
 * Created by sbardian on 5/12/17.
 */

import Axios from 'axios';
import {
  NO_RESULTS,
  INVALID_PARAMETER,
  TOKEN_NOT_FOUND,
  TOKEN_EMPTY,
  DEFAULT_ERROR,
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
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
      "Content-Type": "application/json",
    },
  }),

  /**
   * Fetches data from the supplied API endpoint.
   *
   * response_code status code 0 returns an Object (data found).
   * response_code status code 1 returns an Object (data found but is an error).
   * response_code status code 2 returns an Object (data found but is an error).
   * response_code status code 3 returns an Object (data found but is an error).
   * response_code status code 4 returns an Object (data found but is an error).
   *
   * @private
   * @param {string} query - The query for the API.
   * @returns {Promise} - Promise which resolves to the data resulting from the
   * query, or rejects with an Error
   */
  _fetchFromApi: query => Promise
    .resolve(openTriviaAPI._axios.get(query))
      .then((res) => {
        if (res.data.response_code !== 0) {
          switch (res.data.response_code) {
            case NO_RESULTS.status:
              throw new Error(NO_RESULTS.message);
            case INVALID_PARAMETER.status:
              throw new Error(INVALID_PARAMETER.message);
            case TOKEN_NOT_FOUND.status:
              throw new Error(TOKEN_NOT_FOUND.message);
            case TOKEN_EMPTY.status:
              throw new Error(TOKEN_EMPTY.message);
            default:
              throw new Error(DEFAULT_ERROR.message);
          }
        } else {
          return res.data;
        }
      }),

  /**
   * Fetches a session token from the API
   *
   * @param {string} token - current token.
   * @returns {Number} response_code - 0 = Success.
   */
  resetToken: (token) => openTriviaAPI._fetchFromApi(`api_token.php?command=reset&token=${token}`),

  /**
   * Resets a session token from the API
   *
   * @returns {string} token - Session token.
   */
  getToken: () => openTriviaAPI._fetchFromApi('api_token.php?command=request'),

  /**
   * Fetches the questions based on the query provided.
   *
   * @param {Object} [options] a configuration object
   * @returns {Promise} a Promise which resolves to an Object representing a single
   * question or a set of questions, or rejects with an Error
   */
  getQuestions: (options) => {
    const endpoint = 'api.php';
    const params = [];

    if (options.amount) {
      params.push(`amount=${encodeURIComponent(options.amount)}`);
    } else {
      params.push('amount=1');
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
      params.push(`encoding=${encodeURIComponent(options.encode)}`);
    }
    if (options.token) {
      params.push(`token=${encodeURIComponent(options.token)}`)
    }
    return openTriviaAPI._fetchFromApi(`${endpoint}?${params.join('&')}`);
  },
};

export default openTriviaAPI;
