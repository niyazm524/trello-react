import Axios from "axios";

const axios = Axios.create({
  baseURL: '/api'
});

export default axios;

export function setToken(token: string | null): void {
  if(token != null) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers['Authorization']
  }
}
