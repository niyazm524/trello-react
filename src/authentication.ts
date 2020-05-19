import axios, {setToken} from "./api/axios";
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
          await logout();
        }
      }
      console.error(e);
    }
  }
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  store.dispatch({type: 'SHOW_ERROR', payload: error})
  if(error.response) {
    if(error.response.status === 401) {
      return logout().then(() => Promise.reject(error));
    }
  }
  return Promise.reject(error);
});

function isAxiosError(e: Error): e is AxiosError {
  return 'isAxiosError' in e && e['isAxiosError'] === true
}

export async function login(userCredentials: IUserCredentials) {
  const {data} = await api.auth.login(userCredentials);
  localStorage.setItem('access_token', data.token);
  await init();
}

export async function logout(): Promise<void> {
  store.dispatch<UserAction>({type: 'LOGOUT'});
  localStorage.removeItem('access_token');
}
