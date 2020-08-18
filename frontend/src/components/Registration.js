import React, { useState } from 'react'
import { post } from '../api'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../actions';
import setAuthorizationToken from '../helpers/setAuthorizationToken';
import Cookies from 'universal-cookie';

const Registration = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistered, setIsRegistered] = useState(false)
    const handleChange = (e, setElement) => {
        setElement(e.target.value)
    }

    const onSubmit = async e => {
        e.preventDefault();
       if (password !== confirmPassword){
            alert('Password and Confirm Password have to be equal')
            return
        }
        const body = {
            name,
            email,
            password
        }
        try {
            const rta = await post('users', body)
            await dispatch(login({user: rta.user}))
            const cookies = new Cookies();
            cookies.set('devigetToken', JSON.stringify({token: rta.token}))
            setAuthorizationToken(rta.token)
            setIsRegistered(true)
            //window.location.href = "/";

        } catch (err) {
            alert('Email is already registered')
            console.log(err)
        }
    }
    if(isRegistered){
        return <Redirect to="/" />
    }
    return (
        <div className="container register-form">
            <div className="form">
                <div className="note">
                    <h1>Register your account here.</h1>
                </div>
                <form onSubmit={onSubmit}>
                <div className="form-content">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="name *" value={name} onChange={(e) => handleChange(e, setName)} required />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="email *" value={email} onChange={(e) => handleChange(e, setEmail)} required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Password *" value={password} onChange={(e) => handleChange(e, setPassword)} minLength="7" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Confirm Password *" value={confirmPassword} onChange={(e) => handleChange(e, setConfirmPassword)} minLength="7" required />
                    </div>
                </div>
                <button /*onClick={handleRegistration}*/ className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default Registration;