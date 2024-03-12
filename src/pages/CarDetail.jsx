import React from "react"
import { useParams, Link, useLocation } from "react-router-dom"


export default function carDetail() {
    const params = useParams()
    const location = useLocation()
    console.log(location)
    const [car, setCar] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/cars/${params.id}`)
        .then(res => res.json())
        .then(data => setCar(data.cars))
    },[params.id])

    const search = location.state?.search || ""
    const type = location.state?.type || "all"


    return (
    <div className="car-detail-container">
        <Link
            to={`..${search}`}
            relative = "path" // relative to path not route otherwise ../cars
            className="back-button"
        >&larr; <span>Back to {type} cars</span></Link>
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