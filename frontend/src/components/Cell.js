import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import classNames from "classnames"
import { cell_click, game_over } from '../actions'

const Cell = ({ row, column, value, propClicked }) => {
  let endMineSweeperGame = false
  const dispatch = useDispatch()
  const rows = useSelector(state => state.game.rows)
  const cols = useSelector(state => state.game.cols)
  const bombCount = useSelector(state => state.game.bombCount)
  const cellsClicked = useSelector(state => state.game.cellsClicked)
  const playedMap = useSelector(state => state.game.playedMap)
  const [clicked, setClicked] = useState(propClicked)
  const [flag, setFlag] = useState(value === '⚑' ? '⚑' : '')
  const _PlayedMap = Object.assign(playedMap);
  const recursionClick = (target, row, column) => {
    target.id = `${row}_${column}_`
    let rowList = [row - 1, row, row + 1]
    let colList = [column - 1, column, column + 1]
    for (let i of rowList) {
      for (let j of colList) {
        setImmediate(() => {
          if (document.getElementById(`${i}_${j}`)){
            _PlayedMap[i][j].clicked = true
            _PlayedMap[i][j].value = flag ? flag : value
            document.getElementById(`${i}_${j}`).click()
          }
        })
      }
    }
    return
  }
  
  const endGame = async (target) => {
    endMineSweeperGame = true
    target.style.backgroundColor = "black"
    let cols = target.parentElement.children.length
    let rows = target.parentElement.parentElement.children.length
    await dispatch(game_over({win: false, playedMap: _PlayedMap}))
    return
  }
  const handleClick = async({ target }) => {
    if (!flag) setClicked(true)
    if (!clicked) incCellsClicked()
    if (!endMineSweeperGame) {
      // Empty cell click --> recursion
      _PlayedMap[row][column].clicked = true
      _PlayedMap[row][column].value = flag ? flag : value
      console.log('Enttreeeeee a handleclick', value)
      if (value === "" && target.id === `${row}_${column}`){
        recursionClick(target, row, column)
      }
      //click bomb scenario --> end game
      if (value === "☀" && !flag) {
        console.log('Bomba :(')
        await dispatch(game_over({win: false}))
        //endGame(target)
      }
    }
  }
  const incCellsClicked = async() => {
    let safeCells = rows * cols - bombCount
    console.log('CELLCLISCKED', cellsClicked, 'SAFE CELLS',safeCells)
    await dispatch(cell_click({ cellsClicked }))
    if (cellsClicked >= safeCells) await dispatch(game_over({win: true, playedMap: _PlayedMap}))
  }
  const handleContextMenu = (e) => {
    e.preventDefault()
    if (!clicked){
      flag ? setFlag("") : setFlag("⚑")
      _PlayedMap[row][column].value =  flag ? "" : "⚑"
    }
    }
  let cellsClass = classNames({
    cell: true,
    clicked,
    bomb: value === "☀"
  })
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
  )
}

export default Cell
