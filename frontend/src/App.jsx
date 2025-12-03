import { useState } from "react"
import ReservationForm from "./components/ReservationForm"
import ReservationList from "./components/ReservationList"
import "./App.css"

function App() {
 const [reservations, setReservations] = useState([])
 const [submitted, setSubmitted] = useState(false)

 const handleReservationAdded = (newRes) => {
   setReservations([...reservations, newRes])
   setSubmitted(true)
   setTimeout(()=> setSubmitted(false), 4000)
 }

 return (
  <div className="app">
   <header className="appheader">
    <h1>Reservation System</h1>
    <p>Book your perfect experience</p>
   </header>

   <main className="appmain">
    <ReservationForm onReservationAdded={handleReservationAdded} submitted={submitted}/>
    {reservations.length > 0 ?
      <ReservationList reservations={reservations}/> : null
    }
   </main>
  </div>
 )
}

export default App
