import React from 'react';
import PropTypes from 'prop-types';


class Client extends React.Component {


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

      <div id="client" className="col-5">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">CLIENT</h5>
            <h6 className="card-subtitle mb-2 text-muted">Data available to the client</h6>
            <p className="card-text">data</p>
          </div>
        </div>
      </div>

    )

  }


}

Client.propTypes = {

};

export default Client
