import { expect } from 'chai';
import sinon from 'sinon';
import openTriviaAPI from '../src';
import './mockAxios';
import {
  ERR,
  OK_QUERY,
  OK_RESPONSE,
  NORESULTS_QUERY,
  INVALIDPARAM_QUERY,
  TOKENNOTFOUND_QUERY,
  TOKENEMPTY_QUERY,
  UNEXPECTED_QUERY,
  GET_TOKEN_RESPONSE,
  TOKEN,
  RESET_TOKEN_RESPONSE,
  OPTIONS_ALL,
  OPTIONS_EMPTY,
} from './testData';
import {
  NO_RESULTS,
  INVALID_PARAMETER,
  TOKEN_NOT_FOUND,
  TOKEN_EMPTY,
  DEFAULT_ERROR,
} from '../src/responses';

const onSuccess = sinon.spy();
const onError = sinon.spy();

describe('_fetchFromApi', () => {
  beforeEach(() => {
    onSuccess.reset();
    onError.reset();
  });

  describe('request setup failure', () => {
    let failboat;

    before(() => {
      failboat = openTriviaAPI._axios.interceptors.request.use(() => {
        throw ERR;
      });
    });

    after(() => {
      openTriviaAPI._axios.interceptors.request.eject(failboat);
    });

    it('should re-throw request setup errors', () =>
      openTriviaAPI
        ._fetchFromApi()
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err).to.equal(ERR);
        }));
  });

  describe('successful query', () => {
    it('should handle response_code 0', () =>
      openTriviaAPI
        ._fetchFromApi(OK_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.calledOnce).to.be.true;
          expect(onError.called).to.be.false;
          const data = onSuccess.getCall(0).args[0];
          expect(data.response_code).to.equal(OK_RESPONSE.response_code);
        }));
  });

  describe('no results', () => {
    it('should handle response_code 1', () =>
      openTriviaAPI
        ._fetchFromApi(NORESULTS_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err.message).to.equal(NO_RESULTS.message);
        }));
  });

  describe('invalid parameters', () => {
    it('should handle response_code 2', () =>
      openTriviaAPI
        ._fetchFromApi(INVALIDPARAM_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err.message).to.equal(INVALID_PARAMETER.message);
        }));
  });

  describe('token not found', () => {
    it('should handle response_code 3', () =>
      openTriviaAPI
        ._fetchFromApi(TOKENNOTFOUND_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err.message).to.equal(TOKEN_NOT_FOUND.message);
        }));
  });

  describe('token empty', () => {
    it('should handle response_code 4', () =>
      openTriviaAPI
        ._fetchFromApi(TOKENEMPTY_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err.message).to.equal(TOKEN_EMPTY.message);
        }));
  });

  describe('unexpected response', () => {
    it('should handle response_code 6', () =>
      openTriviaAPI
        ._fetchFromApi(UNEXPECTED_QUERY)
        .then(onSuccess)
        .catch(onError)
        .then(() => {
          expect(onSuccess.called).to.be.false;
          expect(onError.calledOnce).to.be.true;
          const err = onError.getCall(0).args[0];
          expect(err.message).to.equal(DEFAULT_ERROR.message);
        }));
  });
});

describe('getToken', () => {
  beforeEach(() => {
    onSuccess.reset();
    onError.reset();
  });

  it('should resolve to a string', () =>
    openTriviaAPI
      .getToken()
      .then(onSuccess)
      .catch(onError)
      .then(() => {
        expect(onSuccess.calledOnce).to.be.true;
        expect(onError.called).to.be.false;
        const data = onSuccess.getCall(0).args[0];
        expect(data.response_code).to.equal(GET_TOKEN_RESPONSE.response_code);
        expect(data.token).to.be.a('string');
      }));
});

describe('resetToken', () => {
  beforeEach(() => {
    onSuccess.reset();
    onError.reset();
  });

  it('should resolve to a string', () =>
    openTriviaAPI
      .resetToken(TOKEN)
      .then(onSuccess)
      .catch(onError)
      .then(() => {
        expect(onSuccess.calledOnce).to.be.true;
        expect(onError.called).to.be.false;
        const data = onSuccess.getCall(0).args[0];
        expect(data.response_code).to.equal(RESET_TOKEN_RESPONSE.response_code);
        expect(data.token).to.be.a('string');
      }));
});

describe('getQuestions', () => {
  beforeEach(() => {
    onSuccess.reset();
    onError.reset();
  });

  it('should return a Promise when passed non-empty options', () =>
    openTriviaAPI
      .getQuestions(OPTIONS_ALL)
      .then(onSuccess)
      .catch(onError));

  it('should return a Promise when passed empty options', () =>
    openTriviaAPI
      .getQuestions(OPTIONS_EMPTY)
      .then(onSuccess)
      .catch(onError));

  it('should return a Promise when no options are passed', () =>
    openTriviaAPI
      .getQuestions()
      .then(onSuccess)
      .catch(onError));
});
