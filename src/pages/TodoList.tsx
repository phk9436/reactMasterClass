import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toDoState } from "atoms/atoms";
import BoardComponent from "components/BoardComponent";

function TodoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((state) => {
        const oldArr = [...state[source.droppableId]];
        oldArr.splice(source.index, 1);
        oldArr.splice(destination.index, 0, draggableId);
        return {
          ...state,
          [source.droppableId]: oldArr,
        };
      });
    } else {
      setToDos((state) => {
        const sourceArr = [...state[source.droppableId]];
        const destinationArr = [...state[destination.droppableId]];
        sourceArr.splice(source.index, 1);
        destinationArr.splice(destination.index, 0, draggableId);
        return {
          ...state,
          [source.droppableId]: sourceArr,
          [destination.droppableId]: destinationArr,
        };
      });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((e) => {
              return <BoardComponent toDos={toDos[e]} boardId={e} key={e} />;
            })}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default TodoList;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
