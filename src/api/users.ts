import {INewUser, IUser} from "../models/User";
import axios from "./axios";

const endpoint = '/users';

export default {
  create: (user: INewUser) => axios.post<IUser>(endpoint, user, {}),
  getSelf: () => axios.get<IUser>(`${endpoint}/self`)
}
