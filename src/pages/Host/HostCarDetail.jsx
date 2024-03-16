import React from "react"
import {useParams, Link, Outlet, NavLink} from "react-router-dom"
import { getCar } from "/src/api"

export default function HostCarDetail() {
    const { id } = useParams()
    const [currentCar, setCurrentCar] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    React.useEffect(() => {
        async function loadCars() {
            setLoading(true)
            try {
                const data = await getCar(id)
                setCurrentCar(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCars()
    }, [id])
    
    if (!currentCar) {
        return <h1>Loading...</h1>
    }
    return (
        <section>
        <Link
            to=".."
            relative = "path" // relative to path not route otherwise ../cars
            className="back-button"
        >&larr; <span>Back to all cars</span></Link>

        <div className="host-car-detail-layout-container">
            <div className="host-car-detail">
                <img src={currentCar.imageUrl} />
                <div className="host-car-detail-info-text">
                    <i
                        className={`car-type car-type-${currentCar.type}`}
                    >
                        {currentCar.type}
                    </i>
                    <h3>{currentCar.name}</h3>
                    <h4>${currentCar.price}/day</h4>
                </div>
            </div>
            <nav className="host-car-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}

                    >
                        Details
                    </NavLink>
                    
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}

                    >
                        Pricing
                    </NavLink>
                    
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}

                    >
                        Photos
                    </NavLink>
                    
                </nav>

            <Outlet context ={{currentCar}}/>
        </div>
    </section>
    )
}