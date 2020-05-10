import {IUser} from "../../models/User";

export type UserActionType = 'LOGIN' | 'LOGOUT'
export type UserAction = {type: UserActionType, payload?: IUser}
export type UserState = IUser | null

const initialState: UserState = null;

export default function userReducer(state = initialState, {type, payload}: UserAction) {
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
