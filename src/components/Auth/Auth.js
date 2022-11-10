import Login from "../Login/Login";
import Register from "../Login/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ authRoute }) => {
  let nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      return nav("/homepage");
    }
  });
  return (
    <>
      {authRoute === "Register" && <Register></Register>}
      {authRoute === "login" && <Login></Login>}
    </>
  );
};
export default Auth;
