const timeSlots = [
  {
    id: "ts1",
    resourceId: "r1",
    startTime: "2025-12-02T09:00:00",
    endTime: "2025-12-02T10:00:00",
    available: true,
  },
  {
    id: "ts2",
    resourceId: "r1",
    startTime: "2025-12-02T10:00:00",
    endTime: "2025-12-02T11:00:00",
    available: true,
  },
  {
    id: "ts3",
    resourceId: "r1",
    startTime: "2025-12-02T11:00:00",
    endTime: "2025-12-02T12:00:00",
    available: false,
  },
  {
    id: "ts4",
    resourceId: "r2",
    startTime: "2025-12-02T09:00:00",
    endTime: "2025-12-02T10:00:00",
    available: true,
  },
  {
    id: "ts5",
    resourceId: "r3",
    startTime: "2025-12-02T14:00:00",
    endTime: "2025-12-02T15:00:00",
    available: true,
  },
]

export const getTimeSlots = (req, res) => {
  const { resourceId } = req.query

  if (resourceId) {
    const filtered = timeSlots.filter((slot) => slot.resourceId === resourceId)
    return res.json(filtered)
  }

  res.json(timeSlots)
}

export const getAvailableSlots = (req, res) => {
  const { resourceId } = req.params
  const { date } = req.query

  let filtered = timeSlots.filter((slot) => slot.resourceId === resourceId && slot.available)

  if (date) {
    filtered = filtered.filter((slot) => slot.startTime.startsWith(date))
  }

  res.json(filtered)
}

export const getTimeSlotsData = () => timeSlots
