// @flow

import React from "react";
import Cell from "./Cell";
/*import {
    nestedArray,
    populateNestedArray,
    valsAdjacentCounts
} from "../helpers";
*/
import { useSelector } from 'react-redux'
import classNames from "classnames";


const Map = () => {
    /*const rows = useSelector(state => state.game.rows)
    const cols = useSelector(state => state.game.cols)
    const bombCount = useSelector(state => state.game.bombCount)*/
    const map = useSelector(state => state.game.map)
    const gameover = useSelector(state => state.game.gameover)
    const win = useSelector(state => state.game.win)
    console.log('GAMEOVER WIN', gameover, win)
    //const cellsClicked = useSelector(state => state.game.cellsClicked)
    return (
        <div className="container" style={{ overflowX: "auto" }}>
            <table className="map">
            {gameover && win && <caption className="win">YOU HAVE WON!!!</caption>}
            {gameover && !win && <caption className="defeat">YOU HAVE LOST :(</caption>}
                <tbody>
                    {map.map((item, row) => {
                        return (
                            <tr key={row} className="mapRow">
                                {item.map((subitem, col) => {
                                    const cellsClass = classNames({
                                        cell: true,
                                        clicked: true,
                                        bomb: subitem === "☀"
                                      });
                                    return gameover ?
                                        <td
                                            id={`${row}_${col}`}
                                            className={cellsClass}>{subitem}
                                        </td> : (
                                            <Cell
                                                key={col}
                                                row={row}
                                                column={col}
                                                value={subitem}
                                            />
                                        );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Map;
