import { Navbar } from "../Layout/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllMaps,
  getAllByMapId,
  createMaps,
  deletedMap,
} from "./HomeBehavior";
import "./style.css";
import Button from "react-bootstrap/esm/Button";
import { FormSendMail } from "../SendEmail/Sendmail";
import { decodeToken } from "react-jwt";
import { CheckLoginUser, udlus } from "../Login/UserBehavior";

import * as Icon from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
export const HomePage = () => {
  let myDecodedToken = decodeToken(localStorage.getItem("CodeShare"));
  const [ListUserAccess, setListUserAccess] = useState([]);
  const [ListUserRequest, setListUserRequest] = useState([]);
  const [istrue, setistrue] = useState(true);
  const [clickOnetimes, setClickOnetimes] = useState(false);
  window.onload = function () {
    getListfromUser();
  };
  const getListfromUser = async () => {
    let FormAccessUser = {
      username: myDecodedToken.CODESHARE.split("#")[1],
      password: myDecodedToken.CODESHARE.split("#")[0],
    };
    const getUser = await CheckLoginUser(FormAccessUser);
    let templistjoin = [];
    let templistrequest = [];
    if (getUser.success) {
      templistjoin = getUser.user.ListEmailJoin;
      templistrequest = getUser.user.ListEmailRequestJoin;
    }
    setListUserAccess(templistjoin);
    setListUserRequest(templistrequest);
  };
  let nav = useNavigate();
  const [GetAllmap, setGetAllMap] = useState([]);
  const [FormBoard, setFormBoard] = useState({});

  const getAllMapBYid = async () => {
    try {
      const getMap = await getAllByMapId(localStorage.getItem("userid"));
      if (getMap.success) {
        setGetAllMap(getMap.mapgetall);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleChange = (event) => {
    setFormBoard({
      ...FormBoard,

      [event.target.name]: event.target.value,
    });
  };
  const CreateBoard = async () => {
    await createMaps(FormBoard);
    setistrue(true);
  };
  const GetIdMapAndRedirect = (event) => {
    localStorage.setItem("mapid", event.target.value);
    nav("/Dashboard");
    window.location.reload();
    return;
  };
  const RemoveUserAccess = async (event) => {
    let layremove = [];
    layremove = ListUserAccess;
    const index = layremove.indexOf(event.target.value);
    if (index > -1) {
      layremove.splice(index, 1);
    }
    let FormUpdateListUser = {
      _id: localStorage.getItem("userid"),
      ListEmailJoin: layremove,
    };
    await udlus(FormUpdateListUser);

    getListfromUser();
  };
  const AcceptUserFromRequest = async (event) => {
    let laypop = [];
    laypop = ListUserRequest;
    const index = laypop.indexOf(event.target.value);
    if (index > -1) {
      laypop.splice(index, 1);
    }
    let laypush = [];
    laypush = ListUserAccess;
    laypush.push(`${event.target.value}`);
    let FormUpdateListUser = {
      _id: localStorage.getItem("userid"),
      ListEmailJoin: laypush,
      ListEmailRequestJoin: laypop,
    };
    await udlus(FormUpdateListUser);

    getListfromUser();
  };
  const RemoveUserFromRequest = async (event) => {
    let layremove = [];
    layremove = ListUserRequest;
    const index = layremove.indexOf(event.target.value);
    if (index > -1) {
      layremove.splice(index, 1);
    }
    let FormUpdateListUser = {
      _id: localStorage.getItem("userid"),
      ListEmailRequestJoin: layremove,
    };
    await udlus(FormUpdateListUser);

    getListfromUser();
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return nav("/login");
    }
    if (istrue) {
      getAllMapBYid();
      setistrue(false);
    }
    if (clickOnetimes) {
      setTimeout(function () {
        setClickOnetimes(false);
      }, 5000);
    }
  });
  const DeleteMap = async (event) => {
    const answer = window.confirm("Do you want remove this board??");
    if (answer) {
      await deletedMap(event.target.value);
    }
    getAllMapBYid();
    return;
  };
  return (
    <>
      <Navbar></Navbar>

      <div
        style={{ width: "25%", marginLeft: "35px", marginTop: "63px" }}
        className="btn-group dropend"
      >
        {localStorage.getItem("managerUser") === "true" ? (
          <Button
            style={{ marginLeft: "20px" }}
            className="btn btn-info"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            👥 Manager user
          </Button>
        ) : (
          "."
        )}
        {localStorage.getItem("managerUser") === "true" ? (
          <Button
            data-tip="Coppy code share"
            className="btn-success"
            style={{ borderRadius: "0px 10px 10px 0px" }}
            onClick={() => {
              const copyText = document.getElementById("myInput");
              navigator.clipboard.writeText(copyText.value);
              setClickOnetimes(true);
            }}
          >
            <ReactTooltip style={{ marginLeft: "50px" }} />
            {clickOnetimes ? (
              <Icon.Check size={25}></Icon.Check>
            ) : (
              <Icon.Clipboard2 size={15}></Icon.Clipboard2>
            )}
          </Button>
        ) : (
          ""
        )}
        {localStorage.getItem("managerUser") === "true" ? (
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginLeft: "20px" }}
          >
            Create Board
          </button>
        ) : (
          ""
        )}

        <ul
          style={{ padding: "0px 17px", top: "-23px" }}
          className="dropdown-menu"
        >
          <div>
            <div className="mb-3">
              <label
                style={{ marginLeft: "42%" }}
                htmlFor="exampleInputEmail1"
                className="form-label"
              >
                Title
              </label>
              <input
                type="text"
                name="name"
                onChange={onHandleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button
              style={{ marginLeft: "32%" }}
              className="btn btn-primary"
              onClick={CreateBoard}
            >
              Submit
            </button>
          </div>
        </ul>
        <input
          type="hidden"
          value={localStorage.getItem("CodeShare")}
          id="myInput"
        ></input>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <h5 className=" offcanvas-title" id="offcanvasScrollingLabel">
              User management
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <div className="FormUserAccess">
              <div className="FormUserAccess-title">
                <h5> list of users with access rights</h5>
              </div>
              <ul className="FormUserAccess-list">
                {ListUserAccess &&
                  ListUserAccess.map((ListUserAccess) => (
                    <li className="FormUserAccess-list-iteam">
                      <div className="FormUserAccess-list-iteam_left">
                        {ListUserAccess}
                      </div>
                      <div className="FormUserAccess-list-iteam_Right">
                        <button
                          value={ListUserAccess}
                          onClick={RemoveUserAccess}
                          type="button"
                          className="btn btn-danger mt-1"
                        >
                          x
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <hr></hr>
            <div className="FormUserRequestAccess">
              <div className="FormUserRequestAccess-title">
                <h5>Email sent approval request</h5>
              </div>
              <ul className="FormUserRequestAccess-list">
                {ListUserRequest &&
                  ListUserRequest.map((ListUserRequest) => (
                    <li className="FormUserRequestAccess-list-iteam">
                      <div className="FormUserRequestAccess-list-iteam_left">
                        {ListUserRequest}
                      </div>
                      <div className="FormUserRequestAccess-list-iteam_Right">
                        <button
                          value={ListUserRequest}
                          onClick={AcceptUserFromRequest}
                          type="button"
                          className="btn btn-success mt-1"
                        >
                          ✔
                        </button>
                        &ensp;
                        <button
                          value={ListUserRequest}
                          onClick={RemoveUserFromRequest}
                          type="button"
                          className="btn btn-danger mt-1"
                        >
                          x
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {localStorage.getItem("managerUser") === "true" ? (
          <FormSendMail
            CodeShare={myDecodedToken.CODESHARE}
            email={localStorage.getItem("email")}
            // setListUserAccess={}
            // setListUserRequest={}
            getListfromUser={getListfromUser()}
          ></FormSendMail>
        ) : (
          ""
        )}
      </div>
      <div
        style={{ position: "fixed", left: "4%", top: "22%" }}
        className="card-body shadow-none"
      >
        <h2
          style={{ fontWeight: "600", fontSize: "25px" }}
          className=" cssfortitle"
        >
          <Icon.BoxSeam></Icon.BoxSeam> Board
        </h2>
        <h6 className="card-subtitle mb-1 text-muted">
          We will not share information with anyone
        </h6>
        <p className="card-text">
          Individual commitment to a <code>group effort</code> that is what
          makes a team work,<code>a company work</code> , a society work
        </p>
      </div>
      <hr></hr>
      <div>
        <div className="shadow cssforUl">
          {GetAllmap &&
            GetAllmap.map((item, index) => (
              <div className="shadow cssforUl-li card">
                <img
                  className="card-img-top"
                  src="https://www.gettyimages.in/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "black" }}>
                    {GetAllmap[index].name}
                  </h5>
                  <Button
                    className="btn btn-primary"
                    value={GetAllmap[index]._id}
                    onClick={GetIdMapAndRedirect}
                  >
                    Go To Board
                  </Button>
                  {localStorage.getItem("managerUser") === "true" ? (
                    <button
                      className="btn btn-dark"
                      style={{ marginLeft: "20px" }}
                      value={GetAllmap[index]._id}
                      onClick={DeleteMap}
                    >
                      Delete Map
                    </button>
                  ) : (
                    "."
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
