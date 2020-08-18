// @flow

import React, { useState, useEffect } from "react"
import Cell from "./Cell";
import { useSelector, useDispatch } from 'react-redux'
import classNames from "classnames";
import { NavLink } from 'react-router-dom';
import { update_timer, game_over } from '../actions'
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'
import { patch } from '../api'

const Map = () => {
    const dispatch = useDispatch()
    const map = useSelector(state => state.game.map)
    const playedMap = useSelector(state => state.game.playedMap)
    const gameover = useSelector(state => state.game.gameover)
    const win = useSelector(state => state.game.win)
    const timer = useSelector(state => state.game.timer)
    const gameId = useSelector(state => state.game.gameId )
    let [curTimer, setCurTimer] = useState(timer)
    let interval = null
    const cookies = new Cookies();
    const cookie = cookies.get('devigetToken')
    if (!cookie) {
        return <Redirect to="/login" />
    }
    const updateTimer = async () => await dispatch(updateTimer({ timer }))
    const updateGameState = async() => {
        const payload = {
            state: win ? 'win' : 'defeat'
        }
        const rta = await patch('games', payload, gameId)
    }
    const finishGame = async () => {
        const payload = {
            state: 'defeat'
        }
        const rta = await patch('games', payload, gameId)
        await dispatch(game_over({win: false, playedMap}))
    }
    const restartBtn = () => <NavLink to="/" activeClassName="is-active" className="btn btn-primary" exact={true}>Restart Game</NavLink>
    const handleSaveClick = async() => {
        try {
            const payload = {
                playedMap,
                timer
            }
            const rta = await patch('games', payload, gameId)
            console.log('saved gameee', rta);
            alert('Game saved!!!')
            //await dispatch(get_user({user: user}))
        } catch (err) {
            console.log('err', err)
            alert('Error in saving game. Try again')
            return <Redirect to="/start-game" />
            console.log(err)
        }
    }
    if (!gameover) {
        if (curTimer === 0) {
            finishGame();
        } else {
            interval = !gameover ? setTimeout(() => setCurTimer(--curTimer) /*updateTimer({timer})*/, 1000) : null
        }
    } else if (gameover && interval) {
        clearTimeout(interval)
    }
    if(gameover){
        updateGameState()
    }
    return (
        <div className="container" style={{ overflowX: "auto", overflowY: "hidden" }}>
            <table className="map">
                {!gameover && <caption className="timer">{curTimer}{restartBtn()} <button className="btn btn-primary" onClick={handleSaveClick}>Save</button></caption>}
                {gameover && win && <caption className="win">YOU HAVE WON!!!  {restartBtn()}</caption>}
                {gameover && !win && <caption className="defeat">YOU HAVE LOST :( {restartBtn()}</caption>}
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
