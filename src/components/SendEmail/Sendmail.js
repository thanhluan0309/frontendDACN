import "./style.css";
import * as Icon from "react-bootstrap-icons";
import { sendemail } from "./emailBehavior";
import { useState, useEffect } from "react";
import { CheckLoginUser, LoginUser, udlus } from "../Login/UserBehavior";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

export const FormSendMail = ({
  CodeShare,
  email,
  setListUserAccess,
  setListUserRequest,
  getListfromUser,
}) => {
  let decodetoken;
  const nav = useNavigate();

  const [form, setform] = useState({
    emailNeedAccess: email,
    code: "",
  });

  const handlechange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value });
  };

  const startSendMail = async (event) => {
    //check List user
    let username = localStorage.getItem("username");
    let email = localStorage.getItem("email");
    decodetoken = decodeToken(form.code);
    let formsendmail = {
      email: decodetoken.CODESHARE.split("#")[3],
      subject: `Request Access from mail : ${form.emailNeedAccess}`,
      text: "Hello I want to join with you ^^",
    };
    let FormUpdateListUser = {
      _id: decodetoken.CODESHARE.split("#")[2],
      ListEmailJoin: [],
      ListEmailRequestJoin: [],
    };
    let FormAccessUser = {
      username: decodetoken.CODESHARE.split("#")[1],
      password: decodetoken.CODESHARE.split("#")[0],
    };
    const LoginData = await CheckLoginUser(FormAccessUser);
    FormUpdateListUser.ListEmailJoin = Array.from(LoginData.user.ListEmailJoin);
    FormUpdateListUser.ListEmailRequestJoin = Array.from(
      LoginData.user.ListEmailRequestJoin
    );
    if (FormUpdateListUser.ListEmailJoin.indexOf(`${email}`) > -1) {
      const answer = window.confirm(
        "This email has been approved, do you want to move??"
      );
      if (answer) {
        localStorage.clear();
        await LoginUser(FormAccessUser);
        localStorage.setItem(
          "username",
          username + " (You are in another space)"
        );
        localStorage.setItem("email", email);

        localStorage.setItem("managerUser", false);
        nav("/homepage");
        window.location.reload();
      }
      return;
    }
    if (FormUpdateListUser.ListEmailRequestJoin.indexOf(`${email}`) < 0) {
      console.log("formsendmail", formsendmail);
      alert("Email has been sent request !!");

      FormUpdateListUser.ListEmailRequestJoin.push(`${email}`);
      const update = await udlus(FormUpdateListUser);
      // setListUserAccess(update.data.updateUser.ListEmailJoin);
      // setListUserRequest(update.data.updateUser.ListEmailRequestJoin);
      await sendemail(formsendmail);

      return;
    }

    event.preventDefault();
  };
  return (
    <>
      <div className="sendmail">
        <div className="  CollapseForm collapse" id="collapseExample">
          <div className="shadow border border-primary cssforform-Body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                disabled
                type="email"
                name="emailNeedAccess"
                onChange={handlechange}
                value={form.emailNeedAccess}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                CODE
              </label>
              <input
                onChange={handlechange}
                value={form.code}
                name="code"
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button onClick={startSendMail} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="btn btn-info btn-circle btn-xl btnCollapse"
        >
          <Icon.ListCheck></Icon.ListCheck>
        </button>
      </div>
    </>
  );
};
