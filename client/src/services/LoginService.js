import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";

export async function Login(userData) {
  try {
    const body = JSON.stringify(userData);
    const { data } = await axios.post("/api/users/login", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { token } = data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);

    const decoded = jwt_decode(token);

    return decoded;
  } catch (e) {
    throw e;
  }
}
