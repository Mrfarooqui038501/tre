import Board from "./Board";

function Boards({ boards, onDelete }) {
  return (
    <>
      {boards.map((board) => (
        <Board key={board.id} board={board} onDelete={onDelete} />
      ))}
    </>
  );
}

export default Boards;