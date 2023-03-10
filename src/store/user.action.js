import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { CLEAR_CART, SET_USER, UPDATE_USER_SCORE } from '../store/user.reducer.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {

    console.log(credentials)
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export function checkout(amount) {
    return userService.updateScore(amount)
        .then(newScore => {
            store.dispatch({ type: UPDATE_USER_SCORE, score: newScore })
            store.dispatch({ type: CLEAR_CART })
            return newScore
        })
        .catch(err => {
            console.error('Cannot checkout:', err)
            throw err
        })
}
