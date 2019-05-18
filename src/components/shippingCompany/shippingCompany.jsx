import React from 'react';
import PropTypes from 'prop-types';

import * as apiService from '../../services/apiService'

import Dropdown from './dropdown/dropdown'
import Data from './data/data'
import Proof from './proof/proof'

class Shipping extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      shippingIds: []

    }
  }

  componentDidUpdate(prevPros, prevState){

  }

  async componentDidMount(){

    const shippingIds =  JSON.parse(await apiService.getShippingIds());

    let newState = this.state;
    newState.shippingIds = shippingIds;
    this.setState(newState);

    console.log(this.state.shippingIds)

  }


  render(){

    return(

      <div id="shipping" className="col-5">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <div className="row">
              <h5 className="card-title col-2">SHIPPING</h5>
              <div className="offset-2 col-8">
                <Dropdown
                  shippingIds={this.state.shippingIds}
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
