import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import MessageToast from "../components/MessageToast";
import {ToastAction, ToastPropsState} from "../store/reducers/toastReducer";

const mapState: (state: RootState) => ToastPropsState = (state: RootState) => ({...state.toastReducer});

const mapDispatch: {[key: string]: () => ToastAction} = {
  hideToast: () => ({type: "HIDE_TOAST"})
};

const connector = connect(
  mapState,
  mapDispatch
);

export type PropsFromRedux = ConnectedProps<typeof connector>
export type ToastProps = {
  isEnabled: boolean
  message: string
  duration: number
  type: 'success' | 'info' | 'warning' | 'error' | null
}
export type Props = ToastProps & PropsFromRedux

export default connector(MessageToast);
