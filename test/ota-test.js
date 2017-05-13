/**
 * Created by sbardian on 5/12/17.
 */

import openTriviaAPI from '../src';
import { expect } from 'chai';

describe('Test openTriviaAPI calls', () => {
  let options = {};
  let token;
  before(() => {
    options = {
      amount: 1,
    };
  });
  it('Should return respone code 0 for success...', (done) => {
    openTriviaAPI.getQuestions(options)
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
  it('Should reset token and response_code 0...', (done) => {
    openTriviaAPI.resetToken(token)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          expect(data.token).to.be.a('string');
          done();
        });
  });
});
