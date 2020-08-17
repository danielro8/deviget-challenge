import React from 'react'
import { NavLink } from 'react-router-dom'; 

const InitForm = () => {
    return (
        <div className="container text-center">
            <div className="row">
                <NavLink to="/start-game" activeClassName="is-active" className="btn btn-primary" exact={true}>Start Game</NavLink>
            </div>
            <br/>
            <div className="row">
                <NavLink to="/resume-game" activeClassName="is-active" className="btn btn-primary" exact={true}>Resume Game</NavLink>
            </div>
            <br />
        </div>
    )
}

export default InitForm;