import 'babel-polyfill';
import 'whatwg-fetch';

function apiError (status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

function filterAPIError (res) {
  if (res.status > 399) {
    return res.json().then(function (json) {
      throw apiError(res.status, json.message);
    });
  }

  return res.json();
}

function onAPIResponse (json) {
  return {
    hello: json.hello.toUpperCase()
  };
}

export default function client(path) {
  return window.fetch(path)
    .then(filterAPIError)
    .then(onAPIResponse);
}
