import Domain from "../services/Endpoint";
import axios from "axios";
import { setSession } from "../services/jwt.service";
import { toast } from "react-toastify";

const createAuthStore = (set, get) => ({
  user: null,
  authLoading: false,
  tokenLoading: true,
  setUser: (args) => set({ user: args }),
  logoutService: () => {
    setSession(null);
    set({ user: null, authLoading: false, tokenLoading: false });
  },
  loginService: async (email, password) => {
    console.log(email, password);
    set({ authLoading: true });
    try {
      const rsp = await axios.post(`${Domain}/api/user/login`, {
        email,
        password,
      });
      if (rsp.data.result?.user && rsp.data.result?.access_token) {
        setSession(rsp.data.result?.access_token);
        set({ user: rsp.data.result?.user, authLoading: false });
      } else {
        set({ authLoading: false, user: null });
      }
    } catch (error) {
      console.log(error?.response);
      set({ authLoading: false });
      toast.error("Error! Invalid credentials");
    }
  },
  loginWithToken: async () => {
    try {
      const rsp = await axios(`${Domain}/api/user/validation`);
      if (rsp.data.result?.user && rsp.data.result?.access_token) {
        setSession(rsp.data.result?.access_token);
        set({ user: rsp.data.result?.user, tokenLoading: false });
      } else {
        set({ tokenLoading: false, user: null });
      }
    } catch (error) {
      console.log(error?.response);
      get().logoutService();
    }
  },
  signUpService: async (email, pass, pass2) => {
    set({ authLoading: true });
    if (pass !== pass2) {
      toast.error("Error! Passwords do not match");
      return;
    }
    try {
      const rsp = await axios.post(`${Domain}/api/user/signup`, {
        email,
        password: pass,
        password2: pass2,
      });
      if (rsp.data.result?.user && rsp.data.result?.access_token) {
        setSession(rsp.data.result?.access_token);
        set({ user: rsp.data.result?.user, authLoading: false });
      } else {
        set({ authLoading: false, user: null });
      }
    } catch (error) {
      console.log(error?.response);
      set({ authLoading: false });
      toast.error("Error! Cannot sign up");
    }
  },
});
export default createAuthStore;
