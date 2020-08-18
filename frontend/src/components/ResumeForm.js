import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import '../css/StartForm.css'
import { get_user } from '../actions';
import Map from './Map'
import { get } from '../api'
import setAuthorizationToken from '../helpers/setAuthorizationToken';


const ResumeForm = () => {
    const dispatch = useDispatch()
    const [games, setGames] = useState([])
    const [resume, setResume] = useState(false)
    const cookies = new Cookies();
    const cookie = cookies.get('devigetToken')
    useEffect(() => getGames(), [])
    const handleResume = (gameId) => {
    }
    if (!cookie) {
        return <Redirect to="/login" />
    } else {
        setAuthorizationToken(cookie.token)
    }
    const getGames = async () => {
        try {
            const games = await get('games/me')
            console.log('games', games);
            setGames(games.map((game) => {
                return <li key={game._id} class="list-group-item">
               Updated at {game.updatedAt.substr(0, 10)} Rows {game.rows} Cols {game.cols} Bombs {game.bombs} remaining time {game.timer}
               <br/><button className="btn btn-primary"  onClick={() => handleResume(game._id)}>Resume</button></li>
            }))
            //await dispatch(get_user({user: user}))
        } catch (err) {
            console.log('err', err)
            alert('Error in getting games. Try again')
            return <Redirect to="/start-game" />
            console.log(err)
        }
    }

    return (
        <div className="container text-center">
            <h1>Available unfinished games</h1>
            <ul class="list-group">
                {games}
            </ul>
        </div>
    )

}

export default ResumeForm;