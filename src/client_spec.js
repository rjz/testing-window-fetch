import 'whatwg-fetch';

import client from './client';
import { jsonError, jsonOk } from '../test/helpers';

describe('.fetch', () => {

  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('making a request via the client', () => {
    beforeEach(() => {
      window.fetch.returns(Promise.reject(new Error('Just a stub')));
    });

    it('behaves like any other sinon spy', () =>
      client('/foobar')
        .catch(() => expect(window.fetch.firstCall.args[0]).toBe('/foobar')));
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

    it('formats response correctly', () =>
      client('/foobar')
        .then((json) => {
          expect(json.hello).toBe('WORLD');
        }));
  });

  describe('stubbing response (uses test helpers)', () => {

    beforeEach(() => {
      window.fetch.returns(jsonOk({
        hello: 'world'
      }));
    });

    it('formats response correctly', () =>
      client('/foobar')
        .then((json) => {
          expect(json.hello).toBe('WORLD');
        }));
  });

  describe('error response (uses test helpers)', () => {

    beforeEach(() => {
      window.fetch.returns(jsonError(401, {
        message: 'authentication required'
      }));
    });

    it('returns correct body', () =>
      client('/error-route')
        .catch(({ status, message }) => {
          expect(status).toBe(401);
          expect(message).toBe('authentication required');
        }));
  });
});

