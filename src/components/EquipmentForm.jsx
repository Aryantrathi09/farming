import { useState, useEffect } from 'react'
import { FaTractor } from 'react-icons/fa'

function EquipmentForm({ onSubmit, initialData, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Operational',
    lastMaintenance: '',
    nextMaintenance: '',
    fuelLevel: '',
    hoursUsed: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-primary-100 rounded-full">
          <FaTractor className="text-primary-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold ml-4">
          {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="">Select Type</option>
            <option value="Tractor">Tractor</option>
            <option value="Harvester">Harvester</option>
            <option value="Sprayer">Sprayer</option>
            <option value="Seeder">Seeder</option>
            <option value="Plow">Plow</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="Operational">Operational</option>
            <option value="Maintenance Required">Maintenance Required</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Maintenance Date</label>
          <input
            type="date"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Next Maintenance Date</label>
          <input
            type="date"
            name="nextMaintenance"
            value={formData.nextMaintenance}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fuel Level (%)</label>
          <input
            type="number"
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hours Used</label>
          <input
            type="number"
            name="hoursUsed"
            value={formData.hoursUsed}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEditing ? 'Update' : 'Add'} Equipment
        </button>
      </div>
    </form>
  )
}

export default EquipmentForm 