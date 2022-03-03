import {
  custReducer,
  headReducer,
  idReducer,
  passbookReducer,
  phoneReducer,
} from "./reducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  headProducts: headReducer,
  phoneProducts: phoneReducer,
  idProducts: idReducer,
  custProducts: custReducer,
  pasbookProducts: passbookReducer,
});

export default reducer;
