import React from 'react';
import PropTypes from 'prop-types';


class Aggregate extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <div id="aggregate-card" className="col-4">
        <div className="card  card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Ballots Aggregate</h5>
            <h6 className="card-subtitle mb-2 text-muted">Encrypted</h6>
            <p className="card-text">Encrypted aggregate</p>
            <h6 className="card-subtitle mb-2 text-muted">Decrypted</h6>
            <p className="card-text">Decrypted Aggragate</p>
          </div>
        </div>
      </div>

    )

  }


}

Aggregate.propTypes = {

};

export default Aggregate
