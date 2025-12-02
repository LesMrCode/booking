import { getTimeSlotsData } from "./timeSlots.js"

const reservations = []

// Helper function to validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to validate phone
const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone)
}

export const createReservation = (req, res) => {
  const { resourceId, timeSlotId, guestName, guestEmail, guestPhone, numberOfGuests } = req.body
  const resources = [
    { id: "r1", maxCapacity: 20 },
    { id: "r2", maxCapacity: 10 },
    { id: "r3", maxCapacity: 30 },
  ]

  // Validation
  if (!resourceId || !timeSlotId || !guestName || !guestEmail || !numberOfGuests) {
    return res.status(400).json({
      error: "Missing required fields",
    })
  }

  if (!validateEmail(guestEmail)) {
    return res.status(400).json({
      error: "Invalid email address",
    })
  }

  if (!validatePhone(guestPhone)) {
    return res.status(400).json({
      error: "Invalid phone number",
    })
  }

  // Find resource
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return res.status(404).json({
      error: "Resource not found",
    })
  }

  if (numberOfGuests > resource.maxCapacity) {
    return res.status(400).json({
      error: `Cannot exceed maximum capacity of ${resource.maxCapacity}`,
    })
  }

  // Find time slot
  const timeSlots = getTimeSlotsData()
  const timeSlot = timeSlots.find((ts) => ts.id === timeSlotId)
  if (!timeSlot) {
    return res.status(404).json({
      error: "Time slot not found",
    })
  }

  if (!timeSlot.available) {
    return res.status(400).json({
      error: "Time slot is not available",
    })
  }

  // Create reservation
  const reservation = {
    id: `res-${Date.now()}`,
    resourceId,
    timeSlotId,
    guestName,
    guestEmail,
    guestPhone,
    numberOfGuests,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    timeSlot,
    resource,
  }

  timeSlot.available = false
  reservations.push(reservation)

  res.status(201).json(reservation)
}

export const getAllReservations = (req, res) => {
  res.json(reservations)
}

export const getReservationById = (req, res) => {
  const { id } = req.params
  const reservation = reservations.find((r) => r.id === id)

  if (!reservation) {
    return res.status(404).json({
      error: "Reservation not found",
    })
  }

  res.json(reservation)
}

export const updateReservation = (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const reservation = reservations.find((r) => r.id === id)
  if (!reservation) {
    return res.status(404).json({
      error: "Reservation not found",
    })
  }

  if (status === "cancelled") {
    reservation.status = "cancelled"

    const timeSlots = getTimeSlotsData()
    const timeSlot = timeSlots.find((ts) => ts.id === reservation.timeSlotId)
    if (timeSlot) {
      timeSlot.available = true
    }
  }

  res.json(reservation)
}
