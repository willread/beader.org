import store from 'store';

import { apiPath } from './config';

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

  return window.fetch(`${apiPath}${path}`, params)
    .then(response => json ? response.json() : response);
}

export default {
    get,
    post,
    del,
    put,
};