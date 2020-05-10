import axios from "./axios";
import {IUserCredentials} from "../models/User";

export default {
  login: (userCredentials: IUserCredentials) => axios.post<{token: string}>('/login', userCredentials)
}
