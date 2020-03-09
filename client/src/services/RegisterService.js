import axios from "axios";

export async function Register(registrationData) {
  try {
    const body = JSON.stringify(registrationData);

    return axios.post("http://localhost:3001/api/users/register", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
