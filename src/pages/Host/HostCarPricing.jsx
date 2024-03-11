import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCarPricing() {
    const { currentCar } = useOutletContext()
    return (
        <h3 className="host-car-price">${currentCar.price}<span>/day</span></h3>
    )
}