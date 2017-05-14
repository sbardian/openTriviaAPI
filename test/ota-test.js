/**
 * Created by sbardian on 5/12/17.
 */

import openTriviaAPI from '../src';
import { expect, assert } from 'chai';
import { sinon } from 'sinon';

describe('Test openTriviaAPI calls', () => {
  let optionsResults = {};
  let optionsNoResults = {};
  let token;
  let endpointValid;
  let endpointInvalid;
  let endpointNoResults;
  let endpointFakeToken;
  before(() => {
    optionsResults = {
      amount: 1,
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
      encoding: 'url3986',
    };
    optionsNoResults = {
      amount: 1,
      category: 1,
      difficulty: 'easy',
      type: 'multiple',
      encoding: 'url3986',
    }
    endpointValid = 'api.php?amount=1';
    endpointNoResults = 'api.php?amount=1&category=1';
    endpointInvalid = 'api.php?foo=bar';
    endpointFakeToken = 'api.php?amount=1&token=111';
  });

  it('Should return axios object...', (done) => {
    openTriviaAPI._axios()
        .then((obj) => {
          assert(obj);
          done();
        });
  });

  it('Should return response code 0 for success...', (done) => {
    openTriviaAPI._fetchFromApi(endpointValid)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });

  it('Should return NO_RESULTS response_code 1...', (done) => {
    openTriviaAPI._fetchFromApi(endpointNoResults)
        .then((err) => {
          expect(err.message).to.equal("Your query return no results.");
          done();
        });
  });

  it('Should return INVALID_PARAMETER response_code 2...', (done) => {
    openTriviaAPI._fetchFromApi(endpointInvalid)
        .then((err) => {
          expect(err.message).to.equal("Could not return results. The API does not have " +
              "enough questions for your query. (Ex. Asking for 50 Questions in a Category " +
              "that only has 20.)");
          done();
        });
  });

  it('Should return TOKEN_NOT_FOUND response_code 3...', (done) => {
    openTriviaAPI._fetchFromApi(endpointFakeToken)
        .then((err) => {
          expect(err.message).to.equal("Session Token does not exist.");
          done();
        });
  });

  it('Test getQuestions with options...', (done) => {
    openTriviaAPI.getQuestions(optionsResults)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });

  it('Test getQuestions with no options...', (done) => {
    openTriviaAPI.getQuestions()
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });

  it('Should return token...', (done) => {
    openTriviaAPI.getToken()
        .then((data) => {
          token = data.token;
          expect(data.response_code).to.equal(0);
          expect(data.token).to.be.a('string');
          done();
        });
  });

  it('Should reset token and response code 0...', (done) => {
    openTriviaAPI.resetToken(token)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          expect(data.token).to.be.a('string');
          done();
        });
  });
});
