import {AnyAction, createStore, Store} from 'redux';
import reducer from './reducers'
import {UserState} from "./reducers/userReducer";
import {ToastPropsState} from "./reducers/toastReducer";

const store: Store<RootState, AnyAction> = createStore(reducer);
export default store;

export interface RootState {
  userReducer: UserState,
  toastReducer: ToastPropsState
}

export function showMessage(message: string) {
  store.dispatch({type: 'SHOW_MESSAGE', payload: message})
}

export function showError(error: Error | string) {
  store.dispatch({type: 'SHOW_ERROR', payload: error})
}
