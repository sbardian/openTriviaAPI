import moxios from 'moxios';
import openTriviaAPI from '../src';
import {
  OK_QUERY,
  OK_RESPONSE,
  NORESULTS_QUERY,
  NORESULTS_RESPONSE,
  INVALIDPARAM_QUERY,
  INVALIDPARAM_RESPONSE,
  TOKENNOTFOUND_QUERY,
  TOKENNOTFOUND_RESPONSE,
  TOKENEMPTY_QUERY,
  TOKENEMPTY_RESPONSE,
  UNEXPECTED_QUERY,
  UNEXPECTED_RESPONSE,
  GET_TOKEN_QUERY,
  GET_TOKEN_RESPONSE,
  RESET_TOKEN_QUERY,
  RESET_TOKEN_RESPONSE,
} from './testData';

// eslint-disable-next-line no-useless-escape
const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

before(() => {
  moxios.install(openTriviaAPI._axios);

  // Configure mocked API calls and results
  moxios.stubRequest(new RegExp(`${escape(OK_QUERY)}$`), {
    response: OK_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(NORESULTS_QUERY)}$`), {
    response: NORESULTS_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(INVALIDPARAM_QUERY)}$`), {
    response: INVALIDPARAM_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(TOKENNOTFOUND_QUERY)}$`), {
    response: TOKENNOTFOUND_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(TOKENEMPTY_QUERY)}$`), {
    response: TOKENEMPTY_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(UNEXPECTED_QUERY)}$`), {
    response: UNEXPECTED_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(GET_TOKEN_QUERY)}$`), {
    response: GET_TOKEN_RESPONSE,
  });
  moxios.stubRequest(new RegExp(`${escape(RESET_TOKEN_QUERY)}$`), {
    response: RESET_TOKEN_RESPONSE,
  });
  // Stub all other unmatched requests to prevent accidental network calls
  moxios.stubRequest(/.*/, { status: 418 });
});

after(() => {
  moxios.uninstall(openTriviaAPI._axios);
});
