import React from 'react';
import PropTypes from 'prop-types';

import * as proofs from '../../../cryptography/proofs'


class Verification extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      verified: false,
      validProof: null
    }
  }

  componentDidUpdate(prevPros, prevState){

  }

  async componentDidMount(){

    if(this.props.proof === "bad_shipment"){

      let newState = this.state;
      newState.validProof = false;
      newState.verified = true;
      this.setState(newState)

    } else {
      const result = proofs.verifyNonInteractiveDisjunctiveZKProofOfEncryptionOfPlaintextElGamal(
        this.props.proof.p,
        this.props.proof.A,
        this.props.proof.validPlainTexts,
        this.props.proof.c2,
        this.props.proof.commitmentsString,
        this.props.proof.challengesString,
        this.props.proof.responsesString
      );

      let newState = this.state;
      newState.validProof = result;
      newState.verified = true;
      this.setState(newState)

    }



  }


  render(){

    if(!this.state.verified){
      return(

        <div id="verif">

          VERIFYING PROOF ...

        </div>

      )
    } else {
      if(this.state.validProof){
        return(

        <div id="verif">

          VALID PROOF: SHIPMENT SUCCESSFUL!

        </div>
        )
      } else {
        return(

          <div id="verif">

            BAD SHIPMENT ! PACKAGE HAS BEEN DAMAGED :(

          </div>
        )
      }
    }



  }


}

Verification.propTypes = {

};

export default Verification
