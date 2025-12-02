import React from "react"

export default function TimeSlotSelector({ timeSlots, selectedTimeSlot, onSelectTimeSlot }) {
  // just a quick formatter, nothing fancy
  function formatTime(str) {
    const d = new Date(str)
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  // only keep available ones
  const available = []
  for (let i = 0; i < timeSlots.length; i++) {
    if (timeSlots[i].available) {
      available.push(timeSlots[i])
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 2: Select a Time Slot
      </h2>

      {available.length === 0 ? (
        <Card className="p-8 text-center text-gray-600">
          No available time slots for this resource
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {available.map((slot) => {
            const isSelected = selectedTimeSlot && selectedTimeSlot.id === slot.id
            let btnClasses = "p-4 rounded-lg border-2 text-left transition-all "
            if (isSelected) {
              btnClasses += "border-blue-600 bg-blue-50"
            } else {
              btnClasses += "border-gray-200 bg-white hover:border-blue-300"
            }

            return (
              <button
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot)}
                className={btnClasses}
              >
                <div className="font-semibold text-gray-900">
                  {formatTime(slot.startTime)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Duration: 1 hour</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
