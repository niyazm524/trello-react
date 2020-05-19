import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import toastReducer from "./toastReducer";

const rootReducer = combineReducers({
  userReducer,
  toastReducer
});

export default rootReducer;
