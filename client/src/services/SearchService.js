import axios from "axios";

export async function Search(query) {
  try {
    const body = JSON.stringify({ query });

    return axios.post("/api/search", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
