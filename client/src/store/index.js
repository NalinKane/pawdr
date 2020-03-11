import create from "zustand";
import { setAuthToken } from "../utils/setAuthToken";
import { Login } from "../services/LoginService";

const [useStore] = create(set => ({
  user: null,
  loadUser: data => {
    set({ user: data });
  },
  login: async userData => {
    try {
      const { data } = await Login(userData);
      set({ user: data });
    } catch (e) {
      throw e;
    }
  },
  logout: () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");

    // Remove auth header for future requests
    setAuthToken(false);

    // Clear store
    set({ user: null });
  }
}));

export const useCustomerStore = useStore;
