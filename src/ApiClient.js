const apiUrl = "/api";

class Api {
  static get(url, params, auth) {
    return this._fetch(url, params, "GET", auth);
  }

  static post(url, params, auth) {
    return this._fetch(url, params, "POST", auth);
  }

  static _fetch(url, params = {}, method, auth = false) {
    // add login token parameter
    if (auth) {
      params.jwt = localStorage.getItem('loginToken');
    }

    // parse params
    let data = new URLSearchParams();
    for (let name in params) {
      data.append(name, params[name]);
    }

    // generate parameters
    let options;
    if (method.toLowerCase() === 'get') {
      url += `?${data.toString()}`;
      options = {};
    }
    else {
      options = {
        method: method,
        body: data
      };
    }

    // send request
    return fetch(`${apiUrl}/${url}`, options)
      .then(response => {
        if (response.status === '404') {
          throw new Error(`Got 404 while getting ${apiUrl}/${url}`);
        }
        return response.json();
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });
  }
}

export default Api;
