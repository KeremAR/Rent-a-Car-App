import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCarInfo() {
    const { currentCar} = useOutletContext()
    return (
        <section className="host-Car-detail-info">
        <h4>Name: <span>{currentCar.name}</span></h4>
        <h4>Category: <span>{currentCar.type}</span></h4>
        <h4>Description: <span>{currentCar.description}</span></h4>
        <h4>Visibility: <span>Public</span></h4>
    </section>
    )
}