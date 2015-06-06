require('whatwg-fetch');

function apiError (status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

function onAPIError (res) {
  return res.json().then(function (json) {
    return Promise.reject(apiError(res.status, json.message));
  });
}

function onAPIResponse (res) {
  return res.json().then(function (json) {
    return {
      hello: json.hello.toUpperCase()
    };
  });
}

export const client = (path) => {
  return window.fetch(path)
    .catch(onAPIError)
    .then(onAPIResponse);
};

export default client;

