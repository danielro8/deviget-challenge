import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import classNames from "classnames";
import { cell_click } from '../actions';

const Cell = ({ row, column, value }) => {
  let endMineSweeperGame = false;
  const dispatch = useDispatch()
  const rows = useSelector(state => state.game.rows)
  const cols = useSelector(state => state.game.cols)
  const bombCount = useSelector(state => state.game.bombCount)
  const cellsClicked = useSelector(state => state.game.cellsClicked)
  const [clicked, setClicked] = useState(false);
  const [flag, setFlag] = useState("");
  const recursionClick = (target, row, column) => {
    target.id = `${row}_${column}_`;
    let rowList = [row - 1, row, row + 1];
    let colList = [column - 1, column, column + 1];
    for (let i of rowList) {
      for (let j of colList) {
        setImmediate(() => {
          if (document.getElementById(`${i}_${j}`))
            document.getElementById(`${i}_${j}`).click();
        });
      }
    }
    return;
  }
  
  const endGame = (target) => {
    endMineSweeperGame = true;
    target.style.backgroundColor = "black";
    let cols = target.parentElement.children.length;
    let rows = target.parentElement.parentElement.children.length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      }
    }
    return;
  }
  const handleClick = ({ target }) => {
    if (!flag) setClicked(true);
    if (!clicked) incCellsClicked();
    if (!endMineSweeperGame) {
      // Empty cell click --> recursion
      if (value === "" && target.id === `${row}_${column}`){
        recursionClick(target, row, column);
      }
      //click bomb scenario --> end game
      if (value === "☀" && !flag) endGame(target);
    }
  }
  const incCellsClicked = async() => {
    console.log('CellsCLicked', cellsClicked);
    let safeCells = rows * cols - bombCount;
    await dispatch(cell_click({ cellsClicked }))
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
  }
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (!clicked)
      flag ? setFlag("") : setFlag("⚑");
  }
  let cellsClass = classNames({
    cell: true,
    clicked,
    bomb: value === "☀"
  });
  return (
    <td
      id={`${row}_${column}`}
      className={cellsClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {clicked && !flag ? value : ""}
      {flag}
    </td>
  );
}

export default Cell;
