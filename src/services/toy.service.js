
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()
export const ToyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&maxPrice=${filterBy.maxPrice}`
    console.log(queryParams)
    return httpService.get(BASE_URL + queryParams)
}

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.name) {
//                 console.log(filterBy)
//                 const regex = new RegExp(filterBy.name, 'i')
//                 toys = toys.filter(toy => regex.test(toy.name))
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys
//         })
// }



function getById(toyId) {
    // console.log(toyId)
    return httpService.get(BASE_URL + toyId)
    // return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    console.log(BASE_URL + toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    console.log(toy._id)
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}

// function save(toy) {
//     if (toy._id) {
//         console.log('storageService put')
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         console.log('storageService post')
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

function getDefaultFilter() {
    return { name: '', maxPrice: 0 }
}
function getEmptyToy() {
    return {
        vendor: '',
        price: 0,
    }
}
function _getRandomLabels(n) {
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    const randomLabels = []
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * labels.length)
        randomLabels.push(labels[randomIndex])
    }
    console.log(randomLabels)
    return randomLabels
}

function getRandomToy() {
    return {
        name: 'Toy' + utilService.getRandomIntInclusive(1, 200),
        price: utilService.getRandomIntInclusive(1, 200),
        labels: _getRandomLabels(utilService.getRandomIntInclusive(1, 5)),
        createdAt: Date.now(),
        inStock: true,
        image: utilService.getRandomIntInclusive(1, 15)
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [

            {
                _id: "t101",
                name: "Talking Doll",
                price: 123,
                labels: ["Doll", "Battery Powered", "Baby"],
                createdAt: 1631031801011,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)

            },
            {
                _id: "t102",
                name: "Remote Control Car",
                price: 30,
                labels: ["On wheels", "Battery Powered"],
                createdAt: 1630764800000,
                inStock: false,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t103",
                name: "Lego Set",
                price: 50,
                labels: ["Box game"],
                createdAt: 1631138400000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t104",
                name: "Watercolor Set",
                price: 15,
                labels: ["Art"],
                createdAt: 1630976000000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t105",
                name: "Play Kitchen",
                price: 80,
                labels: ["Baby"],
                createdAt: 1631343600000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t106",
                name: "Barbie Doll",
                price: 20,
                labels: ["Doll"],
                createdAt: 1631107200000,
                inStock: false,
                image: utilService.getRandomIntInclusive(1, 15)

            },
            {
                _id: "t107",
                name: "Jigsaw Puzzle",
                price: 10,
                labels: ["Puzzle"],
                createdAt: 1631223600000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t108",
                name: "Trampoline",
                price: 100,
                labels: ["Outdoor"],
                createdAt: 1630882800000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t109",
                name: "Ride-On Toy",
                price: 60,
                labels: ["On wheels", "Battery Powered", "Outdoor"],
                createdAt: 1631016400000,
                inStock: false,
                image: utilService.getRandomIntInclusive(1, 15)
            },
            {
                _id: "t110",
                name: "Teddy Bear",
                price: 15,
                labels: ["Doll", "Baby"],
                createdAt: 1630976000000,
                inStock: true,
                image: utilService.getRandomIntInclusive(1, 15)
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


