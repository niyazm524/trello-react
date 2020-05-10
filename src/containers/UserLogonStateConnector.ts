import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store";

const mapState = (state: RootState) => ({
  isUserLogon: state.userReducer != null && state.userReducer.id != null,
});

const connector = connect(
  mapState
);

export type PropsFromRedux = ConnectedProps<typeof connector>

export default connector
