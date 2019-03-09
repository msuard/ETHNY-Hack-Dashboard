import React from 'react';
import PropTypes from 'prop-types';


class Ballot extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <div id="aggregate-card" className="col-4">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Ballot</h5>
            <h6 className="card-subtitle mb-2 text-muted">Question</h6>
            <p className="card-text">Do you agree to this and that?</p>
            <h6 className="card-subtitle mb-2 text-muted">Choices</h6>
            <p className="card-text">Yes</p>
            <p className="card-text">No</p>
            <p className="card-text">What's for dinner?</p>
          </div>
        </div>
      </div>

    )

  }


}

Ballot.propTypes = {

};

export default Ballot
