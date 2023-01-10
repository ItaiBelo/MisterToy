
import { useEffect, useRef, useState } from "react"
import { ToyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import MultiSelect from "./multiselect.jsx"


export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(ToyService.getDefaultFilter())
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log(filterByToEdit, 'from filter')
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toy-filter full main-layout">
        <form className='filter-form' onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />
            <MultiSelect filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />
        </form>

    </section>
}