import { custReducer, headReducer, idReducer, phoneReducer } from "./reducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  headProducts: headReducer,
  phoneProducts: phoneReducer,
  idProducts: idReducer,
  custProducts: custReducer,
});

export default reducer;
