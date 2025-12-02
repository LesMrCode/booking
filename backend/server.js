import express from "express"
import cors from "cors"
import { getResources } from "./routes/resources.js"
import { getTimeSlots, getAvailableSlots } from "./routes/timeSlots.js"
import { createReservation, getAllReservations, getReservationById, updateReservation } from "./routes/reservations.js"

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Resources routes
app.get("/api/resources", getResources)

// Time slots routes
app.get("/api/time-slots", getTimeSlots)
app.get("/api/resources/:resourceId/available-slots", getAvailableSlots)

// Reservations routes
app.post("/api/reservations", createReservation)
app.get("/api/reservations", getAllReservations)
app.get("/api/reservations/:id", getReservationById)
app.patch("/api/reservations/:id", updateReservation)

// Error handling middleware
app.use((err, req, res) => {
  console.error(err)
  res.status(500).json({
    error: "Internal server error",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
