import React, { useState } from 'react'
import { post } from '../api'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../actions';
import setAuthorizationToken from '../helpers/setAuthorizationToken';
import Cookies from 'universal-cookie';

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    const handleChange = (e, setElement) => {
        setElement(e.target.value)
    }
    const onSubmit = async e => {
        e.preventDefault();
        const body = {
            email,
            password
        }
        try {
            const rta = await post('users/login', body)
            await dispatch(login({user: rta.user}))
            const cookies = new Cookies();
            cookies.set('devigetToken', JSON.stringify({token: rta.token}), {maxAge: 604800})
            setAuthorizationToken(rta.token)
            setIsLogged(true)

        } catch (err) {
            alert('Incorrect login. Try again please.')
            console.log(err)
        }
    }
    if(isLogged){
        return <Redirect to="/" />
    }
    return (
        <div className="container">

            <div class="login-form">
                <form onSubmit={onSubmit}>
                    <h2 class="text-center">Log in</h2>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="email" onChange={(e) => handleChange(e, setEmail)} required="required" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Password" onChange={(e) => handleChange(e, setPassword)} required="required" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">Log in</button>
                    </div>
                    <div class="clearfix">
                        <label class="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                        <a href="#" class="float-right">Forgot Password?</a>
                    </div>
                </form>
                <p class="text-center"><a href="#">Create an Account</a></p>
            </div></div>
    )
}
export default Login