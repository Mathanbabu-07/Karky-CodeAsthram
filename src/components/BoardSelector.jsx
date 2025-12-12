import React from 'react';

export default function BoardSelector({ boards, selectedBoard, onChange }) {
  // BOARDS is an object, so we need to get its values to map over them
  const boardList = Object.values(boards);

  return (
    <div className="board-selector-wrapper">
      <select
        className="board-selector"
        value={selectedBoard}
        onChange={(e) => onChange(e.target.value)}
      >
        {boardList.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>
    </div>
  );
}
