import React from 'react';
import PropTypes from 'prop-types';


class Encryption extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <div id="aggregate-card" className="col-4">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Transaction Content</h5>
            <h6 className="card-subtitle mb-2 text-muted">Encrypted Ballot</h6>
            <p className="card-text">Some quick example text to build on the card title and make up
              the bulk of the card's content.</p>
            <h6 className="card-subtitle mb-2 text-muted">Proofs</h6>
            <p className="card-text">Some quick example text to build on the card title and make up
              the bulk of the card's content.</p>
            <h6 className="card-subtitle mb-2 text-muted">Re-Encryption key</h6>
            <p className="card-text">Some quick example text to build on the card title and make up
              the bulk of the card's content.</p>
          </div>
        </div>
      </div>

    )

  }


}

Encryption.propTypes = {

};

export default Encryption
