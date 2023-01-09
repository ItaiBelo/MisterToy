import { useNavigate } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, addToCart }) {
    const navigate = useNavigate()
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <button onClick={() => { navigate(`/edit/${toy._id}`) }}>Edit</button>
                    <button onClick={() => { navigate(`/details/${toy._id}`) }}>details</button>
                </div>

                <button className="buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button>
            </li>)}
    </ul>
}