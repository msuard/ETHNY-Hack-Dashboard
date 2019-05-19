import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown/dropdown'
import Data from "../shippingCompany/data/data";
import Proof from "../shippingCompany/proof/proof";
import Verification from "./verificsation/verification";
import Shipping from "../shippingCompany/shippingCompany";


class Client extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      shippingIds: [],
      shippingId: ""
    }
  }

  componentDidUpdate(prevPros, prevState){

  }

  async componentDidMount(){

    console.log(this.props.proof);

    await this.props.refreshShippingIds();

  }

  onSelectShippingId(shippingId){
    let newState = this.state;
    newState.shippingId = shippingId;
    this.setState(newState);
    this.props.onSelectShippingId(shippingId)
  }


  render(){

    return(

      <div  className="col-6">
        <div id="client" className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <div className="row">
              <h5 className="card-title col-3">CLIENT DASHBOARD</h5>
              <div className="offset-2 col-7">
                <Dropdown
                  shippingId={this.props.shippingId}
                  shippingIds={this.props.shippingIds}
                  onSelectShippingId={this.onSelectShippingId.bind(this)}
                />
              </div>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Data available to the client</h6>

            {
              this.props.proof ?

                <Verification
                  proof={this.props.proof}
                />
                :
                <div>Shipment in progress ...</div>

            }



          </div>
        </div>



      </div>

    )

  }


}

Client.propTypes = {

};

export default Client
