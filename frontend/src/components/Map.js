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


const Map = () => {
    /*const rows = useSelector(state => state.game.rows)
    const cols = useSelector(state => state.game.cols)
    const bombCount = useSelector(state => state.game.bombCount)*/
    const map = useSelector(state => state.game.map)
    //const cellsClicked = useSelector(state => state.game.cellsClicked)
    
    return (
        <div className="container" style={{overflowX: "auto"}}>
            <table className="map">
                <tbody>
                    {map.map((item, row) => {
                        return (
                            <tr key={row} className="mapRow">
                                {item.map((subitem, col) => {
                                    return (
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
