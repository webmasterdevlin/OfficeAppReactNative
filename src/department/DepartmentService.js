import { BaseUrl } from "../utils/constants";
import http from "../utils/axios-converter";
import { getJwt } from "../auth/AuthService";

http.setJwt(getJwt());

export async function getDepartments(token) {
  return await http.get(BaseUrl.departmentUrl, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export async function getDepartment(id, token) {
  return await http.get(BaseUrl.departmentUrl + id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export async function postDepartment(department, token) {
  return await http.post(BaseUrl.departmentUrl, department, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token
    }
  });
}

export async function putDepartment(department, token) {
  return await http.put(BaseUrl.departmentUrl + department.id, department, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token
    }
  });
}

export async function deleteDepartment(department, token) {
  return await http.delete(BaseUrl.departmentUrl + department.id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
