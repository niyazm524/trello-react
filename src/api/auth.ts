import axios from "./axios";

export default {
  login: (username: string, password: string) => axios.post('/login', {username, password})
}
