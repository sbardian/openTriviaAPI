/**
 * Created by sbardian on 5/12/17.
 */

import { expect, assert } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';
import openTriviaAPI from '../src';

describe('Test when API returns actual ERR instead of mock errors...', () => {
  const ERR = {
    status: 400,
    message: 'Total API fail...',
  };
  let failBoat;
  before(() => {
    moxios.install(openTriviaAPI._axios);
    failBoat = openTriviaAPI._axios.interceptors.request.use(() => {
      throw ERR;
    });
  });

  after(() => {
    moxios.uninstall(openTriviaAPI._axios);
    openTriviaAPI._axios.interceptors.request.eject(failBoat);
  });

  it('Should return actual Error from API...', (done) => {
    const onSuccess = sinon.spy();
    const onError = sinon.spy();
    openTriviaAPI._fetchFromApi('/api.php?amount=1')
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.calledOnce).to.be.false;
          expect(onError.getCall(0).args[0].status).to.equal(400);
          done();
        });
  });
});

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
        'specified query. Resetting the Token is necessary.',
      },
    });
    const onSuccess = sinon.spy();
    const onError = sinon.spy();
    openTriviaAPI._fetchFromApi('/api.php?amount=1')
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.calledOnce).to.be.false;
          expect(onError.getCall(0).args[0].message).to.equal('Session Token has ' +
              'returned all possible questions for the ' +
              'specified query. Resetting the Token is necessary.');
          done();
        });
  });

  it('Should return unknown error from api...', (done) => {
    moxios.stubRequest('https://opentdb.com/api.php', {
      status: 200,
      response:
      {
        response_code: 6,
        message: 'An unknown response_code error was return from the API.'
      }
    });
    const onSuccess = sinon.spy();
    const onError = sinon.spy();
    openTriviaAPI._fetchFromApi('/api.php')
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.calledOnce).to.be.false;
          expect(onError.getCall(0).args[0].message).to.equal('An unknown response_code ' +
              'error was return from the API.');
          done();
        });
  });
});

describe('Test openTriviaAPI calls', () => {
  let optionsResults = {};
  let optionsNoCategory = {};
  let optionsNoDifficulty = {};
  const noOptions = {};
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
      token: '',
    };
    openTriviaAPI.getToken()
        .then((data) => {
          optionsResults.token = data.token;
        });
    optionsNoCategory = {
      amount: 1,
      difficulty: 'easy',
      type: 'multiple',
      encoding: 'url3986',
    };
    optionsNoDifficulty = {
      amount: 1,
      category: 9,
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

  it('Should return NO_RESULTS response_code 1...', (done) => {
    openTriviaAPI._fetchFromApi(endpointNoResults)
        .catch((err) => {
          expect(err.message).to.equal('Your query return no results.');
          done();
        });
  });

  it('Should return INVALID_PARAMETER response_code 2...', (done) => {
    openTriviaAPI._fetchFromApi(endpointInvalid)
        .catch((err) => {
          expect(err.message).to.equal('Could not return results. The API does not have ' +
              'enough questions for your query. (Ex. Asking for 50 Questions in a Category ' +
              'that only has 20.)');
          done();
        });
  });

  it('Should return TOKEN_NOT_FOUND response_code 3...', (done) => {
    openTriviaAPI._fetchFromApi(endpointFakeToken)
        .catch((err) => {
          expect(err.message).to.equal('Session Token does not exist.');
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
    openTriviaAPI.getQuestions(noOptions)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });

  it('Test getQuestions with options that have no category...', (done) => {
    openTriviaAPI.getQuestions(optionsNoCategory)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });

  it('Test getQuestions with options that have no difficulty...', (done) => {
    openTriviaAPI.getQuestions(optionsNoDifficulty)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });
});
