// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/user.reducer.js'
import { TOGGLE_CART_SHOWN } from '../store/toy.reducer.js'
import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import logoUrl from '../assets/img/logo.png'


export function AppHeader() {

    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_SHOWN })
    }

    return (
        <header className="app-header">
            <img src={logoUrl} />
            <div className='header-content'>

                <nav className='header-nav'>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy">Toys</NavLink> |
                    <NavLink to="/about">About</NavLink> |
                    <a href="#" onClick={onToggleCart}>
                        🛒 Cart
                    </a>
                </nav>

                {user && <section className="user-info">
                    <p>{user.fullname} <span>${user.score.toLocaleString()}</span></p>
                    <button onClick={onLogout}>Logout</button>
                </section>}

                {!user && <section className="user-info">
                    <LoginSignup setUser={setUser} />
                </section>}

            </div>
        </header>
    )
}

