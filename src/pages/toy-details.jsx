import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { ToyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        ToyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy name : {toy.name}</h1>
        <img className="toy-preview-img" src={require(`../assets/img/${toy.image}.png`)} />
        {/* <img src={`../assets/img/${toy.image}.png`} /> */}
        <h5>Price: ${toy.price}</h5>
        <h6>Labels :{toy.labels}</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </section>
}