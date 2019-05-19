import React from 'react';
import PropTypes from 'prop-types';

import Shipping from './shippingCompany/shippingCompany'
import Client from './client/client'
import DashboardContainer from "../containers/dashboard";
import {Web3Service} from "../services/web3";


class Dashboard extends React.Component {


  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentDidUpdate(prevPros, prevState){

  }

  async componentDidMount(){



  }


  render(){

    return(

      <main id="main" role="main" className="site-content">
        <h1 id="dashboard-title">Zero-Knowledge Supply Chain Management</h1>
        <div className="row">
          <Shipping
            shippingId={this.props.shippingId}
            refreshShippingIds={this.props.refreshShippingIds}
            shippingIds={this.props.shippingIds}
            onSelectShippingId={this.props.onSelectShippingId}
            data={this.props.data}
            decryptedData={this.props.decryptedData}
            web3={this.props.web3}
            sendProof={this.props.sendProof}
            generatingProof={this.props.generatingProof}
            proofGenerated={this.props.proofGenerated}
            onGenerateProof={this.props.onGenerateProof}
            onProofGenerated={this.props.onProofGenerated}
          />
          <Client
            shippingId={this.props.shippingId}
            refreshShippingIds={this.props.refreshShippingIds}
            shippingIds={this.props.shippingIds}
            onSelectShippingId={this.props.onSelectShippingId}
            web3={this.props.web3}
            proof={this.props.proof}
          />
        </div>
      </main>

    )

  }


}

Dashboard.propTypes = {

};

export default Dashboard
