import axios from "axios";
import jwt_decode from "jwt-decode";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

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

    // store decoded somehwere
  } catch (e) {
    throw new Error(e);
  }
}

export function Logout() {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
}
