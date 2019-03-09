import React from 'react';
import PropTypes from 'prop-types';


class Dashboard extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <main role="main" className="site-content row inline">
          <div className="col-4">
            Voting Dashboard
          </div>
          <div className="col-4">
            Voting Dashboard
          </div>
          <div className="col-4">
            Voting Dashboard
          </div>
      </main>

    )

  }


}

Dashboard.propTypes = {

};

export default Dashboard
