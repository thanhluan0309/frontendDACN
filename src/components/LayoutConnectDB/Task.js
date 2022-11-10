import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { getOnePost } from "../Dashboard/postBehavior";
import { useState } from "react";
const Container = styled.div`
  padding: 30px;
  border: solid 2px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isDragging ? "blue" : "white")};
`;
const Handle = styled.div`
  background-image: url("https://toppng.com/uploads/preview/drag-ico-11569048140clkfdt3vrw.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 43px;
  height: 36px;
  border-radius: 13px;
  margin-right: 20px;
`;
const onclickGetonePost = async (task) => {
  const getOneP = await getOnePost(task);
  return getOneP.posts.title;
};
const onclickGetonePostcolor = async (task) => {
  const getOneP = await getOnePost(task);
  return getOneP.posts.color;
};

const Task = ({ task, index, setRemovetask, setRemovetaskfromCol, idcol }) => {
  let taskname = onclickGetonePost(task);
  const [taskname2, setTaskname] = useState("");

  taskname.then(function (result) {
    setTaskname(result);
  });
  const removetask = (event) => {
    setRemovetask(event.target.value);
    setRemovetaskfromCol(idcol);
  };
  return (
    <>
      <div>
        {task ? (
          <Draggable draggableId={task.toString()} index={index}>
            {(provider, snapshot) => (
              <Container
                {...provider.draggableProps}
                isDragging={snapshot.isDragging}
                ref={provider.innerRef}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <Handle {...provider.dragHandleProps}></Handle> {taskname2}
                  </div>
                  <div>
                    {" "}
                    <button
                      className="btn btn-info"
                      value={task}
                      onClick={removetask}
                    >
                      x
                    </button>
                  </div>
                </div>
              </Container>
            )}
          </Draggable>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Task;
