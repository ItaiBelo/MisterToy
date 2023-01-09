
import { useEffect, useRef, useState } from "react"
import { ToyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export function ToyFilter({ onSetFilter }) {
    const [isRead, setIsRead] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState(ToyService.getDefaultFilter())
    console.log(filterByToEdit, 'from filter')
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
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleLabelChange(ev, value) {
        ev.preventDefault()
        console.log('handleLabelChange called:', value)
        setIsRead(value)
        onSetFilter({ txt: elInputRef.current.value, isRead: value })
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
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
            <div className="dropdown">
                <div className="fa fa-filter select" onClick={toggleDropdown} />dropdown
                <ul
                    className={
                        isDropdownOpen ? 'menu flex active clean-list' : 'menu flex clean-list'
                    }
                >
                    <li onClick={() => handleLabelChange(null)} className="menu-item btn-nav">All</li>
                    <li onClick={() => handleLabelChange(true)} className="menu-item btn-nav">Read</li>
                    <li onClick={() => handleLabelChange(false)} className="menu-item btn-nav">Unread</li>
                </ul>
            </div >
            <button hidden>Filter</button>
        </form>

    </section>
}