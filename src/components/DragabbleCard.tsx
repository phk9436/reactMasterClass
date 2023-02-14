import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface props {
  data: string;
  index: number;
}

interface cardProps {
  isDragging: boolean;
}

function DragabbleCard({ data, index }: props) {
  return (
    <Draggable draggableId={data} index={index} key={data}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {data}
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
    props.isDragging ? "0 2px 5px rgba(0,0,0,.5)": "none"};
`;
