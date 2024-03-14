// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export async function getCars(id) {
    const url = id ? `/api/cars/${id}` : "/api/cars"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch cars",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.cars
}

export async function getHostCars(id) {
    const url = id ? `/api/host/cars/${id}` : "/api/host/cars"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch cars",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.cars
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}