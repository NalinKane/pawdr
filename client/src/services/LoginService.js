import axios from "axios";
import jwt_decode from "jwt-decode";
import create from "zustand";
import { setAuthToken } from "../utils/setAuthToken";

const [useStore] = create(set => ({
  user: null,
  loadUser: data => {
    set({ user: data });
  }
}));

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
    throw new Error(e);
  }
}

export function Logout() {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);
}

export const useCustomerStore = useStore;
