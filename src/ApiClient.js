const apiUrl = "/api";

class Api {
  static get(url, params) {
    return this._fetch(url, params, "GET");
  }

  static post(url, params) {
    return this._fetch(url, params, "POST");
  }

  static _fetch(url, params = {}, method) {
    // add login token parameter
    params.jwt = sessionStorage.loginToken;

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
