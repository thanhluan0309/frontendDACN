import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterUser } from "./UserBehavior";

const Register = () => {
  let nav = useNavigate();
  const [formRegister, changeRegister] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const handleRegister = (event) => {
    changeRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  };
  const register = async () => {
    if (!formRegister.email) {
      alert("Email can't be Empty");
      return;
    }
    if (formRegister.password !== formRegister.repassword) {
      alert("Password không trùng khớp");
      return;
    }
    try {
      const registerUser = await RegisterUser(formRegister);
      if (registerUser.success) {
        alert("Đăng ký tài khoản thành công");
        nav("/login");
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="overbox">
        <div className="material-button alt-2">
          <span className="shape"></span>
        </div>

        <div className="title">REGISTER</div>
        <div className="input">
          <label htmlFor="regemail">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleRegister}
            value={formRegister.email}
            id="regemail"
          />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="regname">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleRegister}
            value={formRegister.username}
            id="regname"
          />
          <span className="spin"></span>
        </div>

        <div className="input">
          <label htmlFor="regpass">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleRegister}
            value={formRegister.password}
            id="regpass"
          />
          <span className="spin"></span>
        </div>

        <div className="input">
          <label htmlFor="reregpass">Repeat Password</label>
          <input
            type="password"
            name="repassword"
            onChange={handleRegister}
            value={formRegister.repassword}
            id="reregpass"
          />
          <span className="spin"></span>
        </div>

        <div className="button ">
          <Button className="m-6 w-100" onClick={register}>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};
export default Register;
