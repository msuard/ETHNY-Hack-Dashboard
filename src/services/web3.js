import Web3  from 'web3'
import Tx from 'ethereumjs-tx';

const {
  REACT_APP_SMART_CONTRACT_ADDRESS,
  REACT_APP_ETHEREUM_NODE_URL
} = process.env;


const abi = require('./abi');



class Web3Service {

  constructor(){

    //connect web3 to blockchain node
    this.web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_ETHEREUM_NODE_URL));

    this.truffleAccount = {
      address: "0x712caa0b568642719cb4a62c92493a20a5f49162",
      privateKey: "c0cd4c7f39a64d30deb5b6c50e6d62f417fe41b25cce630a05328a23c5ba3957"
    };
/*
    this.contract = new this.web3.eth.Contract(abi.abi.abi, REACT_APP_SMART_CONTRACT_ADDRESS,
      {
      "gasPrice": this.web3.utils.toHex('1'),
      "gasLimit": this.web3.utils.toHex('100000000000')
      }
    );
*/

    // this.contractAddress = "0x39b3096acd3d05b1082da292bd25f41b434a7030";

    this.truffleAccountNonce = 59;

    this.nonce = 0;
  }


  async createNewAccount(){
    return new Promise(async (resolve, reject) => {
      try {
        // const account = await this.web3.eth.accounts.create('string');
        const wallet = await this. web3.eth.accounts.wallet.create(1);
        console.log(wallet.accounts[0]);
        resolve(wallet.accounts[0]);
      } catch (e) {
        reject(e)
      }
    });
  }

  encodeFunctionCall(abi, params){

    return this.web3.eth.abi.encodeFunctionCall(abi, params);
  }
/*
  async createCampaignTransaction2(account){

    return new Promise(async (resolve, reject) => {

      try{

        //const account = await this.createNewAccount();
        console.log('create campaign');
        console.log(account.address);
        console.log(await this.web3.eth.getBalance(account.address));

        const title = "Free lunch for everyone?";
        const endTimestamp =  Date.now() + 60000;
        const items = ["Yes", "No", "What's for dinner?"];
        const primes = [2, 3, 5];

        const params = [title, endTimestamp, items, primes];

        const createCampaign = this.contract.methods.createCampaign();

        console.log(createCampaign);

        // const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))

        // console.log(receipt);

        resolve()

      } catch(e){
        reject(e)
      }

    })
  }
*/

  async createCampaignTransaction(account){

    return new Promise(async (resolve, reject) => {

      try{

        //const account = await this.createNewAccount();
        console.log('create campaign');
        // console.log(account.address);
        // console.log(await this.web3.eth.getBalance(account.address));

        const title = "Free lunch for everyone?";
        const endTimestamp =  Date.now();
        console.log(endTimestamp);
        const items = ["Yes", "No", "What's for dinner?"];
        const primes = [2, 3, 5];

        const params = [title, endTimestamp, items, primes];

        const data = this.web3.eth.abi.encodeFunctionCall(abi.createCampaignABI, params);

        // console.log(account);
/*
        const rawTx = {
          "from": account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('1'),
          "gasLimit": this.web3.utils.toHex('10000000'),
          "data": data,
          "nonce": this.web3.utils.toHex('0'),
        };
*/
        const rawTx = {
          "from": account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('0'),
          "gas": this.web3.utils.toHex('80000000'),
          "data": data,
          "nonce": this.web3.utils.toHex(this.nonce),
        };

        // console.log(account.privateKey);

        const privateKey = new Buffer(account.privateKey.slice(2), 'hex');

        // console.log(privateKey);

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        // this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        console.log(receipt);

        resolve()

      } catch(e){
        reject(e)
      }

    })
  }

  async getCampaignsTransaction(account){

    return new Promise(async (resolve, reject) => {

      try{

        console.log('get campaigns');
        // console.log(account.address);
        // console.log(await this.web3.eth.getBalance(account.address));

        const id = 1;

        const data = this.web3.eth.abi.encodeFunctionCall(abi.getCampaignsABI, [id]);

        const rawTx = {
          "from": account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('0'),
          "gas": this.web3.utils.toHex('80000000'),
          "data": data,
          "nonce": this.web3.utils.toHex(this.nonce + 1),
        };

        // console.log(account.privateKey);

        const privateKey = new Buffer(account.privateKey.slice(2), 'hex');

        // console.log(privateKey);

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        //const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        const receipt = await this.web3.eth.call(rawTx);

        console.log(receipt);

        const array = [
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
        ];

        const result = this.web3.eth.abi.decodeParameters(array, receipt);

        console.log(result);


        resolve({ campaignID: result.ID, campaignTitle: result.title, ballotSCAddress: result.ballot })

      } catch(e){
        reject(e)
      }

    })
  }


  async getChoices(account, campaignID){

    return new Promise(async (resolve, reject) => {

      try{

        console.log('get choices');
        // console.log(account.address);
        // console.log(await this.web3.eth.getBalance(account.address));

        const data = this.web3.eth.abi.encodeFunctionCall(abi.getChoicesABI, [parseInt(campaignID, 10)]);

        const rawTx = {
          "from": account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('0'),
          "gas": this.web3.utils.toHex('80000000'),
          "data": data,
          "nonce": this.web3.utils.toHex(this.nonce + 1),
        };

        // console.log(account.privateKey);

        const privateKey = new Buffer(account.privateKey.slice(2), 'hex');

        // console.log(privateKey);

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        //const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        const receipt = await this.web3.eth.call(rawTx);

        console.log(receipt);

        const array = [
          {
            "name": "",
            "type": "string[]"
          },
          {
            "name": "",
            "type": "uint256[]"
          }
        ];

        const result = this.web3.eth.abi.decodeParameters(array, receipt);


        resolve(result)

      } catch(e){
        reject(e)
      }

    })
  }



  async sendBallot(account, ballotSCAddress, c1BigInt, c2BigInt, aBigInt, eBigInt, zBigInt, commitments, challenges, responses){

    return new Promise(async (resolve, reject) => {

      try{

        //const account = await this.createNewAccount();
        console.log('send ballot');
        // console.log(account.address);
        // console.log(await this.web3.eth.getBalance(account.address));

        const c1 = this.web3.utils.hexToBytes(this.web3.utils.toHex(c1BigInt.toString()));

        // console.log(this.web3.utils.toHex(c1BigInt.toString()));

        const c2 = this.web3.utils.hexToBytes(this.web3.utils.toHex(c2BigInt.toString()));

        // console.log(this.web3.utils.toHex(c2BigInt.toString()));

        const commitment = this.web3.utils.hexToBytes(this.web3.utils.toHex(aBigInt.toString()));

        // console.log(this.web3.utils.toHex(aBigInt.toString()));

        const challenge = this.web3.utils.hexToBytes(this.web3.utils.toHex(eBigInt.toString()));

        // console.log(this.web3.utils.toHex(eBigInt.toString()));

        const response = this.web3.utils.hexToBytes(this.web3.utils.toHex(zBigInt.toString()));

        // console.log(this.web3.utils.toHex(zBigInt.toString()));

        console.log(response);

        const params = [c1, c2, commitment, challenge, response];

        const data = this.web3.eth.abi.encodeFunctionCall(abi.castVoteABI, params);

        console.log(data);
/*
                const rawTx = {
                  "from": account.address,
                  "to": ballotSCAddress,
                  "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
                  "gasPrice": this.web3.utils.toHex('1'),
                  "gasLimit": this.web3.utils.toHex('10000000000000000'),
                  "data": data,
                  // "nonce": this.web3.utils.toHex('1'),
                };
*/

        const rawTx = {
          "from": account.address,
          "to": REACT_APP_SMART_CONTRACT_ADDRESS,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('0'),
          "gas": this.web3.utils.toHex('80000000'),
          "data": data,
          "nonce": this.web3.utils.toHex(this.nonce + 1),
        };

        // console.log(account.privateKey);

        const privateKey = new Buffer(account.privateKey.slice(2), 'hex');

        // console.log(privateKey);

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        // this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        console.log(receipt);

        resolve()

      } catch(e){
        reject(e)
      }

    })
  }


  async fundAccount(targetAccountAddress){
    return new Promise(async (resolve, reject) => {

      try{

        console.log(await this.web3.eth.getBalance(this.truffleAccount.address));

        const rawTx = {
          "from": this.truffleAccount.address,
          "to": targetAccountAddress,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('1')),
          "gasPrice": this.web3.utils.toHex('1'),
          "gasLimit": this.web3.utils.toHex('10000000'),
          "data": "",
          "nonce": this.web3.utils.toHex(this.truffleAccountNonce),
        };

        const privateKey = new Buffer(this.truffleAccount.privateKey, 'hex');

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))

        console.log(receipt);

        this.truffleAccountNonce += 1;

        resolve();

      } catch(e){
        reject(e)
      }

    })

  }

  generateAddressesFromSeed(seed) {
    let bip39 = require("bip39");
    let hdkey = require('ethereumjs-wallet/hdkey');
    let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
    let wallet_hdpath = "m/44'/60'/0'/0/";

    let accounts = [];
    for (let i = 0; i < 10; i++) {

      let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
      let address = '0x' + wallet.getAddress().toString("hex");
      let privateKey = wallet.getPrivateKey().toString("hex");
      accounts.push({address: address, privateKey: privateKey});
    }

    return accounts;
  }

}


export default Web3Service


