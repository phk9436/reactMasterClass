import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { ItoDo, toDoState } from "atoms/atoms";
import { useSetRecoilState } from "recoil";

interface props {
  toDos: ItoDo[];
  boardId: string;
}

interface boardProps {
  isDraggingOver: boolean;
  isDraggingFromThis: string | undefined;
}

interface form {
  toDo: string;
}

function BoardComponent({ toDos, boardId }: props) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<form>();
  const onValid = (data: form) => {
    setToDos((state) => {
      const newToDo = {
        id: Math.floor(Math.random() * 1000 + 1),
        text: data.toDo,
      };
      return {
        ...state,
        [boardId]: [...state[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

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
            <form onSubmit={handleSubmit(onValid)}>
              <input
                type="text"
                placeholder={`add task on ${boardId}`}
                {...register("toDo", { required: true })}
              />
            </form>
            {toDos.map((e, i) => (
              <DragabbleCard
                toDoId={e.id}
                toDoText={e.text}
                index={i}
                key={e.id}
              />
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
      ? "#74b9ff"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  transition: 0.3s;

  h1 {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 14px;
  }

  input {
    width: 100%;
    height: 30px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
