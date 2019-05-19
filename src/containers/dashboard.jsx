import React from 'react';
import { connect } from 'react-redux'
import Dashboard  from '../components/dashboard';
import {
  selectShippingId,
  subscribedToContract,
  unsubscribedToContract,
  gotShippingIds,
  proofSent,
  generatingProof,
  proofGenerated,
  gotData
} from "./app.actions";

import * as apiService from '../services/apiService'
import * as decryptData from '../cryptography/decryptData'
import {Web3Service} from "../services/web3";

const web3 = new Web3Service();

let state = {
  shippingId: "",
  subscription: null,
  data: null
};


const sk = "29913";
const g = "3507";
const p = "2147514143";

const mapStateToProps = state => {

  return {
    web3,
    shippingId: state.appReducers.shippingId,
    shippingIds: state.appReducers.shippingIds,
    data: state.appReducers.data,
    decryptedData:  state.appReducers.decryptedData,
    proof: state.appReducers.proof,
    generatingProof: state.appReducers.generatingProof,
    proofGenerated: state.appReducers.proofGenerated
  }
};

const mapDispatchToProps = dispatch => {
  return {

    refreshShippingIds: async () => {

      const shippingIds =  await web3.getIds();

      console.log(shippingIds);

      dispatch(gotShippingIds(shippingIds[0]))

    },

    onSelectShippingId: async (shippingId) => {

      if (shippingId !== state.shippingId && state.shippingId !== "") {

        console.log("CLEAR");

        clearInterval(state.subscription);

        dispatch(unsubscribedToContract())

      }

      console.log(shippingId);

      dispatch(selectShippingId(shippingId));

      const data = await getData(shippingId);// JSON.parse(await apiService.getData(shippingId));

      console.log(data);

      const formattedData = [];

      data.forEach((dataPoint) => {
        formattedData.push({
          timestamp: {
            c1: dataPoint[0],
            c2: dataPoint[1],
          },
          orientation: {
            c1: dataPoint[2],
            c2: dataPoint[3],
          },
          orientationEphemeralKey: {
            c1: dataPoint[4],
            c2: dataPoint[5]
          }
        })
      });

      console.log(formattedData);

      let decryptedData = await decryptData.decryptDataSet(formattedData, [], 0);

      dispatch(gotData(formattedData, decryptedData));

      state.shippingId = shippingId;
/*
      state.subscription = await web3.subscribeToDataPoints(shippingId, refreshData, async (shippingId, data) => {

        const formattedData = [];

        data.forEach((dataPoint) => {
          formattedData.push({
            timestamp: {
              c1: dataPoint[0],
              c2: dataPoint[1],
            },
            orientation: {
              c1: dataPoint[2],
              c2: dataPoint[3],
            },
            orientationEphemeralKey: {
              c1: dataPoint[4],
              c2: dataPoint[5]
            }
          })
        });

        console.log(shippingId);
        console.log(formattedData);

        let decryptedData = await decryptData.decryptDataSet(formattedData, [], 0);

        selectShippingId(shippingId, formattedData, decryptedData);

      });

      dispatch(subscribedToContract(state.subscription));
*/
    },

    onGenerateProof(){
      dispatch(generatingProof())
    },

    onProofGenerated(){
      dispatch(proofGenerated())
    },

    sendProof: (proof) => {
      dispatch(proofSent(proof))
    }

  }
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer


async function refreshData(shippingId, data, onRefreshData){

  let newData = state.data;

  data.forEach((freshDataPoint) => {

    let found = false;

    state.data.forEach((dataPoint) => {

      if(dataPoint[1] === freshDataPoint[1] && dataPoint[2] === freshDataPoint[2]){
        found = true;
      }

    });

    if(!found){
      newData.push(freshDataPoint)
    }

  });

  await onRefreshData(shippingId, newData)


}


async function getData(shippingId){

  return new Promise(async (resolve, reject) => {

    try{

      const reportsCount = await web3.getDataLength(shippingId);

      const data = await getDataById(shippingId, reportsCount, [], 0);

      state.data = data;

      resolve(data)

    } catch(e){
      reject(e)
    }

  })

}

async function getDataById(shippingId, reportsCount, data, index){

  return new Promise(async (resolve, reject) => {

    try{

      if(index < reportsCount){

        const dataPoint = await web3.getDataPoint(shippingId, index);

        data.push(dataPoint);

        resolve(getDataById(shippingId, reportsCount, data, index + 1))

      } else {
        resolve(data)
      }


    } catch(e){
      reject(e)
    }

  })

}
