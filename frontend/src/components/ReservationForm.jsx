import { useState } from "react";
import axios from "axios";
import "./ReservationForm.css";

function ReservationForm({ onReservationAdded, submitted }) {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    date: "2025-12-12",
    time: "18:00",
    guests: "1",
    bookingType: "dining", 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrMsg("");
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/reservations", form);
      onReservationAdded(res.data);

      // reset form manually
      setForm({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "1",
        bookingType: "dining",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrMsg(error.response.data.error);
      } else {
        setErrMsg("Could not create reservation. Is the backend running?");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={submitForm} className="reservation-form">
        <h2>Create a Reservation</h2>

        {errMsg && <div className="error-message">{errMsg}</div>}
        {submitted && <div className="success-message">Reservation created!</div>}

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={form.time}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Guests *</label>
            <select
              id="guests"
              name="guests"
              value={form.guests}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Guest{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bookingType">Booking Type *</label>
            <select
              id="bookingType"
              name="bookingType"
              value={form.bookingType}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="dining">Dining</option>
              <option value="event">Event</option>
              <option value="meeting">Meeting</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Reservation"}
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
