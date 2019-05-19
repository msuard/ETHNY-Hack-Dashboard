const Web3 = require("web3");
const Tx = require('ethereumjs-tx');

const abi = require('./abi');
const ZKSensors = require('./ZkSensors');
export class Web3Service {

  constructor () {
    const nodeHTTPURL = 'https://rinkeby.infura.io/v3/23c90bc7c48546a0b4f9810fdafae93f';
    const HTTPProvider = new Web3.providers.HttpProvider(nodeHTTPURL);

    this.web3 =  new Web3(HTTPProvider);
    this.account = {
      address: "0x304057AdBf64cA8d343664E47Ef0E93791621164",
      privateKey: "0x4fcb85cbaaf9e9026cab9fbde8b0f6571628f3d8b59be57c5c76177a27428617"
    };
  console.log("WEB 3 OK")
  }


  async getIds(){

    return new Promise(async (resolve, reject) => {

      try{


        const data = this.web3.eth.abi.encodeFunctionCall(abi.ZKSensors.getAllIds, []);

        console.log(data);

        const nonce = await this.web3.eth.getTransactionCount(this.account.address);

        const rawTx = {
          "from": this.account.address,
          "to": ZKSensors.contract.address,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('5000000000'),
          "gas": this.web3.utils.toHex('3000000'),
          "data": data,
          "nonce": nonce,
        };

        console.log(rawTx);

        // const privateKey = Buffer.from(this.account.privateKey.slice(2), 'hex');

        // const tx = new Tx(rawTx);

        // tx.sign(privateKey);

        // const serializedTx = tx.serialize();
        const receipt = await this.web3.eth.call(rawTx);

        const array = [
          {
            "name": "",
            "type": "bytes32[]"
          }
        ];

        const result = this.web3.eth.abi.decodeParameters(array, receipt);

        console.log(result);

        resolve(result)

      } catch(e){
        reject(e)
      }

    })
  }

  async getDataLength(shippingId){
    return new Promise(async (resolve, reject) => {

      try{


        const data = this.web3.eth.abi.encodeFunctionCall(abi.ZKSensors.getNumberOfReportsById, [shippingId]);

        console.log(data);

        const nonce = await this.web3.eth.getTransactionCount(this.account.address);

        const rawTx = {
          "from": this.account.address,
          "to": ZKSensors.contract.address,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('5000000000'),
          "gas": this.web3.utils.toHex('3000000'),
          "data": data,
          "nonce": nonce,
        };

        console.log(rawTx);

        // const privateKey = Buffer.from(this.account.privateKey.slice(2), 'hex');

        // const tx = new Tx(rawTx);

        // tx.sign(privateKey);

        // const serializedTx = tx.serialize();
        const receipt = await this.web3.eth.call(rawTx);

        const array = [
          {
            "name": "",
            "type": "uint256"
          }
        ];

        const result = this.web3.eth.abi.decodeParameters(array, receipt);

        console.log(result[0]);

        resolve(result[0])

      } catch(e){
        reject(e)
      }

    })
  }

  async getDataPoint(shippingId, index){

    return new Promise(async (resolve, reject) => {

      try{


        const data = this.web3.eth.abi.encodeFunctionCall(abi.ZKSensors.getDetailsByIdAndIndex, [shippingId, index]);

        console.log(data);

        const nonce = await this.web3.eth.getTransactionCount(this.account.address);

        const rawTx = {
          "from": this.account.address,
          "to": ZKSensors.contract.address,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('5000000000'),
          "gas": this.web3.utils.toHex('3000000'),
          "data": data,
          "nonce": nonce,
        };

        console.log(rawTx);

        // const privateKey = Buffer.from(this.account.privateKey.slice(2), 'hex');

        // const tx = new Tx(rawTx);

        // tx.sign(privateKey);

        // const serializedTx = tx.serialize();
        const receipt = await this.web3.eth.call(rawTx);

        const array = [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ];

        const result = this.web3.eth.abi.decodeParameters(array, receipt);

        console.log(result);

        resolve(result)

      } catch(e){
        reject(e)
      }

    })
  }

  subscribeToDataPoints(shippingId, refreshData, onRefreshData){


    return new Promise(async (resolve, reject) => {

      try{

        const currentBlock = await this.web3.eth.getBlockNumber();

        const subscription = setInterval(async () => {
          const logs = await this.web3.eth.getPastLogs({
            fromBlock: currentBlock - 10,
            toBlock: 'latest',
            address: ZKSensors.contract.address,
            topics: ["0x340c601dc6fca484328e0d880f4baa0ecb3d314d77f136dbbc194d10ef43c7df"]
          });

          console.log(logs);

          const array = [
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "uint256"
            }
          ];

          if(logs.length > 0){

            let data = []

            logs.forEach((log) => {
              const dataPoint = this.web3.eth.abi.decodeParameters(array, log.data);

              if(this.web3.utils.toHex(dataPoint[0] === shippingId)){
                data.push(dataPoint)
              }
            });

            refreshData(shippingId, data, onRefreshData)

          }


        }, 500);

        resolve(subscription);

      } catch(e){
        reject(e)
      }

    })

  }


  async sendProof(encodedProof){

    return new Promise(async (resolve, reject) => {

      try{

        console.log("SENDING PROOF");

        const data = this.web3.eth.abi.encodeFunctionCall(abi.ZKSensors.storeProof, [encodedProof]);

        console.log(data);

        const nonce = await this.web3.eth.getTransactionCount(this.account.address);

        // this.nonce += 1;

        const rawTx = {
          "from": this.account.address,
          "to": ZKSensors.contract.address,
          "value": this.web3.utils.toHex(this.web3.utils.toWei('0')),
          "gasPrice": this.web3.utils.toHex('600000000'),
          "gas": this.web3.utils.toHex('3000000'),
          "data": data,
          "nonce": nonce,
        };

        console.log(rawTx);

        const privateKey = Buffer.from(this.account.privateKey.slice(2), 'hex');

        const tx = new Tx(rawTx);

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        console.log(receipt);

        resolve()

      } catch(e){
        reject(e)
      }

    })
  }

  async createNewAccount(){
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = await this.web3.eth.accounts.wallet.create(1);
        // console.log(wallet.accounts[0]);
        //this.account = wallet.accounts[0];
        //console.log('web3 account created');
        console.log(this.account);
        resolve();
      } catch (e) {
        reject(e)
      }
    });
  }


}


