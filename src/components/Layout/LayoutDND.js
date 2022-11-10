import initData from "./Data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useState } from "react";
import styled from "styled-components";
const LayoutDND = () => {
  const [state, setstate] = useState(initData);

  const onDragEnd = (results) => {
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

    const start = state.colums[source.droppableId];
    const finish = state.colums[destination.droppableId];

    if (start === finish) {
      const newTaskID = Array.from(start.taskIds);

      newTaskID.splice(source.index, 1);
      newTaskID.splice(destination.index, 0, draggableId);

      const newcolumn = {
        ...start,
        taskIds: newTaskID,
      };

      console.log("newcolumn", newcolumn);
      const newstate = {
        ...state,
        colums: {
          ...state.colums,
          [newcolumn.id]: newcolumn,
        },
      };
      // console.log("Result start == finish", results);
      setstate(newstate);
      // console.log("rs", results);
      return;
    }

    const starttaskID = Array.from(start.taskIds);
    starttaskID.splice(source.index, 1);
    const newstart = {
      ...start,
      taskIds: starttaskID,
    };

    const finishtaskID = Array.from(finish.taskIds);
    finishtaskID.splice(destination.index, 0, draggableId);
    const newfinish = {
      ...finish,
      taskIds: finishtaskID,
    };

    const newstate = {
      ...state,
      colums: {
        ...state.colums,
        [newstart.id]: newstart,
        [newfinish.id]: newfinish,
      },
    };
    // console.log("Result", results);
    setstate(newstate);
  };
  return (
    <>
      {/* {console.log("state", state)} */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {/* {console.log("task, state", state)} */}
          {state.columOrder.map((columID, index) => {
            const colum = state.colums[columID];
            // console.log("colum,index", colum, index);
            const tasks = colum.taskIds.map((taskIds) => state.tasks[taskIds]);

            // console.log("task", tasks);
            return (
              <Column key={colum.id} column={colum} tasks={tasks}></Column>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};
export default LayoutDND;
