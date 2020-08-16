// @flow

import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { useSelector } from 'react-redux'
import classNames from "classnames";


const Map = () => {
    const map = useSelector(state => state.game.map)
    const playedMap = useSelector(state => state.game.playedMap)
    const gameover = useSelector(state => state.game.gameover)
    const win = useSelector(state => state.game.win)
    const timer = useSelector(state => state.game.timer)
    let [curTimer, setCurTimer] = useState(timer)
    let interval = null
    
    if (!gameover) {
        interval = !gameover ? setTimeout(() => setCurTimer(--curTimer), 1000) : null
    } else if (gameover && interval) {
        clearTimeout(interval)
    }
    return (
        <div className="container" style={{ overflowX: "auto" }}>
            <h1 className="text-center">{curTimer}</h1>
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
                                        clicked: playedMap[row][col].clicked ? true : false,
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
