import { useState, useEffect } from "react"
import ResourceList from "../src/components/Resource-list"
import ReservationForm from "../src/components/Reservation-form"
import TimeSlotSelector from "./components/Time-slot-selector"
import ConfirmationModal from "./components/Confirmation-modal"

export default function Home() {
  const [resources, setResources] = useState([])
  const [selectedResource, setSelectedResource] = useState(null)
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch resources on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:5000/api/resources")
        if (!response.ok) throw new Error("Failed to fetch resources")
        const data = await response.json()
        setResources(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [])

  // Fetch time slots when resource is selected
  useEffect(() => {
    if (selectedResource) {
      const fetchTimeSlots = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/resources/${selectedResource.id}/available-slots`)
          if (!response.ok) throw new Error("Failed to fetch time slots")
          const data = await response.json()
          setTimeSlots(data)
          setSelectedTimeSlot(null)
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred")
        }
      }

      fetchTimeSlots()
    }
  }, [selectedResource])

  const handleSelectResource = (resource) => {
    setSelectedResource(resource)
  }

  const handleSelectTimeSlot = (slot) => {
    setSelectedTimeSlot(slot)
  }

  const handleReservationSubmit = async (formData) => {
    if (!selectedResource || !selectedTimeSlot) {
      setError("Please select a resource and time slot")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: selectedResource.id,
          timeSlotId: selectedTimeSlot.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create reservation")
      }

      const reservation = await response.json()
      setShowConfirmation(true)

      // Reset form after successful submission
      setTimeout(() => {
        setSelectedResource(null)
        setSelectedTimeSlot(null)
        setShowConfirmation(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create reservation")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reserve Your Space</h1>
          <p className="text-lg text-gray-600">Book a conference room or meeting space in minutes</p>
        </div>

        {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Resource Selection */}
            <div className="md:col-span-1">
              <ResourceList
                resources={resources}
                selectedResource={selectedResource}
                onSelectResource={handleSelectResource}
              />
            </div>

            {/* Step 2 & 3: Time Slot and Form */}
            <div className="md:col-span-2 space-y-6">
              {selectedResource ? (
                <>
                  <TimeSlotSelector
                    timeSlots={timeSlots}
                    selectedTimeSlot={selectedTimeSlot}
                    onSelectTimeSlot={handleSelectTimeSlot}
                  />

                  {selectedTimeSlot && (
                    <ReservationForm
                      resource={selectedResource}
                      timeSlot={selectedTimeSlot}
                      onSubmit={handleReservationSubmit}
                    />
                  )}
                </>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
                  Select a resource to view available time slots
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          resource={selectedResource}
          timeSlot={selectedTimeSlot}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </main>
  )
}
