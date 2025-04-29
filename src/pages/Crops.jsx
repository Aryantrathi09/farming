import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import Modal from '../components/Modal'
import CropForm from '../components/CropForm'
import useStore from '../store/useStore'

function Crops() {
  const { crops, addCrop, updateCrop, deleteCrop } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCrop, setEditingCrop] = useState(null)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'growing':
        return 'text-green-600 bg-green-50'
      case 'planned':
        return 'text-blue-600 bg-blue-50'
      case 'harvested':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const handleAddCrop = (cropData) => {
    if (!cropData) {
      setIsModalOpen(false)
      return
    }

    addCrop({
      ...cropData,
      status: 'Planned'
    })
    setIsModalOpen(false)
  }

  const handleEditCrop = (cropData) => {
    if (!cropData) {
      setEditingCrop(null)
      return
    }

    updateCrop(cropData)
    setEditingCrop(null)
  }

  const handleDeleteCrop = (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Crops Management</h1>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add New Crop
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sowing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Yield</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{crop.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{crop.area}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{crop.sowingDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{crop.harvestDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                      {crop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{crop.expectedYield}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => setEditingCrop(crop)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteCrop(crop.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Crop Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CropForm onSubmit={handleAddCrop} />
      </Modal>

      {/* Edit Crop Modal */}
      <Modal
        isOpen={!!editingCrop}
        onClose={() => setEditingCrop(null)}
      >
        <CropForm
          onSubmit={handleEditCrop}
          initialData={editingCrop}
          isEditing={true}
        />
      </Modal>
    </div>
  )
}

export default Crops 