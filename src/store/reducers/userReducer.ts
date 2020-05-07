import IUser from "../../models/IUser";

export type UserActionType = 'LOGIN' | 'LOGOUT'
export type UserState = IUser | null

const initialState: UserState = null;

export default function userReducer(state = initialState, {type, payload}: {type: UserActionType, payload?: IUser}) {
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
