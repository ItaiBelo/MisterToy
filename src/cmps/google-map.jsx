import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { utilService } from '../services/util.service'

const PinMarker = ({ text }) => <div>{text}</div>;
const StoreMarker = ({ text }) => <div >{text}</div>;

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = (clickedCoordinates) => {
        centerMapOnStore(clickedCoordinates, stores)
    }

    const centerMapOnStore = (clickedCoordinates, stores) => {
        const { lat: clickedLat, lng: clickedLng } = clickedCoordinates;

        for (let i = 0; i < stores.length; i++) {
            const { lat, lng } = stores[i]

            if (Math.abs(clickedLat - lat) <= 0.1 && Math.abs(clickedLng - lng) <= 0.1) {
                setCoordinates({ lat, lng })
                return;
            }
        }
    }

    const stores = [
        {
            lat: 32.0853,
            lng: 34.7818
        },
        {
            lat: 32.0553,
            lng: 34.7818
        },
        {
            lat: 32.0753,
            lng: 34.7618
        }
    ]

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '90%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "" }}
                // defaultCenter={coordinates}
                center={coordinates}
                text="🍎🍎🍎"
                defaultZoom={zoom}
            >
                {
                    stores.map(store => (
                        <StoreMarker key={utilService.getRandomIntInclusive(1, 10000)}
                            lat={store.lat}
                            lng={store.lng}
                            text={zoom <= 14 ? "🏪" : ""}
                        />
                    ))
                }
            </GoogleMapReact>
            <PinMarker>
            </PinMarker>
        </div>
    );
}
