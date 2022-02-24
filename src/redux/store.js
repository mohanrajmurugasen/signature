import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(
  reducer,
  {},
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

export default store;
