import { useState } from "react"

export default function ReservationForm({ resource, timeSlot, onSubmit }) {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    numberOfGuests: 1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // more junior-ish formatting, not extracted or elegant
  const formatTime = (time) => {
    const d = new Date(time)
    return (
      d.toDateString() +
      " " +
      d.getHours() +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    )
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: name === "numberOfGuests" ? parseInt(value) : value,
    })

    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err?.message || "Something went wrong.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="bg-white border rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Step 3: Complete Your Reservation</h2>

      <div className="bg-gray-100 p-3 border rounded mb-4">
        <div className="mb-3">
          <p className="text-xs text-gray-600">Resource</p>
          <p className="font-medium">{resource.name}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-600">Time</p>
          <p className="font-medium">{formatTime(timeSlot.startTime)}</p>
        </div>

        <div>
          <p className="text-xs text-gray-600">Capacity</p>
          <p className="text-sm">Up to {resource.maxCapacity} guests</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded text-sm mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="text-sm block mb-1">Full Name</label>
          <input
            name="guestName"
            type="text"
            className="w-full border p-2 rounded"
            value={formData.guestName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-sm block mb-1">Email Address</label>
          <input
            name="guestEmail"
            type="email"
            className="w-full border p-2 rounded"
            value={formData.guestEmail}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-sm block mb-1">Phone Number</label>
          <input
            name="guestPhone"
            type="tel"
            className="w-full border p-2 rounded"
            value={formData.guestPhone}
            onChange={handleChange}
            placeholder="000 000 0000"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">Number of Guests</label>
          <select
            name="numberOfGuests"
            className="w-full border p-2 rounded"
            value={formData.numberOfGuests}
            onChange={handleChange}
          >
            {Array(resource.maxCapacity)
              .fill(0)
              .map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2"
        >
          {isSubmitting ? "Booking..." : "Complete Booking"}
        </Button>
      </form>
    </div>
  )
}
