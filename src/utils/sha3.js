const { SHA3 } = require('sha3');

exports.sha3 = function (stringToHash){
  const sha3 = new SHA3(512);
  sha3.update(stringToHash);
  const hex = sha3.digest('hex');
  return hex
};


