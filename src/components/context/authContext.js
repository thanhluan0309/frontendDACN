import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/reducer";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const loadUser = async () => {
    if (localStorage["token"]) {
      setAuthToken(localStorage["token"]);
    }

    try {
      const response = await axios.get("https://deploybackenddacn.onrender.com/Auth/");
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);

  // Context data
  const authContextData = { authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
