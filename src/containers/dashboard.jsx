import React from 'react';
import { connect } from 'react-redux'
import Dashboard  from '../components/dashboard';
import { clicked } from "./app.actions";


const mapStateToProps = state => {

  return {
    clicksCount: state.appReducers.clicksCount,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(clicked());
    },
  }
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer

