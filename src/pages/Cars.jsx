import React from "react"
import { Link, useSearchParams } from "react-router-dom"


export default function cars() {
    const[searchParams, setSearchParams] = useSearchParams()
    const[cars, setCars] = React.useState([])

    const typeFilter = searchParams.get("type")
    console.log(searchParams.toString())

    React.useEffect(() => {
        fetch("/api/cars")
        .then(res => res.json())
        .then(data => setCars(data.cars))
    }, [])

    const displayedCars = typeFilter
    ? cars.filter(car => car.type === typeFilter)
    : cars

    const carElements = displayedCars.map(car => (
        <div key={car.id} className="car-tile">
        <Link to= {car.id} state ={{search: `?${searchParams.toString()}`,
        type : typeFilter
    }}
        aria-label={`View details for ${car.name}, 
        priced at $${car.price} per day`}
        >
        <img src={car.imageUrl} alt={`Image of ${car.name}`}/>
        <div className="car-info">
            <p>{car.name}</p>
            <p>${car.price}<span>/day</span></p>
        </div>
        <i className={`car-type ${car.type} selected`}>{car.type}</i>
        </Link>
    </div>
    ))
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="car-list-container">
            <h1>Explore our car options</h1>
            <div className="car-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={
                        `car-type simple ${typeFilter === "simple" ? "selected" : ""}`
                    }
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={
                        `car-type luxury ${typeFilter === "luxury" ? "selected" : ""}`
                    }
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={
                        `car-type rugged ${typeFilter === "rugged" ? "selected" : ""}`
                    }
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="car-type clear-filters"
                    >Clear filter</button>
                ) : null}

            </div>
            <div className="car-list">
                {carElements}
            </div>
        </div>
    )
}