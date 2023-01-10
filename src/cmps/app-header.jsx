import { SET_USER } from '../store/user.reducer.js'
import { TOGGLE_CART_SHOWN } from '../store/toy.reducer.js'
import { logout } from '../store/user.action.js'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import logoUrl from '../assets/img/logo.png'


export function AppHeader() {
    const location = useLocation()

    // TODO: get from storeState
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

    if ((location.pathname.startsWith('/signup')) || (location.pathname.startsWith('/login'))) return
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
                    <NavLink to="/login">login</NavLink>
                </section>}

            </div>
        </header>
    )
}


