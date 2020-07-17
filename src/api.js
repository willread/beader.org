import store from 'store';

import config from './config';

function get(path) {
  return performRequest('get', path, null);
}

function post(path, body) {
  return performRequest('post', path, body);
}

function put(path, body) {
  return performRequest('put', path, body);
}

function del(path) {
  return performRequest('delete', path, undefined, false);
}

function performRequest(method, path, body, json = true) {
  const token = store.get('token');
  const params = {
    method,
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json',
    }),
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return window.fetch(`${config.apiPath}${path}`, params)
    .then(response => {
      if (response.ok) {
        return json ? response.json() : response
      } else {
        return response.json()
          .then(json => {
            throw Error(json.message);
          });
      }
    });
}

export default {
    get,
    post,
    del,
    put,
};