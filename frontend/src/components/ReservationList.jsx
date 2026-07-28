import "./ReservationList.css"

const TYPE_LABELS = {
  dining: "Dining",
  event: "Event",
  meeting: "Meeting",
  wedding: "Wedding",
  other: "Other",
}

// "2026-07-29" is a date-only string; Date() would read it as UTC and shift a
// day in negative-offset timezones, so pin it to local midnight.
const formatDate = (dateStr) =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const initials = (name) =>
  name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase() || "?"

function ReservationList({ reservations }) {
  return (
    <div className="listcontainer">
      <h2>Recent Reservations</h2>
      <div className="reservationslist">
        {reservations.map((reservation, index) => (
          <div key={reservation.id || index} className="reservationcard">
            <div className="cardheader">
              <div className="avatar">{initials(reservation.name)}</div>
              <div className="cardidentity">
                <div className="cardname">{reservation.name}</div>
                <div className="cardemail">{reservation.email}</div>
              </div>
              <div className="typebadge">
                {TYPE_LABELS[reservation.bookingType] || reservation.bookingType}
              </div>
            </div>

            <div className="card-details">
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
                <span className="detail-value">
                  {reservation.guests} guest{Number(reservation.guests) === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReservationList
