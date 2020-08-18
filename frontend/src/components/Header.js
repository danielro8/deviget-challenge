import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { get } from '../api'
import { get_user, logout} from '../actions';
import {Redirect} from 'react-router-dom'
import setAuthorizationToken from '../helpers/setAuthorizationToken';
import Cookies from 'universal-cookie';

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.game.user)
  const cookies = new Cookies();
  const getUser = async() => {
    try {
        const user = await get('users/me')
        console.log('user', user);
        await dispatch(get_user({user: user}))
    } catch (err) {
        console.log('err', err)
        alert('Error in getting user. Try again')
        return <Redirect to="/" />
        console.log(err)
    }
  }
  const cookie = cookies.get('devigetToken')
  useEffect(()=> {
    if(cookie) {
      return getUser()
    }
    return () =>{} 
  }, [])   
  if (cookie) {
      setAuthorizationToken(cookie.token)
  }
  const handleLogout = async () => {
    setAuthorizationToken(null)
    cookies.remove('devigetToken')
    await dispatch(logout())
    window.location.href = '/'
  }
  return (
    <header>
      <div className="jumbotron">
        <h1 className="text-center">DEVIGET CHALLENGE MINESWEEPER</h1>
        {cookie && <h4 className="text-center">Welcome {user ? user.name : ''}</h4>}
        {cookie && <h4 className="text-center"><a  onClick={handleLogout}>Logout</a></h4>}
      </div>
    </header>
  );
}


export default Header;