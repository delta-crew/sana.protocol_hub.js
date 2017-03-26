import request from 'superagent-bluebird-promise';
import url from 'url';

export class API {
  constructor(endpoint) {
    console.log(endpoint);
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
    const url = url.resolve(this.endpoint, path);
    let request = request(method, url);

    if (this.token !== null) {
      request = request.set('Authorization', this.token);
    }

    return request;
  }
}

// TODO don't hardcode
export default new API('http://localhost:8000');
