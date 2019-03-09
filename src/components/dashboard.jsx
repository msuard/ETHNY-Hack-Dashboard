import React from 'react';
import PropTypes from 'prop-types';
import Aggregate from './aggregate/aggregate'
import Ballot from './ballot/ballot'
import Encryption from './encryption/encryption'
import Simulation from './simulation/simulation'
import Results from './vote-results/voteResults'
import Stats from './vote-stats/voteStats'
import App from "../App";

class Dashboard extends React.Component {


  constructor(props){
    super(props)
  }


  render(){

    return(

      <main id="main" role="main" className="site-content">
        <div id="header"></div>
        <div id="titles-container">
          <h1 id="dashboard-title">Voting Dashboard</h1>
          <h2 id="vote-title">Vote Title</h2>
        </div>

        <div className="row">
          <Stats/>
          <Aggregate/>
          <Results/>
        </div>

        <div className="row">
          <Ballot/>
          <Encryption/>
          <Simulation/>
        </div>

      </main>

    )

  }


}

Dashboard.propTypes = {

};

export default Dashboard
