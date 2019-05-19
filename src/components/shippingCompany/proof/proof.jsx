import React from 'react';
import PropTypes from 'prop-types';

import * as Elgamal from '../../../cryptography/elgamal';
import * as Decrypt from '../../../cryptography/decryptData';
import * as Proofs from '../../../cryptography/proofs';
import Shipping from "../shippingCompany";


const g = "23114357934155028";
const p = "170141183460469231731690190877448458819";
const A = "8196641841371205329673726354863932167";

class Proof extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      successfulShipment: true
    }
  }

  componentDidUpdate(prevProps, prevState){

  }

  async componentDidMount() {

  }

  async handleClick(){

    this.props.onGenerateProof();

    let successfulShipment = true;

    this.props.decryptedData.forEach((dataPoint) => {
      if(dataPoint.orientation !== "Ok"){
        successfulShipment = false;
      }
    });

    this.setState({
      successfulShipment
    });

    if(successfulShipment) {

      const validPlainTexts = Elgamal.generateValidPlaintextsList(this.props.data.length);

      const ephemeralKey = Decrypt.aggregateEphemeralKeys(this.props.decryptedData);
      console.log('ok1');

      const {aggregatedData, decryptedAggregatedData} = Decrypt.aggregateData(this.props.data);

      console.log('ok');

      console.log(decryptedAggregatedData);

      console.log(validPlainTexts);

      let validDataSet = false;
      validPlainTexts.forEach((plaintext) => {
        if (plaintext === parseInt(decryptedAggregatedData, 10)) {
          validDataSet = true;
        }
      });

      if (validDataSet) {
        console.log("GENERATING PROOF");
        const {commitmentsString, challengesString, responsesString} = await Proofs.generateDisjunctiveZKProofOfPlaintext(ephemeralKey, decryptedAggregatedData, validPlainTexts, g, A, aggregatedData.c2, p);

        // const encodedProof = this.props.web3.web3.utils.toHex(JSON.stringify({commitmentsString, challengesString, responsesString}));
        // console.log(encodedProof);
        // await this.props.web3.sendProof(encodedProof)

        console.log("DONE GENERATING PROOF");

        this.props.onProofGenerated();

        this.props.sendProof({
          p,
          A,
          validPlainTexts,
          c2: aggregatedData.c2,
          commitmentsString,
          challengesString,
          responsesString
        })
        /*

              console.log("VERIFYING PROOF");

              const result = await Proofs.verifyNonInteractiveDisjunctiveZKProofOfEncryptionOfPlaintextElGamal(p, A, validPlainTexts, aggregatedData.c2, commitmentsString, challengesString, responsesString);

              console.log(result)
        */
      } else {
        console.log("INVALID DATASET")
      }

    } else {
      this.props.sendProof("bad_shipment")
    }
  }


  render(){

    return(

      <div className = "row">

        <button type="button" className="btn btn-warning offset-1 col-3" onClick={this.handleClick.bind(this)}>
          {
            this.state.successfulShipment ?

            "Generate Proof"

              :

            "Cancel delivery"
        }
        </button>

        <div className="offset-1 col-7">

          {
            this.props.generatingProof ?

              <div>Generating Zero-Knowledge Proof of Successful Shipment...</div>
              :
              <div>
                {
                  this.props.proofGenerated ?

                    <div>

                      {

                        this.state.successfulShipment ?

                          <div>Zero-Knowledge Proof of Successful Shipment has been generated and sent to client</div>

                          :

                          <div>Bad shipment: client has been informed and delivery has been cancelled</div>

                      }

                    </div>


                    :

                    <div></div>
                }
              </div>

          }

        </div>

      </div>



    )

  }


}

Proof.propTypes = {

};

export default Proof








