import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";

interface props {
  toDos: string[];
  boardId: string;
}

interface boardProps{
  isDraggingOver: boolean;
  isDraggingFromThis: string | undefined;
}

function BoardComponent({ toDos, boardId }: props) {
  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            isDraggingFromThis={snapshot.draggingFromThisWith}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1>{boardId}</h1>
            {toDos.map((e, i) => (
              <DragabbleCard data={e} index={i} key={e} />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </>
  );
}

export default React.memo(BoardComponent);

const Board = styled.div<boardProps>`
  padding: 20px 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#74b9ff'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  transition: .3s;

  h1 {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 14px;
  }
`;
