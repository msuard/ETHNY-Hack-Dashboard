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
            <p className="card-text">{ this.props.voteQuestion }</p>
            <h6 className="card-subtitle mb-2 text-muted">Choices</h6>
            {
              this.props.choicesPlaintextList.map((choice) => {
                return(
                  <p className="card-text" key={choice}>{choice}</p>
                )
              })
            }
            <button type="button" className="btn btn-primary" onClick={ this.props.onSendBallotClick }>Send Ballot</button>
          </div>
        </div>
      </div>

    )

  }


}

Ballot.propTypes = {

};

export default Ballot
