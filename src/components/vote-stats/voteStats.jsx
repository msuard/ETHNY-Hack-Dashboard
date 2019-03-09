import React from 'react';
import PropTypes from 'prop-types';


class Stats extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <div id="aggregate-card" className="col-4">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Stats</h5>
            <h6 className="card-subtitle mb-2 text-muted">Cast Ballots Count</h6>
            <p className="card-text">2345</p>
            <h6 className="card-subtitle mb-2 text-muted">Blocks Remaining:</h6>
            <p className="card-text">123</p>
          </div>
        </div>
      </div>

    )

  }


}

Stats.propTypes = {

};

export default Stats
