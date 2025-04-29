import { FaSeedling, FaTractor, FaTasks, FaTools } from 'react-icons/fa'
import Weather from '../components/Weather'
import useStore from '../store/useStore'

function Dashboard() {
  const { crops, tasks, equipment } = useStore()

  const stats = [
    {
      title: 'Active Crops',
      value: crops.filter(crop => crop.status === 'Growing').length,
      icon: <FaSeedling className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Pending Tasks',
      value: tasks.filter(task => task.status === 'Pending').length,
      icon: <FaTasks className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Equipment Status',
      value: `${equipment.filter(item => item.status === 'Operational').length}/${equipment.length}`,
      icon: <FaTools className="w-6 h-6 text-purple-500" />
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Weather Section */}
      <Weather />

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {tasks.slice(0, 3).map(task => (
            <div key={task.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded text-sm ${
                  task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 