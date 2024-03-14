import React from "react"
import { Link } from "react-router-dom"
import {getHostCars} from "/src/api"


export default function HostCars() {
    const [cars, setCars] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadCars() {
            setLoading(true)
            try {
                const data = await getHostCars()
                setCars(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadCars()
    }, [])

    const hostCarsEls = cars.map(car => (
        <Link
            to={car.id}
            key={car.id}
            className="host-car-link-wrapper"
        >
            <div className="host-car-single" key={car.id}>
                <img src={car.imageUrl} alt={`Photo of ${car.name}`} />
                <div className="host-car-info">
                    <h3>{car.name}</h3>
                    <p>${car.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    return (
        <section>
            <h1 className="host-cars-title">Your listed cars</h1>
            <div className="host-cars-list">
                {
                    cars.length > 0 ? (
                        <section>
                            {hostCarsEls}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}