import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'
import '../css/StartForm.css'
import {start_game, get_user} from '../actions';
import Map from './Map'
import { get, post } from '../api'
import setAuthorizationToken from '../helpers/setAuthorizationToken';


const StartForm = () => {
    const dispatch = useDispatch()
    const rows = useSelector(state => state.game.rows)
    const cols = useSelector(state => state.game.cols)
    const bombCount = useSelector(state => state.game.bombCount)
    const [selectedRows, setSelectedRows] = useState(rows)
    const [selectedCols, setSelectedCols] = useState(cols)
    const [selectedBombCount, setSelectedBombCount] = useState(bombCount)
    const [showMap, setShowMap] = useState(false)
    const user = useSelector(state => state.game.user)
    const cookies = new Cookies();
    const cookie = cookies.get('devigetToken')
    if (!cookie) {
        return <Redirect to="/login" />
    } else {
        setAuthorizationToken(cookie.token)
    }
    const getUser = async() => {
        try {
            const user = await get('users/me')
            console.log('user', user);
            await dispatch(get_user({user: user}))
        } catch (err) {
            console.log('err', err)
            alert('Error in creating user. Try again')
            return <Redirect to="/start-game" />
            console.log(err)
        }
    } 
    if(!user){
        getUser()
    }
    const handleChange = (e, setElement) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setElement(e.target.value)
        }
    }
    const createGame = async () => {
        try {
            const body = {
                user: user._id,
                rows: selectedRows,
                cols: selectedCols,
                bombs: selectedBombCount,
                timer: 60
            }
            const rta = await post('games', body)
            return rta;
        } catch (err) {
            console.log('err', err)
            alert('Error in creating game. Try again')
            return <Redirect to="/start-game" />
            console.log(err)
        }
    } 
    const handleStartGame = async (e) =>{
          const game = await createGame() 
          await dispatch(start_game({rows: selectedRows, cols: selectedCols, bombCount: selectedBombCount, map: game.game.map
          , playedMap: game.game.playedMap, gameId: game.game._id}))
          setShowMap(true);
       
    }
    if(!showMap){
    return (
        <div className="container">
            <div className="form-group">
                <label>Rows</label>
                <input type="number" className="form-control" value={selectedRows} min="0" step="1" onChange={(e) => handleChange(e, setSelectedRows)}/>
            </div>
            <div className="form-group">
                <label>Cols</label>
                <input type="number" className="form-control" value={selectedCols} min="0" step="1" onChange={(e) => handleChange(e, setSelectedCols)} />
            </div>
            <div className="form-group">
                <label>Mines</label>
                <input type="number" className="form-control"value={selectedBombCount} min="0" step="1" onChange={(e) => handleChange(e, setSelectedBombCount)} />
            </div>
            <button className="btn btn-primary" onClick={handleStartGame}>Start</button>
        </div>
    )} else{
       return <Map/>
    }

}

export default StartForm;