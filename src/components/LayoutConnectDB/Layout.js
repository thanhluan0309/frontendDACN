import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { DragDropContext } from "react-beautiful-dnd";
import { getOneColums } from "../Dashboard/postBehavior";
import { useNavigate } from "react-router-dom";
import { ModalAddColumn } from "./LayoutDBhandle";
import {
  getPosts, //change to get all post by MAPID
  getPostsByMapId,
  initColumns,
  updateColumns,
  getAllColumns, //change to get post by MAPID
  getColumnsByMapId,
  DeletedPost,
  getOneColumsByidBody,
  DeletedColumns_ByID,
  updateTaskidColumns,
} from "../Dashboard/postBehavior";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { createNotification } from "../Notifications/notifications";
import "./style.css";
import Column from "./Column";
import * as Icon from "react-bootstrap-icons";
const LayoutDNDConnectDB = () => {
  const [Posthave, setPosthave] = useState([]);
  const [state, setstate] = useState([]);
  const [columns, setColumns] = useState([]);
  const [runone, setrunone] = useState(true);
  const [removeTask, setRemovetask] = useState("");
  const [removeTaskfromCol, setRemovetaskfromCol] = useState("");
  const nav = useNavigate();

  const getallPostBYmapid = async () => {
    try {
      const GetallPostzx = await getPostsByMapId(localStorage.getItem("mapid"));
      if (GetallPostzx.success) {
        setstate(GetallPostzx.Post_of_User);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let title = {
    //Add MapID
    id: `idInit${localStorage.getItem("mapid")}`,
    title: "Process",
    MapId: localStorage.getItem("mapid"),
  };

  const updateColumnsWhenHandle = async (e) => {
    console.log("handle update ", e);
    await updateColumns(e);
    autorun();
  };
  const updatecolumnsinit = async () => {
    let UpdateInit = {
      _id: localStorage.getItem("IDinitColumns"),
      taskIds: [],
    };
    let laytemp = [];
    let getposthave = [...Posthave];
    if (columns.length === 0) {
      for (let index = 0; index < state.length; index++) {
        UpdateInit.taskIds.push(state[index]._id);
      }
    } else {
      for (let index = 0; index < columns.length; index++) {
        if (columns[index].taskIds[0] !== undefined) {
          for (let i = 0; i < columns[index].taskIds[0].length; i++) {
            laytemp.push(columns[index].taskIds[0][i]);
          }
        }
      }
      if (state.length >= laytemp.length) {
        for (let index = 0; index < state.length; index++) {
          if (laytemp.indexOf(`${state[index]._id}`) === -1) {
            getposthave.push(state[index]._id);
          }
        }
      }
      autorun();
      UpdateInit.taskIds = [...getposthave];
    }
    await updateColumns(UpdateInit);
    checkValidColumninit(title);
  };

  const GetallColByMapId = async () => {
    const gAllCol = await getColumnsByMapId(localStorage.getItem("mapid"));
    setColumns(gAllCol.getALlCol);
  };

  const getInitColumns = async () => {
    if (localStorage.getItem("IDinitColumns") !== null) {
      DeltedById(localStorage.getItem("IDinitColumns"));
    }
    const getInit = await initColumns(title);
    localStorage.setItem("IDinitColumns", getInit.data.newcolumns._id);
    updatecolumnsinit();
  };
  const DeltedById = async (id) => {
    await DeletedColumns_ByID(id);
    autorun();
  };
  const autorun = () => {
    for (let index = 0; index < 5; index++) {
      getallPostBYmapid();
      GetallColByMapId();
    }
  };

  const getPostTodeleteTask = async (e, idTask) => {
    const req = await getOneColums(e);
    let col = req.OneColumns;

    const index = col.taskIds[0].indexOf(`${idTask}`);
    if (index > -1) {
      col.taskIds[0].splice(index, 1); // 2nd parameter means remove one item only
    }
    await updateTaskidColumns(col);
    autorun();
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return nav("/login");
    }
    // GetallCol();

    GetallColByMapId();
    if (removeTask) {
      getPostTodeleteTask(removeTaskfromCol, removeTask);
      setRemovetaskfromCol("");
      setRemovetask("");
    }
  });
  const checkValidColumninit = async (e) => {
    const res = await getOneColumsByidBody(e);
    localStorage.setItem("IDinitColumns", res.OneColumns._id);
    setPosthave(res.OneColumns.taskIds[0]);
    for (let index = 0; index < 4; index++) {
      setPosthave(res.OneColumns.taskIds[0]);
    }
    return res.OneColumns;
  };
  window.onload = function () {
    checkValidColumninit(title);
    autorun();
    console.clear();
  };
  const getOneColumsByid = async (id) => {
    const getColumns = await getOneColums(id);
    return getColumns.OneColumns;
  };

  const onDragEnd = async (results) => {
    autorun();
    const { destination, draggableId, source } = results;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let startPromise = getOneColumsByid(source.droppableId);
    let finishPromise = getOneColumsByid(destination.droppableId);
    let starts = {};
    let finishs = {};
    startPromise.then(function (result) {
      starts = {
        ...result,
      };
      finishPromise.then(function (result) {
        finishs = {
          ...result,
        };
        if (starts._id === finishs._id) {
          const newTaskID = Array.from(starts.taskIds);
          newTaskID[0].splice(source.index, 1);
          newTaskID[0].splice(destination.index, 0, draggableId);

          const newcolumn = {
            ...starts,
            taskIds: newTaskID[0],
          };
          updateColumnsWhenHandle(newcolumn);
          checkValidColumninit(title);
          return;
        } else {
          const finishtaskID = Array.from(finishs.taskIds);

          if (finishtaskID[0] === undefined) {
            finishtaskID[0] = [];
          }
          finishtaskID[0].splice(destination.index, 0, draggableId);
          const newfinish = {
            ...finishs,
            taskIds: finishtaskID[0],
          };

          const starttaskID = Array.from(starts.taskIds);
          starttaskID[0].splice(source.index, 1);
          const newstart = {
            ...starts,
            taskIds: starttaskID[0],
          };

          updateColumnsWhenHandle(newstart);
          updateColumnsWhenHandle(newfinish);
          checkValidColumninit(title);
          return;
        }
      });
    });
  };
  const [addColumnsForm, setaddColumnsForm] = useState({
    MapId: localStorage.getItem("mapid"),
    title: "",
  });
  const handleChangeFormAddColumns = (event) => {
    setaddColumnsForm({
      ...addColumnsForm,
      [event.target.name]: event.target.value,
    });
  };

  const CreateNewColumn = async () => {
    const req = await initColumns(addColumnsForm);
    autorun();
    return req;
  };
  const submitchange = async (event) => {
    let updateCol = {
      _id: event.target.value,
      title: document.getElementById(`${event.target.value}`).innerText,
    };

    if (updateCol.title.length > 25) {
      createNotification("info", "Title no more than 25 characters ");
    } else {
      await updateColumns(updateCol);
      createNotification("warning", "Update title success");
    }
  };
  return (
    <>
      <div
        className="cssforlayout"
        style={{
          width: "100%",
          height: "851px",
        }}
      >
        <div className="row">
          <div className="col-12">
            <nav
              style={{ opacity: "0.8", height: "136%" }}
              className="navbar navbar-expand-lg navbar-dark bg-dark"
            >
              <a className="navbar-brand" href="#">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
                Smart-note
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#my-nav-bar"
                aria-controls="my-nav-bar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="my-nav-bar">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    {localStorage.getItem("managerUser") === "true" ? (
                      <Button onClick={getInitColumns}>Init map</Button>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="nav-item">
                    <a
                      style={{ width: "100%", marginLeft: "20px" }}
                      href="/Dashboard"
                    >
                      <Button>Back</Button>
                    </a>
                  </li>

                  <li className="nav-item">
                    <Button
                      type="button"
                      style={{ marginLeft: "20px" }}
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Create new Column
                    </Button>
                  </li>
                  <li className="nav-item">
                    <Button
                      type="button"
                      style={{ marginLeft: "20px" }}
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Reset all
                    </Button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <NotificationContainer></NotificationContainer>
        <ModalAddColumn
          addColumnsForm={addColumnsForm}
          handleChangeFormAddColumns={handleChangeFormAddColumns}
          CreateNewColumn={CreateNewColumn}
        ></ModalAddColumn>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex" }}>
            {columns &&
              columns.map((columID, index) => {
                const colum = columns[index];
                const task = colum.taskIds.map(
                  (taskIds, index) => colum.taskIds[index]
                );
                if (task[0] === undefined) {
                  const lay = [];
                  return (
                    <>
                      <div className="Column">
                        <div className="Column-navbar">
                          <Button
                            onClick={submitchange}
                            value={colum._id}
                            className="btn btn-warning "
                          >
                            Save
                          </Button>

                          <div
                            id={colum._id}
                            name={colum._id}
                            className="card-title"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                          >
                            {colum.title}
                          </div>

                          <Button
                            onClick={() => {
                              DeltedById(colum._id);
                            }}
                            className="btn btn-danger mt-1"
                          >
                            <Icon.Trash fontWeight={600} size={20}></Icon.Trash>
                          </Button>
                        </div>
                        <div className="Column-Body">
                          <Column
                            setRemovetaskfromCol={setRemovetaskfromCol}
                            setRemovetask={setRemovetask}
                            key={colum._id}
                            column={colum}
                            tasks={lay}
                          ></Column>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div className="Column">
                        <div className="Column-navbar">
                          <Button
                            onClick={submitchange}
                            value={colum._id}
                            className="btn btn-warning "
                          >
                            Save
                          </Button>

                          <div
                            id={colum._id}
                            name={colum._id}
                            className="card-title"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                          >
                            {colum.title}
                          </div>

                          <Button
                            onClick={() => {
                              DeltedById(colum._id);
                            }}
                            className="btn btn-danger mt-1"
                          >
                            <Icon.Trash fontWeight={600} size={20}></Icon.Trash>
                          </Button>
                        </div>
                        <div className="Column-Body">
                          <Column
                            setRemovetaskfromCol={setRemovetaskfromCol}
                            setRemovetask={setRemovetask}
                            key={colum._id}
                            column={colum}
                            tasks={task[0]}
                          ></Column>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
export default LayoutDNDConnectDB;
