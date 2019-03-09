import Web3  from 'web3'
const {
  REACT_APP_SMART_CONTRACT_ADDRESS,
  REACT_APP_ETHEREUM_NODE_URL
} = process.env;


class Web3Service {

  constructor(){

    console.log(REACT_APP_ETHEREUM_NODE_URL);
    console.log(REACT_APP_SMART_CONTRACT_ADDRESS);

    //connect web3 to blockchain node
    this.web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_ETHEREUM_NODE_URL));

    this.createCampaignABI = {
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



  }


  async getBlockNumber() {

    return new Promise(async (resolve, reject) => {

      try{
        const blockNb = await this.web3.eth.getBlockNumber();
        console.log(blockNb);
        resolve()
      } catch(e){
        reject(e)
      }

    })

  };

  async getVoteInfo(smartContractAddress) {

    return new Promise(async (resolve, reject) => {

      try{

      } catch(e){
        reject(e)
      }

    })

  };

  async createNewAccount(){
    return new Promise(async (resolve, reject) => {
      try {
        const account = await this.web3.eth.accounts.create('string');
        console.log(account.address);
        resolve(account);
      } catch (e) {
        reject(e)
      }
    });
  }

  encodeFunctionCall(){

    const title = "Free lunch for everyone?";
    const endTimestamp =  Date.now() + 60000;
    const items = ["Yes", "No", "What's for dinner?"];
    const primes = [2, 3, 5];

    return this.web3.eth.abi.encodeFunctionCall(this.createCampaignABI, [title, endTimestamp, items, primes]);
  }

  async sendBallotTransaction(data){
    return new Promise(async (resolve, reject) => {

      try{

        const account = await this.createNewAccount();

        const rawTransaction = {
          "from":account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": '0x0',
          "gas": 200000,
          "data": data,
          "nonce": 0
        };

        const signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, account.privateKey);


        let txHash = await this.web3.eth.sendTransaction(signedTx);

        console.log(txHash);

        resolve(txHash)

      } catch(e){
        reject(e)
      }

    })
  }

}
export default Web3Service


