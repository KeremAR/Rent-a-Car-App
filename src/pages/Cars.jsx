import React from "react"
import { Link } from "react-router-dom"


export default function cars() {
    const[cars, setCars] = React.useState([])
    React.useEffect(() => {
        fetch("/api/cars")
        .then(res => res.json())
        .then(data => setCars(data.cars))
    }, [])

    const carElements = cars.map(car => (
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
        <div className="car-list">
            {carElements}
        </div>
    </div>

        )
}