import React from 'react';
import PropTypes from 'prop-types';


class Results extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <div id="aggregate-card" className="col-4">
        <div className="card card-container" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Vote results</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up
              the bulk of the card's content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </div>
      </div>

    )

  }


}

Results.propTypes = {

};

export default Results
