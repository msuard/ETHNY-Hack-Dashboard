const request = require('request-promise');

export async function sendGETRequest(uri, headers) {

  const reqOptions = {
    uri: uri,
    timeout: 20000,
    headers
  };

  return request.get(reqOptions)
    .then( (res) =>{
      console.log(uri);
      return res;
    })
    .catch((err) => {
      console.log(Error(err));
      return { "url": uri, "status": "error" };
    });

};


export async function sendPOSTRequest(uri, body) {

  const reqOptions = {
    uri: uri,
    timeout: 20000,
    body: body,
    json: true,
    headers: { 'content-type': 'application/json' },
  };

  return request.post(reqOptions)
    .then( (res) =>{
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(Error(err));
      return { "url": uri, "status": "error" };
    });

};
