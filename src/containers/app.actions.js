import {
  SELECT_SHIPPING_ID,
  GOT_DATA,
  SHIPPING_IDS,
  SUBSCRIBED,
  UNSUBSCRIBED,
  PROOF_SENT,
  GENERATING_PROOF,
  PROOF_GENERATED
} from "./actions";

export function selectShippingId(shippingId){
  return {
    type: SELECT_SHIPPING_ID,
    shippingId,
  };
}

export function gotData(data, decryptedData){
  return {
    type: GOT_DATA,
    data,
    decryptedData
  };
}

export function subscribedToContract(subscription){
  return {
    type: SUBSCRIBED,
    subscription
  };
}

export function unsubscribedToContract(){
  return {
    type: UNSUBSCRIBED
  };
}

export function gotShippingIds(shippingIds){
  return {
    type: SHIPPING_IDS,
    shippingIds
  };
}

export function proofSent(proof) {
  return {
    type: PROOF_SENT,
    proof
  };
}

export function generatingProof(){
  return {
    type: GENERATING_PROOF,
  };
}

export function proofGenerated(){
  return {
    type: PROOF_GENERATED,
  };
}

