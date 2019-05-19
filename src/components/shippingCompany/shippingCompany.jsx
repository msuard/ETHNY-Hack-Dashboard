import React from 'react';
import PropTypes from 'prop-types';

import * as apiService from '../../services/apiService'

import Dropdown from '../dropdown/dropdown'
import Data from './data/data'
import Proof from './proof/proof'

class Shipping extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      shippingIds: [],
      shippingId: null
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.shippingIds !== prevProps.shippingIds && !prevProps.shippingId && typeof(this.props.shippingIds[0]) === 'string'){

      console.log(this.props.shippingIds[0]);

      this.props.onSelectShippingId(this.props.shippingIds[0])
    }

  }

  async componentDidMount(){

    console.log(this.props.web3);

    await this.props.refreshShippingIds();


  }


  render(){

    return(

      <div id="shipping" className="col-6">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <div className="row">
              <h5 className="card-title col-3">SHIPPING COMPANY DASHBOARD</h5>
              <div className="offset-2 col-7">
                <Dropdown
                  shippingId={this.props.shippingId}
                  refreshShippingIds={this.props.refreshShippingIds}
                  shippingIds={this.props.shippingIds}
                  onSelectShippingId={this.props.onSelectShippingId}
                />
              </div>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Data available to the shipping company</h6>
            <p className="card-text">

              <Data
                decryptedData={this.props.decryptedData}
              />

              <Proof
                data={this.props.data}
                decryptedData={this.props.decryptedData}
                web3={this.props.web3}
                sendProof={this.props.sendProof}
                generatingProof={this.props.generatingProof}
                proofGenerated={this.props.proofGenerated}
                onGenerateProof={this.props.onGenerateProof}
                onProofGenerated={this.props.onProofGenerated}
              />

            </p>
          </div>
        </div>

      </div>

    )

  }


}

Shipping.propTypes = {

};

export default Shipping
