import http from "../utils/axios-converter";
import { BaseUrl } from "../utils/constants";
import { getJwt } from "../auth/AuthService";
http.setJwt(getJwt());

export async function postLogin(userModel) {
  return await http.post(BaseUrl.loginUrl, userModel);
}

export async function postRegistration(userModel) {
  return await http.post(BaseUrl.registerUrl, userModel);
}
