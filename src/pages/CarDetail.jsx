import React from "react"
import { useParams } from "react-router-dom"


export default function carDetail() {
    const params = useParams()
    const [car, setCar] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/cars/${params.id}`)
        .then(res => res.json())
        .then(data => setCar(data.cars))
    },[params.id])
    return (
    <div className="car-detail-container">
        <Link
            to=".."
            relative = "path" // relative to path not route otherwise ../cars
            className="back-button"
        >&larr; <span>Back to all cars</span></Link>
    {car ? (
        <div className="car-detail">
            <img src={car.imageUrl} />
            <i className={`car-type ${car.type} selected`}>{car.type}</i>
            <h2>{car.name}</h2>
            <p className="car-price"><span>${car.price}</span>/day</p>
            <p>{car.description}</p>
            <button className="link-button">Rent this car</button>
        </div>
    ) : <h2>Loading...</h2>}
</div>
    )
}