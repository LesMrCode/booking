
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage
const reservations = [];
let reservationId = 1;

// Get all reservations
app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

// Get a single reservation by ID
app.get("/api/reservations/:id", (req, res) => {
  const reservation = reservations.find(
    (r) => r.id === Number.parseInt(req.params.id)
  );

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  res.json(reservation);
});

// Create a new reservation
app.post("/api/reservations", (req, res) => {
  const { name, email, date, time, guests, bookingType } = req.body;

  // Validation
  if (!name || !email || !date || !time || !guests || !bookingType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Create new reservation
  const newReservation = {
    id: reservationId++,
    name,
    email,
    date,
    time,
    guests: Number.parseInt(guests),
    bookingType,
    createdAt: new Date().toISOString(),
  };

  reservations.push(newReservation);

  res.status(201).json(newReservation);
});

// Update a reservation
app.put("/api/reservations/:id", (req, res) => {
  const reservation = reservations.find(
    (r) => r.id === Number.parseInt(req.params.id)
  );

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  // Update fields if provided
  if (req.body.name) reservation.name = req.body.name;
  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    reservation.email = req.body.email;
  }
  if (req.body.date) reservation.date = req.body.date;
  if (req.body.time) reservation.time = req.body.time;
  if (req.body.guests) reservation.guests = Number.parseInt(req.body.guests);
  if (req.body.bookingType) reservation.bookingType = req.body.bookingType;

  res.json(reservation);
});

// Delete a reservation
app.delete("/api/reservations/:id", (req, res) => {
  const index = reservations.findIndex(
    (r) => r.id === Number.parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  const deletedReservation = reservations.splice(index, 1);
  res.json({ message: "Reservation deleted", reservation: deletedReservation[0] });
});


app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Reservation API server running on https://booking-1-4ont.onrender.com`);
  console.log("Endpoints:");
  console.log(`  GET    /api/reservations`);
  console.log(`  GET    /api/reservations/:id`);
  console.log(`  POST   /api/reservations`);
  console.log(`  PUT    /api/reservations/:id`);
  console.log(`  DELETE /api/reservations/:id`);
  console.log(`  GET    /api/health`);
});
