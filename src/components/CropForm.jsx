import { useState, useEffect } from 'react'
import { FaSeedling } from 'react-icons/fa'

function CropForm({ onSubmit, initialData, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    area: '',
    sowingDate: '',
    harvestDate: '',
    expectedYield: ''
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
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Crop' : 'Add New Crop'}
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Crop Name</label>
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
        <label className="block text-sm font-medium text-gray-700">Crop Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Area (acres)</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sowing Date</label>
        <input
          type="date"
          name="sowingDate"
          value={formData.sowingDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
        <input
          type="date"
          name="harvestDate"
          value={formData.harvestDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expected Yield</label>
        <input
          type="text"
          name="expectedYield"
          value={formData.expectedYield}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
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
          {isEditing ? 'Update' : 'Add'} Crop
        </button>
      </div>
    </form>
  )
}

export default CropForm 