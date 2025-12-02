export const getResources = (req, res) => {
  const resources = [
    {
      id: "r1",
      name: "Conference Room A",
      description: "Large conference room with video conferencing setup",
      type: "meeting",
      maxCapacity: 20,
    },
    {
      id: "r2",
      name: "Conference Room B",
      description: "Medium conference room with whiteboard",
      type: "meeting",
      maxCapacity: 10,
    },
    {
      id: "r3",
      name: "Training Room",
      description: "Spacious room for training sessions",
      type: "training",
      maxCapacity: 30,
    },
  ]
  res.json(resources)
}
