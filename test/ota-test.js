/**
 * Created by sbardian on 5/12/17.
 */

import openTriviaAPI from '../src';
import { expect, assert } from 'chai';

describe('Test openTriviaAPI calls', () => {
  let options = {};
  let token;
  let endpoint;
  before(() => {
    options = {
      amount: 1,
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
      encoding: 'url3986',
    };
    endpoint = 'api.php?amount=1';
  });
  it('Should return axios object...', (done) => {
    openTriviaAPI._axios()
        .then((obj) => {
          assert(obj);
          done();
        });
  });
  it('Should return response code 0 for success...', (done) => {
    openTriviaAPI._fetchFromApi(endpoint)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });
  it('Test getQuestions with options...', (done) => {
    openTriviaAPI.getQuestions(options)
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
