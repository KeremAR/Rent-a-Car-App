import { initializeApp } from "firebase/app";
import {getFirestore, 
    collection, 
    doc, 
    getDoc, 
    where, 
    query, 
    getDocs, documentId
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCRfPEJ6naMLTiyLYAUPV_I2Bs2jnGgIHE",
  authDomain: "rent-a-car-kerem.firebaseapp.com",
  projectId: "rent-a-car-kerem",
  storageBucket: "rent-a-car-kerem.appspot.com",
  messagingSenderId: "1023358907200",
  appId: "1:1023358907200:web:4c6808494804f3369000a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const carsCollectionRef = collection(db, "cars")

export async function getCars() {
    const snapshot = await getDocs(carsCollectionRef)
    const cars = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
return cars
}

export async function getCar(id){
   const docRef =  doc(db, "cars", id)
   const snapshot = await getDoc(docRef)
   return{
    ...snapshot.data(),
    id : snapshot.id
   }

}
export async function getHostCars() {
    const q = query(carsCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const cars = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return cars
}

// export async function getHostCars(id) {
//     const url = id ? `/api/host/cars/${id}` : "/api/host/cars"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch cars",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.cars
// }

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