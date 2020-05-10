import {setToken} from "./api/axios";
import api from './api';
import store from "./store";
import {UserAction} from "./store/reducers/userReducer";
import {AxiosError} from "axios";
import {IUserCredentials} from "./models/User";

export default async function init(): Promise<void> {
  const token: string | null = localStorage.getItem('access_token') || null;
  if(token != null) {
    setToken(token);
    try {
      const {data: user} = await api.users.getSelf();
      store.dispatch<UserAction>({type: 'LOGIN', payload: user});
    } catch (e) {
      if(isAxiosError(e)) {
        if(e.response?.status === 401) {
          store.dispatch<UserAction>({type: 'LOGOUT'});
          localStorage.removeItem('access_token');
        }
      }
      console.error(e);
    }
  }
}

function isAxiosError(e: Error): e is AxiosError {
  return 'isAxiosError' in e && e['isAxiosError'] === true
}

export async function login(userCredentials: IUserCredentials) {
  const {data} = await api.auth.login(userCredentials);
  localStorage.setItem('access_token', data.token);
  await init();
}
