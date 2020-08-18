import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import '../css/StartForm.css'
import { resume } from '../actions';
import Map from './Map'
import { get } from '../api'
import setAuthorizationToken from '../helpers/setAuthorizationToken';

const ResumeForm = () => {
    const dispatch = useDispatch()
    const [games, setGames] = useState([])
    const [showMap, setShowMap] = useState(false)
    const cookies = new Cookies();
    const cookie = cookies.get('devigetToken')
    useEffect(() => getGames(), [])
    const handleResume = async(game) => {
        console.log('gameeee', game)
        await dispatch(resume({rows: game.rows, cols: game.cols, bombCount: game.bombs, map: game.map
            , playedMap: game.playedMap, timer: game.timer, gameId: game._id, cellsClicked: game.cellsClicked}))
        setShowMap(true);
    }
    if (!cookie) {
        return <Redirect to="/login" />
    } else {
        setAuthorizationToken(cookie.token)
    }
    const getGames = async () => {
        try {
            const games = await get('games/me')
            console.log('games', games.filter((game) => game.state === 'active'));
            setGames(games.filter((game) => game.state === 'active').map((game) => {
                return <li key={game._id} class="list-group-item" style={{color: "blue", fontSize: "18px"}}>
               Updated at {game.updatedAt.substr(0, 10)} Rows {game.rows} Cols {game.cols} Bombs {game.bombs} remaining time {game.timer}
               <br/><button className="btn btn-primary"  onClick={() => handleResume(game)}>Resume</button></li>
            }))
            //await dispatch(get_user({user: user}))
        } catch (err) {
            console.log('err', err)
            alert('Error in getting games. Try again')
            return <Redirect to="/start-game" />
            console.log(err)
        }
    }
    if(!showMap){
    return (
        <div className="container text-center">
         <div className="row">
         <button className="btn btn-primary" onClick={()=> window.location.href="/start-game"}>Start Game</button>
            </div>
            <h1>Available unfinished games</h1>
            <ul class="list-group">
                {games}
            </ul>
        </div>
    )} else{
        return <Map/>
     }

}

export default ResumeForm;