import React from "react"
import {Outlet} from "react-router-dom"
import Header from "/src/components/Header"

export default function Layout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    )
}