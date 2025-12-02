import React from "react"

export default function ConfirmationModel(props) {
  const resource = props.resource;
  const timeSlot = props.timeSlot;
  const onClose = props.onClose;

  function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true 
    });
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        width: "300px",
        textAlign: "center"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#d1fae5",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto 10px auto"
        }}>
          <svg width="24" height="24" fill="none" stroke="green" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Reservation Confirmed!</h3>
        <p style={{ color: "#4B5563", marginBottom: "15px" }}>Your booking has been successfully created</p>

        {resource && timeSlot ? (
          <div style={{ backgroundColor: "#f9fafb", padding: "10px", borderRadius: "5px", marginBottom: "15px", textAlign: "left" }}>
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280" }}>Resource</p>
              <p style={{ fontWeight: "bold" }}>{resource.name}</p>
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280" }}>Date & Time</p>
              <p style={{ fontWeight: "bold" }}>{formatTime(timeSlot.startTime)}</p>
            </div>
          </div>
        ) : null}

        <button 
          onClick={onClose} 
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
