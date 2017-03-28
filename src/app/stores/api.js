import request from 'superagent-bluebird-promise';
import { resolve as urlResolve } from 'url';

export class API {
  constructor(endpoint) {
    this.token = null;
    this.endpoint = endpoint;
  }

  setToken(token) {
    this.token = token;
  }

  post(path) {
    return this.makeRequest('POST', path);
  }

  put(path) {
    return this.makeRequest('PUT', path);
  }

  get(path) {
    return this.makeRequest('GET', path);
  }

  delete(path) {
    return this.makeRequest('DELETE', path);
  }

  makeRequest(method, path) {
    const url = urlResolve(this.endpoint, path);
    let req = request(method, url);

    if (this.token !== null) {
      req = req.set('Authorization', this.token);
    }

    return req;
  }
}

export default new API(API_URL);
