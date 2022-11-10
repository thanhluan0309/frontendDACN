import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Column = ({ column, tasks }) => {
  const Container = styled.div`
    margin-right: 11px;
    background-color: #dfe0e4;
    width: 40%;
  `;

  return (
    <>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Container
            className="cssforColumn"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1> {column.title}</h1>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index}></Task>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </>
  );
};
export default Column;
