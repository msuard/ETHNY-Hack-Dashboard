import React from 'react';
import PropTypes from 'prop-types';
import Aggregate from './aggregate/aggregate'
import Ballot from './ballot/ballot'
import Encryption from './encryption/encryption'
import Simulation from './simulation/simulation'
import Results from './vote-results/voteResults'
import Stats from './vote-stats/voteStats'
import App from "../App";

import Web3Service from '../services/web3'

import ElGamal from '../cryptography/elgamal'
import Proofs from '../cryptography/proofs'
import * as JSBN from 'jsbn'

const BigInt = JSBN.BigInteger;

const {
  REACT_APP_SMART_CONTRACT_ADDRESS,
} = process.env;


class Dashboard extends React.Component {


  constructor(props){
    super(props);
    this.ElGamal = new ElGamal();
    this.Proofs = new Proofs();


    this.web3 = new Web3Service();

    this.state = {
      p: null,
      g: null,
      A: null,
      sk: null,
      voteTitle: null,
      voteQuestion: null,
      ballotSCAddress: null,
      choicesPlaintextList: [],
      choicesPrimesList: []
    }
  }

  componentDidUpdate(prevPros, prevState){

  }

  async componentDidMount(){

    let { pBigInt, gBigInt, ABigInt, skBigInt } = await this.ElGamal.generateKeyPairAsync();

    pBigInt = new BigInt("000000000000000000000000000000000000000000000000000000000000006B", 16);
    gBigInt = new BigInt("0000000000000000000000000000000000000000000000000000000000000002", 16);

    console.log(pBigInt, gBigInt, ABigInt, skBigInt);

    const account = await this.web3.createNewAccount();

    // await this.web3.fundAccount(account.address);

    await this.web3.createCampaignTransaction(account);

    const { campaignID, campaignTitle, ballotSCAddress } = await this.web3.getCampaignsTransaction(account);

    const choices = await this.web3.getChoices(account, campaignID);

    const choicesPlaintextList =  choices[0];
    const choicesPrimesList =  choices[1];

    let newState = this.state;

    newState.p = pBigInt;
    newState.g = gBigInt;
    newState.A = ABigInt;
    newState.sk = skBigInt;
    newState.voteTitle = campaignTitle;
    newState.voteQuestion = campaignTitle;
    newState.ballotSCAddress = ballotSCAddress;
    newState.choicesPlaintextList = choicesPlaintextList;
    newState.choicesPrimesList = choicesPrimesList;

    this.setState(newState)

  }

  async onSendBallotClick(choicePrime){

    const {c1BigInt, c2BigInt, kBigInt} = await this.ElGamal.encryptMessage(choicePrime, this.state.p, this.state.g, this.state.A);

    console.log(c1BigInt, c2BigInt, kBigInt);

    const {aBigInt, eBigInt, zBigInt} = await this.Proofs.generatePOKOfEphemeralKey(kBigInt, this.state.g, c1BigInt, this.state.p);

    const {commitments, challenges, responses} = await this.Proofs.generateDisjunctiveZKProofOfPlaintext(kBigInt, choicePrime, this.state.choicesPrimesList, this.state.g, this.state.A, c2BigInt, this.state.p);

    console.log(commitments, challenges, responses);

    const account = await this.web3.createNewAccount();

    await this.web3.sendBallot(account, this.state.ballotSCAddress, c1BigInt, c2BigInt, aBigInt, eBigInt, zBigInt, commitments, challenges, responses)

  }


  render(){

    return(

      <main id="main" role="main" className="site-content">
        <div id="header"></div>
        <div id="titles-container">
          <div className="row">
            <h1 id="dashboard-title" className="col-4">Voting Dashboard</h1>
            <h2 id="dashboard-sc-address" className="col-4">{REACT_APP_SMART_CONTRACT_ADDRESS}</h2>
          </div>
          <h2 id="vote-title">{this.state.voteTitle}</h2>
        </div>

        <div className="row">
          <Stats/>
          <Aggregate/>
          <Results/>
        </div>

        <div className="row">
          <Ballot
            onSendBallotClick={ this.onSendBallotClick.bind(this) }
            voteQuestion={ this.state.voteQuestion }
            choicesPlaintextList={ this.state.choicesPlaintextList }
            choicesPrimesList={ this.state.choicesPrimesList }
          />
          <Encryption/>
          <Simulation/>
        </div>

      </main>

    )

  }


}

Dashboard.propTypes = {

};

export default Dashboard
