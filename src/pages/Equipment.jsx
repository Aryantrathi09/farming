import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa'
import Modal from '../components/Modal'
import EquipmentForm from '../components/EquipmentForm'
import useStore from '../store/useStore'

function Equipment() {
  const { equipment, addEquipment, updateEquipment, deleteEquipment } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState(null)
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    search: ''
  })

  const handleAddEquipment = (equipmentData) => {
    if (!equipmentData) {
      setIsModalOpen(false)
      return
    }

    addEquipment({
      ...equipmentData,
      id: Date.now()
    })
    setIsModalOpen(false)
  }

  const handleEditEquipment = (equipmentData) => {
    if (!equipmentData) {
      setEditingEquipment(null)
      return
    }

    updateEquipment(equipmentData)
    setEditingEquipment(null)
  }

  const handleDeleteEquipment = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipment(id)
    }
  }

  const filteredEquipment = equipment.filter(item => {
    const matchesType = filters.type === 'All' || item.type === filters.type
    const matchesStatus = filters.status === 'All' || item.status === filters.status
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800'
      case 'Maintenance Required':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Service':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getFuelLevelColor = (level) => {
    if (level >= 75) return 'bg-green-100 text-green-800'
    if (level >= 25) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add New Equipment
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search equipment..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="All">All Types</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Sprayer">Sprayer</option>
              <option value="Seeder">Seeder</option>
              <option value="Plow">Plow</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Operational">Operational</option>
              <option value="Maintenance Required">Maintenance Required</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEquipment.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.lastMaintenance || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.nextMaintenance || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.fuelLevel !== undefined && (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getFuelLevelColor(item.fuelLevel)}`}>
                        {item.fuelLevel}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.hoursUsed || '0'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => setEditingEquipment(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteEquipment(item.id)}
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

      {/* Add Equipment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <EquipmentForm onSubmit={handleAddEquipment} />
      </Modal>

      {/* Edit Equipment Modal */}
      <Modal
        isOpen={!!editingEquipment}
        onClose={() => setEditingEquipment(null)}
      >
        <EquipmentForm
          onSubmit={handleEditEquipment}
          initialData={editingEquipment}
          isEditing={true}
        />
      </Modal>
    </div>
  )
}

export default Equipment 