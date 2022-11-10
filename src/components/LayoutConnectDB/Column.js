import { Droppable } from "react-beautiful-dnd";
import { DeletedColumns_ByID } from "../Dashboard/postBehavior";
import Task from "./Task";
import "./style.css";

const Column = ({ column, tasks , setRemovetask,setRemovetaskfromCol}) => {
  return (
    <>
      <Droppable droppableId={column._id}>
        {(provided) => (
          <div
            style={{
              marginRight: "11px",
              backgroundColor: "#dfe0e4",
              width: "100%",
              maxHeight: "455px",
              overflowY: "auto",
              borderRadius: "0px 0px 8px 8px",
              marginTop: "20px",
            }}
            className="cssforColumn"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task} task={task} index={index} idcol={column._id} setRemovetaskfromCol={setRemovetaskfromCol}  setRemovetask={setRemovetask}></Task>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
export default Column;
