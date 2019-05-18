import {
  SELECT_SHIPPING_ID,
} from "./actions";

export function selectShippingId(shippingId, data, decryptedData){
  return {
    type: SELECT_SHIPPING_ID,
    shippingId,
    data,
    decryptedData
  };
}
