import React from "react";
import Button from "react-bootstrap/Button";

import { LoginUser } from "./UserBehavior";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorBox from "./Errorbox";
import "./StyleScss.scss";
import Register from "./Register";

export default function Login() {
  const [showErrorBox, setShowErrorBox] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Login";
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChangeLogin = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    setShowErrorBox(false);
  };

  const Login = async (event) => {
    event.preventDefault();
    try {
      const LoginData = await LoginUser(loginForm);
      if (LoginData.success) {
        nav("/homepage");
        window.location.reload();
      }
    } catch (error) {
      setShowErrorBox(true);
      console.log(error.response);
    }
  };

  return (
    <>
      <div
        className="cssforlayout"
        style={{ width: "100%", height: "100%", position: "fixed" }}
      >
        <div className="materialContainer">
          <div className="box">
            <div className="title">LOGIN</div>
            <ErrorBox
              messageError={"Tài khoản không hợp lệ!"}
              showErrorBox={showErrorBox}
            />
            <div className="input">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="username"
                onChange={onChangeLogin}
                value={loginForm.username}
              />
              <span className="spin"></span>
            </div>

            <div className="input">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                name="password"
                onChange={onChangeLogin}
                value={loginForm.password}
              />
              <span className="spin"></span>
            </div>

            <div className="button login">
              <Button className="m-6 w-100" onClick={Login}>
                Sign in
              </Button>
            </div>

            <a href="" className="pass-forgot">
              Forgot your password?
            </a>
          </div>
          <Register></Register>
        </div>
      </div>
    </>
  );
}
