import axios from "axios";

export async function CreatePet(petData) {
  try {
    const body = JSON.stringify(petData);

    return axios.post("/api/pets/create", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
