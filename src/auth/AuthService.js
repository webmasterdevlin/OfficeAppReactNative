import jwtDecode from "jwt-decode";
import { AsyncStorage } from "react-native";

export async function storeToken(val) {
  await AsyncStorage.setItem("token", val);
}

export async function logOut() {
  await AsyncStorage.removeItem("token");
}

export async function getJwt() {
  return await AsyncStorage.getItem("token");
}

export async function storedTokenIsValid() {
  const token = await AsyncStorage.getItem("token");
  if (!token) return false;

  const decoded = jwtDecode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isTokenExpired = dateNow > expiresAt;

  if (isTokenExpired) {
    return false;
  }
  if (!isTokenExpired) {
    return true;
  }
}

export default {
  storeToken,
  logOut,
  routeCanActivate: storedTokenIsValid
};
