import store from 'store';

import { apiPath } from './config';

export function get(path) {
    return performRequest('get', path, null);
}

export function post(path, body) {
    return performRequest('post', path, body);
}

function performRequest(method, path, body) {
    const token = store.get('token');

    return window.fetch(`${apiPath}${path}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json',
        })
    })
    .then(response => response.json());
}