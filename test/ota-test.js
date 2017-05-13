/**
 * Created by sbardian on 5/12/17.
 */

import openTriviaAPI from '../src';
import { expect } from 'chai';

describe('Test openTriviaAPI calls', () => {
  let options = {};
  before(() => {
    options = {
      amount: 1,
    };
  });
  it('Should return object', (done) => {
    openTriviaAPI.getQuestions(options)
        .then((data) => {
          expect(data.response_code).to.equal(0);
          done();
        });
  });
});
