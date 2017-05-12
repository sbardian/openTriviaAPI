/**
 * Created by sbardian on 5/12/17.
 */

'use strict';
const openTriviaAPI = require('../src/index');
const chai = require('chai');
const expect = chai.expect;

describe('#getString', function() {
  it('Should return a string.', function(done) {
    expect(openTriviaAPI.getString('User')).to.be.a('string');
    done();
  });
});