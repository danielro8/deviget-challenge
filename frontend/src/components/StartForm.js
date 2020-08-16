import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../css/StartForm.css'
import {
    nestedArray,
    populateNestedArray,
    valsAdjacentCounts
  } from "../helpers";
import {start_game} from '../actions';
import Map from './Map'

const StartForm = () => {
    const dispatch = useDispatch()
    const rows = useSelector(state => state.game.rows)
    const cols = useSelector(state => state.game.cols)
    const bombCount = useSelector(state => state.game.bombCount)
    const [selectedRows, setSelectedRows] = useState(rows)
    const [selectedCols, setSelectedCols] = useState(cols)
    const [selectedBombCount, setSelectedBombCount] = useState(bombCount)
    const [showMap, setShowMap] = useState(false)
    
    const handleChange = (e, setElement) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setElement(e.target.value)
        }
    } 
    const handleStartGame = async (e) =>{
        await dispatch(start_game({rows: selectedRows, cols: selectedCols, bombCount: selectedBombCount, map: valsAdjacentCounts(
            populateNestedArray(nestedArray(selectedRows, selectedCols), "☀", selectedBombCount),
            "☀"
          )}))
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