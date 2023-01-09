import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { ADD_TO_CART } from '../store/toy.reducer.js'
import { useEffect } from 'react'
import { PopupMenu } from '../cmps/popup-menu.jsx'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const shoppingCart = useSelector((storeState) => storeState.toyModule.shoppingCart)

    // const [toys, setToys] = useState([])
    // const [toyt, setToyt] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                // showSuccessMsg('Cars loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = ToyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.vendor} to Cart`)
        dispatch({ type: ADD_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    function setFilter(filterBy) {
        console.log('setFilter', filterBy)
        onLoadToys(filterBy)

    }

    return <section>
        <h3>Toys App</h3>
        <main>
            <Link to={`/add`}>Add Toy</Link>
            <button onClick={onAddToy}>Add random Toy</button>

            <ToyFilter onSetFilter={setFilter} />
            {isLoading && <p>Loading...</p>}
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                addToCart={addToCart}
            />
            <hr />
            <pre>{JSON.stringify(shoppingCart, null, 2)}</pre>
        </main>
    </section>


}