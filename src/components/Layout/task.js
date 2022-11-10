import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Container = styled.div`
  padding: 30px;
  border: solid 2px;
  display: flex;
  background-color: ${(props) => (props.isDragging ? "blue" : "white")};
`;
const Handle = styled.div`
  background-color: orange;
  width: 43px;
  height: 28px;
  border-radius: 13px;
  margin-right: 20px;
`;

const Task = ({ task, index }) => {
  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provider, snapshot) => (
          <Container
            {...provider.draggableProps}
            isDragging={snapshot.isDragging}
            ref={provider.innerRef}
          >
            <Handle {...provider.dragHandleProps}></Handle>
            {task.content}
          </Container>
        )}
      </Draggable>
    </>
  );
};
export default Task;
