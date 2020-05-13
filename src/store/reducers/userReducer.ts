import {IUser} from "../../models/User";

export type UserActionType = 'LOGIN' | 'LOGOUT'
export type UserAction = {type: UserActionType, payload?: IUser}
export type UserState = IUser | null

const storedUser = localStorage.getItem('user');

const initialState: UserState = storedUser
  ? JSON.parse(storedUser) as IUser
  : null;

export default function userReducer(state = initialState, {type, payload}: UserAction) {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(payload));
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
