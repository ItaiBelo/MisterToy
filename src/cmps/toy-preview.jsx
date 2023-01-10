import { NavLink } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (

        <article>
            <h4>{toy.name}</h4>
            <img className="toy-preview-img" src={require(`../assets/img/${(toy.image) ? toy.image : 1}.png`)} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        </article>
    )
}