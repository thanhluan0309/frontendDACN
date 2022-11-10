import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../Layout/Navbar";
import { Map } from "../Layout/Caroucel";
import Button from "react-bootstrap/esm/Button";
import React from "react";
import { NotificationContainer } from "react-notifications";
import { createNotification } from "../Notifications/notifications";
import "react-notifications/lib/notifications.css";
import {
  getPosts,
  getPostsByMapId,
  createnewPost,
  DeletedPost,
  getOnePost,
  EditPost,
  getOneMapby_Id,
  updateMap,
} from "./postBehavior";
import { udlus } from "../Login/UserBehavior";
import { CheckLoginUser } from "../Login/UserBehavior";
import ReactTooltip from "react-tooltip";
import { ModalEdit, ModalAddpost } from "./handleDash";
import { FormSendMail } from "../SendEmail/Sendmail";
import { decodeToken } from "react-jwt";
import "./style.css";
import * as Icon from "react-bootstrap-icons";
import { linear } from "eases";

export const Dashboard = () => {
  const [Post, setPost] = useState();
  const [Map, setMap] = useState([]);
  const [istrue, setistrue] = useState(true);
  const [formupdatecolor, setformupdatecolor] = useState({
    NameColor: "",
  });
  const onhandlechangecolor = (event) => {
    setformupdatecolor({
      ...formupdatecolor,
      [event.target.name]: event.target.value,
    });
  };
  const Submitcolor = async (e) => {
    let color = Map;
    color.push(formupdatecolor);
    await updateMap(color);
    setistrue(true);
  };
  let myDecodedToken = decodeToken(localStorage.getItem("CodeShare"));
  let nav = useNavigate();

  const [createPost, setCreatePost] = useState({
    title: "",
    Des: "",
    Url: "",
    Behavior: "Learning",
    color: "#ffa500",
    user: localStorage.getItem("userid"),
    MapId: localStorage.getItem("mapid"),
  });

  // Edit Post
  let [getPostEdit, setGetPostEdit] = useState({});

  const onchangeEdit = (event) => {
    setGetPostEdit({
      ...getPostEdit,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitEdit = async (res) => {
    try {
      const GetEdit = await EditPost(getPostEdit);
      if (GetEdit.data.success) {
        createNotification("warning", GetEdit.data.Message);
      }
    } catch (error) {
      createNotification("error", "Title can't be empty");
    }
  };

  const onchangeCreate = (event) => {
    setCreatePost({
      ...createPost,
      [event.target.name]: event.target.value,
    });
  };

  const getPostBymapid = async () => {
    try {
      const GetallPostzx = await getPostsByMapId(localStorage.getItem("mapid"));

      if (GetallPostzx.success) {
        setPost(GetallPostzx.Post_of_User);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onclickGetonePost = async (event) => {
    const getOneP = await getOnePost(event.target.value);

    if (getOneP.success) {
      setGetPostEdit(getOneP.posts);
      getPostEdit = getOneP.posts;
    }
  };

  const onSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      const onCreate = await createnewPost(createPost);
      if (onCreate.data.success) {
        createNotification("success", "Create new post success");
      }
    } catch (error) {
      createNotification("error", "Title can't be empty");
    }
  };
  const RemovePost = async (event) => {
    await DeletedPost(event.target.value);
  };
  const getOneMap = async () => {
    const req = await getOneMapby_Id(localStorage.getItem("mapid"));
    setMap(req.mapget.color);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return nav("/login");
    }
    getPostBymapid();
    if (istrue) {
      getOneMap();
      setistrue(false);
    }
  });

  const gobackHomepage = () => {
    nav("/homepage");
    window.location.reaload();
  };
  return (
    <>
      <Navbar></Navbar>
      <div style={{ position: "fixed", zIndex: "200" }}>
        <NotificationContainer></NotificationContainer>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "4px",
          zIndex: "200",
          position: "fixed",
          
        }}
        className="cssforDashboard"
      >
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div className="managePost">
            <span style={{ marginLeft: "12px" }} className="managePost-title">
              <Button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add post
              </Button>
              <Button
                type="button"
                className="btn btn-primary"
                style={{ marginLeft: "20px" }}
                onClick={gobackHomepage}
              >
                Back
              </Button>

              <a style={{ width: "100%", marginLeft: "20px" }} href="/layoutdb">
                <Button>Go to work-space</Button>
              </a>

              <div className="RowNoteColor">
                <div className="RowNote-left">
                  {Map &&
                    Map.map((item, index) => (
                      <div className="RowNoteColor-body">
                        {Map[index].NameColor} -{" "}
                        <span
                          style={{
                            backgroundColor: `${Map[index].color}`,
                            width: "20px",
                            height: "20px",
                            borderRadius: "40px",
                            padding: "5px",
                          }}
                        >
                          {`${Map[index].color}`}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="RowNote-right border shadow">
                  <div className="form">
                    <div className="form-item">
                      <input
                        type="text input"
                        placeholder="Content color"
                        name="NameColor"
                        value={formupdatecolor.NameColor}
                        onChange={onhandlechangecolor}
                      ></input>
                    </div>
                    <div className="form-item">
                      <label>Choose your color</label>
                      <input
                        type="color"
                        name="color"
                        onChange={onhandlechangecolor}
                      ></input>
                    </div>
                    <div className="form-item">
                      <Button
                        value={localStorage.getItem("mapid")}
                        onClick={Submitcolor}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <ModalAddpost
              onchangeCreate={onchangeCreate}
              createPost={createPost}
              onSubmitCreate={onSubmitCreate}
            ></ModalAddpost>
            <form>
              <div className="managePost-body">
                <ul className="body-Listitem">
                  {Post &&
                    Post.map(({ title, _id, Url, Des, user, color }) => (
                      <li
                        key={_id}
                        id={_id}
                        name="id"
                        style={{ backgroundColor: `${color}` }}
                        className="body-item"
                      >
                        <Button onClick={RemovePost} value={_id}>
                          X
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop2"
                          onClick={onclickGetonePost}
                          value={_id}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            window.open(Url);
                          }}
                        >
                          🔗
                        </Button>
                        <ModalEdit
                          id={_id}
                          color={color}
                          onchangeEdit={onchangeEdit}
                          onSubmitEdit={onSubmitEdit}
                          getPostEdit={getPostEdit}
                        ></ModalEdit>

                        <p className="cssforItem-content">
                          <b>Title: {title}</b>
                        </p>
                        <p className="cssforItem-content">
                          URL:
                          {Url && Url.length > 20
                            ? `${Url.substr(0, 20)}...`
                            : `${Url}`}
                        </p>
                        <p className="cssforItem-content">
                          DES:
                          {Des && Des.length > 20
                            ? `${Des.substr(0, 19)}...`
                            : `${Des}`}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
