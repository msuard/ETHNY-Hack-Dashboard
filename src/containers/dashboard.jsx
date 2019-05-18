import React from 'react';
import { connect } from 'react-redux'
import Dashboard  from '../components/dashboard';
import { selectShippingId } from "./app.actions";

import * as apiService from '../services/apiService'
import * as decryptData from '../cryptography/decryptData'

const sk = "29913";
const g = "3507";
const p = "2147514143";

const mapStateToProps = state => {

  return {
    data: state.appReducers.data,
    decryptedData:  state.appReducers.decryptedData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectShippingId: async (shippingId) => {

      const data = JSON.parse(await apiService.getData(shippingId));


      let decryptedData = await decryptData.decryptDataSet(data, [], 0);


      dispatch(selectShippingId(shippingId, data, decryptedData));


    },
  }
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer

