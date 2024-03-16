import React from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { getCar } from "/src/api"


export default function carDetail() {
    const {id} = useParams()
    const location = useLocation()
    const [car, setCar] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadCars() {
            setLoading(true)
            try {
                const data = await getCar(id)
                setCar(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadCars()
    }, [id])

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