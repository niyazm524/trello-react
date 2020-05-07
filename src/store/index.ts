import {AnyAction, createStore, Store} from 'redux';
import reducer from './reducers'
import {UserState} from "./reducers/userReducer";

const store: Store<RootState, AnyAction> = createStore(reducer);
export default store;

export interface RootState {
  userReducer: UserState
}
