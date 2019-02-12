import { Platform } from "react-native";

export const BaseUrl = {
  departments:
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/departments/"
      : "http://localhost:5000/departments/",
  departmentUrl:
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/api/departments/"
      : "http://localhost:5000/api/departments/",
  loginUrl:
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/api/auth/login"
      : "http://localhost:5000/api/auth/login",
  registerUrl:
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/api/register"
      : "http://localhost:5000/api/register"
};
