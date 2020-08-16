import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../css/StartForm.css'

const StartForm = () => {

    const rows = useSelector(state => state.game.rows)
    const cols = useSelector(state => state.game.cols)
    const bombCount = useSelector(state => state.game.bombCount)
    const [row, setRow] = useState(rows)
    const [col, setCol] = useState(cols)
    const [mine, setMine] = useState(bombCount)
    
    const handleChange = (e, setElement) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            setElement(e.target.value)
        }
    } 
    return (
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Rows</label>
                <input type="number" className="form-control" value={row} min="0" step="1" onChange={(e) => handleChange(e, setRow)}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Cols</label>
                <input type="number" className="form-control" value={col} min="0" step="1" onChange={(e) => handleChange(e, setCol)} />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mines</label>
                <input type="number" className="form-control"value={mine} min="0" step="1" onChange={(e) => handleChange(e, setMine)} />
            </div>
            <button type="submit" className="btn btn-primary">Start</button>
        </form>
    )
}

export default StartForm;