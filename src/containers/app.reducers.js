import {
  CLICK,
} from "./actions";

const defaultState = {
  clicksCount: 0,
};


export function appReducers(state = defaultState , action) {

  switch (action.type) {

    case CLICK:
      return Object.assign({}, {
        ...state,
        clicksCount: state.clicksCount + 1,
      });
    default:
      return state
  }
}
