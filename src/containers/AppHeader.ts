import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import {UserActionType} from "../store/reducers/userReducer";
import AppHeader from "../components/AppHeader"

const mapState = (state: RootState) => ({
  isUserLogon: state.userReducer != null && state.userReducer.id != null,
  user: state.userReducer
});

const mapDispatch: {[key: string]: () => {type: UserActionType}} = {
  logout: () => ({type: "LOGOUT"})
};

const connector = connect(
  mapState,
  mapDispatch
);

export type PropsFromRedux = ConnectedProps<typeof connector>
export type Props = PropsFromRedux

export default connector(AppHeader);
