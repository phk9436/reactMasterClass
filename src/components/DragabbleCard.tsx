import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface props {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface cardProps {
  isDragging: boolean;
}

function DragabbleCard({ toDoId, toDoText, index }: props) {
  return (
    <Draggable draggableId={toDoId.toString()} index={index} key={toDoId}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);

const Card = styled.div<cardProps>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#dfe6e9" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0,0,0,.5)" : "none"};
`;
