import React from 'react';
import PropTypes from 'prop-types';

import * as Elgamal from '../../../cryptography/elgamal';
import * as Decrypt from '../../../cryptography/decryptData';
import * as Proofs from '../../../cryptography/proofs';

const g = "3507";
const p = "2147514143";
const A = "386104864";

class Proof extends React.Component {


  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentDidUpdate(prevProps, prevState){

  }

  async componentDidMount() {

  }

  async handleClick(){

    console.log(this.props.data);

    const validPlainTexts = Elgamal.generateValidPlaintextsList(this.props.data.length);

    const ephemeralKey = Decrypt.aggregateEphemeralKeys(this.props.decryptedData);
    console.log('ok1');

    const { aggregatedData, decryptedAggregatedData } = Decrypt.aggregateData(this.props.data);

    console.log('ok');

    console.log(decryptedAggregatedData);

    console.log(validPlainTexts);

    let validDataSet = false;
    validPlainTexts.forEach((plaintext) => {
      if(plaintext === parseInt(decryptedAggregatedData, 10)){
        validDataSet = true;
      }
    });

    if(validDataSet){
      console.log("GENERATING PROOF");
      const {commitmentsString, challengesString, responsesString} = await Proofs.generateDisjunctiveZKProofOfPlaintext(ephemeralKey, decryptedAggregatedData, validPlainTexts, g, A, aggregatedData.c2, p);

      console.log("VERIFYING PROOF");

      const result = await Proofs.verifyNonInteractiveDisjunctiveZKProofOfEncryptionOfPlaintextElGamal(p, A, validPlainTexts, aggregatedData.c2, commitmentsString, challengesString, responsesString);

      console.log(result)

    } else {
      console.log("INVALID DATASET")
    }




  }


  render(){

    return(

      <button type="button" className="btn btn-warning" onClick={this.handleClick.bind(this)}>Generate Proof</button>


    )

  }


}

Proof.propTypes = {

};

export default Proof








