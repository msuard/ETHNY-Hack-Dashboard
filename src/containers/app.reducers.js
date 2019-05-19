import {
  SELECT_SHIPPING_ID,
  GOT_DATA,
  SUBSCRIBED,
  UNSUBSCRIBED,
  SHIPPING_IDS,
  PROOF_SENT,
  GENERATING_PROOF,
  PROOF_GENERATED
} from "./actions";

const defaultState = {
  shippingId: "",
  shippingIds: [],
  data: [],
  decryptedData: [],
  subscription: null,
  proof: null,
  generatingProof: false,
  proofGenerated: false
};


export function appReducers(state = defaultState , action) {

  switch (action.type) {

    case SELECT_SHIPPING_ID:
      return Object.assign({}, {
        ...state,
        shippingId: action.shippingId,
        data: [],
        decryptedData: [],
        proof: null,
        proofGenerated: false,
        generatingProof: false
      });

    case GOT_DATA:
      return Object.assign({}, {
        ...state,
        data: action.data,
        decryptedData: action.decryptedData,
      });

    case SUBSCRIBED:
      return Object.assign({}, {
        ...state,
        subscription: action.subscription
      });

    case UNSUBSCRIBED:
      return Object.assign({}, {
        ...state,
        subscription: null
      });

    case SHIPPING_IDS:
      return Object.assign({}, {
        ...state,
        shippingIds: action.shippingIds
      });

    case PROOF_SENT:
      return Object.assign({}, {
        ...state,
        proof: action.proof
      });

    case GENERATING_PROOF:
    return Object.assign({}, {
      ...state,
      generatingProof: true
    });

    case PROOF_GENERATED:
      return Object.assign({}, {
        ...state,
        proofGenerated: true,
        generatingProof: false

      });

    default:
      return state
  }
}
