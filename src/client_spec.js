/*global sinon:false fetch:false */

require('whatwg-fetch');

import client from './client';
import { jsonError, jsonOk } from '../test/helpers';

// Expose runtime promise as global
window.Promise = Promise;

describe('.fetch', () => {

  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('making a request via the client', () => {
    beforeEach(() => {
      window.fetch.returns(new Promise(() => {}));
    });

    it('behaves like any other sinon spy', () => {
      client('/foobar');
      expect(window.fetch.firstCall.args[0]).toBe('/foobar');
    });
  });

  describe('stubbing response', () => {

    beforeEach(() => {
      const res = new window.Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('formats response correctly', (done) => {
      client('/foobar')
        .catch(done)
        .then((json) => {
          expect(json.hello).toBe('WORLD');
          done();
        });
    });
  });

  describe('stubbing response (uses test helpers)', () => {

    beforeEach(() => {
      window.fetch.returns(jsonOk({
        hello: 'world'
      }));
    });

    it('formats response correctly', (done) => {
      client('/foobar')
        .catch(done)
        .then((json) => {
          expect(json.hello).toBe('WORLD');
          done();
        });
    });
  });

  describe('error response (uses test helpers)', () => {

    beforeEach(() => {
      window.fetch.returns(jsonError(401, {
        message: 'authentication required'
      }));
    });

    it('returns correct body', (done) => {
      client('/error-route')
        .catch(({ status, message }) => {
          expect(status).toBe(401);
          expect(message).toBe('authentication required');
          done();
        });
    });
  });
});

