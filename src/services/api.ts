import axios from "axios";
import { parseCookies } from "nookies";

const { token: token } = parseCookies();

export const api = axios.create({
  //http://localhost:3333
  //https://pelourinhostudio.herokuapp.com/
  baseURL: "https://pelourinhostudio.herokuapp.com/",
});

if (token) {
  api.defaults.headers.common["x-access-token"] = `Bearer ${token}`;
}
