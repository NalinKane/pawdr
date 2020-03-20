import axios from "axios";

export async function CreateNewPet(petData) {
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

export async function UpdatePet(petData) {
  try {
    const body = JSON.stringify(petData);

    return axios.post("/api/pets/update", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function GetMyPets() {
  try {
    const { data } = await axios.get("/api/pets/show");
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function MatchRequest(id, match) {
  try {
    const body = JSON.stringify({ id, match });

    return axios.post("/api/pets/matchRequest", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function GetMatches() {
  try {
    return axios.get("/api/pets/getMatches", {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
