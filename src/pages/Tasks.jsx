import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import useStore from '../store/useStore'

function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    search: ''
  })

  const handleAddTask = (taskData) => {
    if (!taskData) {
      setIsModalOpen(false)
      return
    }

    addTask({
      ...taskData,
      id: Date.now()
    })
    setIsModalOpen(false)
  }

  const handleEditTask = (taskData) => {
    if (!taskData) {
      setEditingTask(null)
      return
    }

    updateTask(taskData)
    setEditingTask(null)
  }

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id)
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === 'All' || task.status === filters.status
    const matchesPriority = filters.priority === 'All' || task.priority === filters.priority
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.assignedTo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => setEditingTask(task)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteTask(task.id)}
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

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <TaskForm onSubmit={handleAddTask} />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
      >
        <TaskForm
          onSubmit={handleEditTask}
          initialData={editingTask}
          isEditing={true}
        />
      </Modal>
    </div>
  )
}

export default Tasks 