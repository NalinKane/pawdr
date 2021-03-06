import axios from "axios";

export async function Register(registrationData) {
  try {
    const body = JSON.stringify(registrationData);

    return axios.post("/api/users/register", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
