import React from "react"
import { Link, useSearchParams } from "react-router-dom"


export default function cars() {
    const[searchParams, setSearchParams] = useSearchParams()
    const[cars, setCars] = React.useState([])

    const typeFilter = searchParams.get("type")
    console.log(typeFilter)

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
        <Link to= {`/cars/${car.id}`} 
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

    return (
        <div className="car-list-container">
            <h1>Explore our car options</h1>
            <div className="car-list-filter-buttons">
                <Link 
                    to="?type=simple"
                    className="car-type simple"
                >Simple</Link>
                <Link 
                    to="?type=luxury"
                    className="car-type luxury"
                >Luxury</Link>
                <Link 
                    to="?type=rugged"
                    className="car-type rugged"
                >Rugged</Link>
                <Link 
                    to="."
                    className="car-type clear-filters"
                >Clear filter</Link>
            
            </div>
        <div className="car-list">
            {carElements}
        </div>
    </div>

        )
}