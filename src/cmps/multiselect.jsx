import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect, useRef, useState } from "react"

export default function MultiSelect({ filterByToEdit, setFilterByToEdit }) {
    const [stock, setStock] = useState(filterByToEdit.stock);

    const handleChangeSelect = (event) => {
        setStock(event.target.value);
        setFilterByToEdit(prevFilterByToEdit => ({
            ...prevFilterByToEdit,
            stock: event.target.value
        }));
    };

    return (
        <div className='filter-multiselect'>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Stock</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={stock}
                    onChange={handleChangeSelect}
                >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={true}>In Stock</MenuItem>
                    <MenuItem value={false}>Sold Out</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}