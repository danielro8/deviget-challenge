import React from 'react'
import './Game.css'
import StartForm from './StartForm'
import { useDispatch } from 'react-redux'
import { init } from '../actions';

const Game = () => {
  const dispatch = useDispatch()
  dispatch(init())
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron">
            <h1 className="text-center">DEVIGET CHALLENGE MINESWEEPER</h1>
          </div>
          <StartForm />
          <footer>
            <div className="footer-copyright text-center py-3">
              © 2020 Copyright Daniel Rodríguez López Serra
  </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Game;
