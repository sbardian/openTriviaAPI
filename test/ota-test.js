/**
 * Created by sbardian on 5/12/17.
 */

import openTriviaAPI from '../src';
import { expect, assert } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';
import axios from 'axios';

describe('Test when token is out of available questions...', () => {
  before(() => {
    moxios.install(openTriviaAPI._axios);
  });

  after(() => {
    moxios.uninstall(openTriviaAPI._axios);
  });

  it('Should return response_status 4 and match err msg...', (done) => {
    moxios.stubRequest('https://opentdb.com/api.php?amount=1', {
      status: 200,
      response:
        {
          response_code: 4,
          message: 'Session Token has returned all possible questions for the ' +
          'specified query. Resetting the Token is necessary.'
        }
    });
    let onSuccess = sinon.spy();
    let onError = sinon.spy();
    openTriviaAPI._fetchFromApi('/api.php?amount=1')
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          console.log('Success called = ', onSuccess.calledOnce);
          console.log('Error called = ', onError.calledOnce);
          console.log('Success = ', onError.getCall(0).args[0].message);
          expect(onError.getCall(0).args[0].message).to.equal('Session Token has ' +
              'returned all possible questions for the ' +
              'specified query. Resetting the Token is necessary.');
          done();
        });
  });
});

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
    };
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
        .catch((err) => {
          expect(err.message).to.equal("Your query return no results.");
          done();
        });
  });

  it('Should return INVALID_PARAMETER response_code 2...', (done) => {
    openTriviaAPI._fetchFromApi(endpointInvalid)
        .catch((err) => {
          expect(err.message).to.equal("Could not return results. The API does not have " +
              "enough questions for your query. (Ex. Asking for 50 Questions in a Category " +
              "that only has 20.)");
          done();
        });
  });

  it('Should return TOKEN_NOT_FOUND response_code 3...', (done) => {
    openTriviaAPI._fetchFromApi(endpointFakeToken)
        .catch((err) => {
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
