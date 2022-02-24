import { headReducer, phoneReducer } from "./reducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  headProducts: headReducer,
  phoneProducts: phoneReducer,
});

export default reducer;
