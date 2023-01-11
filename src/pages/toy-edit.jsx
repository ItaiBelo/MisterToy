
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ToyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const theme = createTheme();

function getEmptyToy() {
    return {
        name: '',
        price: '',
    }
}

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(ToyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
        console.log(toyToEdit)
    }, [])

    function loadToy() {
        ToyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toys details', err)
                navigate('/toy')
            })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        ToyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        console.log(field, 'field', value, 'value')
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ModeEditRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit the toy
                    </Typography>
                    <Box component="form" onSubmit={onSaveToy} noValidate sx={{ mt: 1 }}>
                        <TextField
                            value={toyToEdit.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            // label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            value={toyToEdit.price}
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            // label="Price"
                            type="number"
                            id="price"
                            autoComplete="current-price"
                            onChange={handleChange}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}