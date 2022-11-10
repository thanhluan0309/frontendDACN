import Axios from "axios";

export const LoginUser = async (req) => {
  const respod = await Axios.post("https://deploybackenddacn.onrender.com/Auth/Login", req);

  if (respod.data.success) {
    localStorage.setItem("token", respod.data.Accesstoken);
    localStorage.setItem("username", respod.data.user.username);
    localStorage.setItem("userid", respod.data.user._id);
    localStorage.setItem("email", respod.data.user.email);
    localStorage.setItem("CodeShare", respod.data.CODE_SHARE);
    localStorage.setItem("managerUser", true);
  }

  return respod.data;
};

export const CheckLoginUser = async (req) => {
  const respod = await Axios.post("https://deploybackenddacn.onrender.com/Auth/Login", req);

  return respod.data;
};

export const udlus = async (req) => {
  const response = await Axios.put(
    `https://deploybackenddacn.onrender.com/Auth/${req._id}`,
    req
  );
  return response;
};
export const UDListUser = async (req) => {};

export const RegisterUser = async (req) => {
  const respod = await Axios.post("https://deploybackenddacn.onrender.com/Auth/", req);
  return respod.data;
};
