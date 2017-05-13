/**
 * Created by sbardian on 5/12/17.
 */

import { expect } from 'chai';
import openTriviaAPI from '../src';

describe('Test getQuestions', () => {
  let options = {};
  before(() => {
    options = {
      amount: 1,
    };
  });
  it('Should return object', (done) => {
    openTriviaAPI.getQuestions(options)
        .expect(res.response_code).to.equal(0)
        .done();
  });
});