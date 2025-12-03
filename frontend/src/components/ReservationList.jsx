import "./ReservationList.css"

function ReservationList({ reservations }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="list-container">
      <h2>Recent Reservations</h2>
      <div className="reservations-list">
        {reservations.map((reservation, index) => (
          <div key={reservation.id || index} className="reservation-card">
            <div className="card-header">
              <h3>{reservation.name}</h3>
              <span className={`badge badge-${reservation.bookingType}`}>{reservation.bookingType}</span>
            </div>

            <div className="card-details">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{reservation.email}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Date</span>
                <span className="detail-value">{formatDate(reservation.date)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Time</span>
                <span className="detail-value">{reservation.time}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Guests</span>
                <span className="detail-value">{reservation.guests}</span>
              </div>
            </div>

            <div className="card-footer">
              <small>ID: {reservation.id}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReservationList
