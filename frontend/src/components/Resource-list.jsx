import React from "react"

export default function ResourceList({ resources, selectedResource, onSelectResource }) {

  const handleSelect = (res) => {
    onSelectResource(res)
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 1: Select a Resource
      </h2>

      {resources && resources.length > 0 && resources.map((resource) => {
        let isSelected = false
        if (selectedResource && selectedResource.id === resource.id) {
          isSelected = true
        }

        let classes = "w-full text-left p-4 rounded-lg border-2 bg-white"
        if (isSelected) {
          classes = "w-full text-left p-4 rounded-lg border-2 border-blue-600 bg-blue-50"
        }

        return (
          <button
            key={resource.id}
            onClick={() => handleSelect(resource)}
            className={classes}
          >
            <div className="font-semibold text-gray-900">
              {resource.name}
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {resource.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {resource.type}
              </span>

              <span className="text-xs text-gray-500">
                Up to {resource.maxCapacity} guests
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
