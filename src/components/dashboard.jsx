import React from 'react';
import PropTypes from 'prop-types';

import Shipping from './shippingCompany/shippingCompany'
import Client from './client/client'


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
            onSelectShippingId={this.props.onSelectShippingId}
            data={this.props.data}
            decryptedData={this.props.decryptedData}
          />
          <Client/>
        </div>
      </main>

    )

  }


}

Dashboard.propTypes = {

};

export default Dashboard
