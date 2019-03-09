exports.createCampaignABI = {
  "constant": false,
  "inputs": [
    {
      "name": "_title",
      "type": "string"
    },
    {
      "name": "_endTimestamp",
      "type": "uint256"
    },
    {
      "name": "_items",
      "type": "string[]"
    },
    {
      "name": "_primes",
      "type": "uint256[]"
    }
  ],
  "name": "createCampaign",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};

exports.getCampaignsABI = {
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "campaigns",
  "outputs": [
    {
      "name": "ID",
      "type": "uint256"
    },
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "ballot",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
};

exports.getChoicesABI = {
  "constant": true,
  "inputs": [
    {
      "name": "ID",
      "type": "uint256"
    }
  ],
  "name": "getChoices",
  "outputs": [
    {
      "name": "",
      "type": "string[]"
    },
    {
      "name": "",
      "type": "uint256[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
};

exports.castVoteABI = {
  "constant": false,
  "inputs": [
    {
      "name": "prime_c1",
      "type": "bytes"
    },
    {
      "name": "prime_c2",
      "type": "bytes"
    },
    {
      "name": "commitment",
      "type": "bytes"
    },
    {
      "name": "challenge",
      "type": "bytes"
    },
    {
      "name": "response",
      "type": "bytes"
    }
  ],
  "name": "castVote",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}

