import {
  SELECT_SHIPPING_ID,
} from "./actions";

const defaultState = {
  shippingId: "",
  data: [],
  decryptedData: []
};


export function appReducers(state = defaultState , action) {

  switch (action.type) {

    case SELECT_SHIPPING_ID:
      return Object.assign({}, {
        ...state,
        shippingId: action.shippingId,
        data: action.data,
        decryptedData: action.decryptedData
      });
    default:
      return state
  }
}
