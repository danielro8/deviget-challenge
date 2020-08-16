import React from 'react'
import './Game.css'
import StartForm from './StartForm'
import {useSelector, useDispatch} from 'react-redux'
import {init} from '../actions';

const Game = () => {
  const dispatch = useDispatch()
  dispatch(init())
  return (
    <React.Fragment>
      <div class="container-fluid">
        <div class="row">
        <div class="jumbotron">
          <h1 class="text-center">DEVIGET CHALLENGE MINESWEEPER</h1>
        </div>
        <StartForm/>
      </div>
      </div>
    </React.Fragment>
  );
}

export default Game;
