import { create } from 'zustand'
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService'

const useStore = create((set) => ({
  // User authentication state
  user: null,

  // Authentication actions
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  // Crops state
  crops: [
    {
      id: 1,
      name: 'Wheat',
      type: 'Cereal',
      area: '20 acres',
      sowingDate: '2024-01-15',
      harvestDate: '2024-05-20',
      status: 'Growing',
      expectedYield: '40 tons'
    },
    {
      id: 2,
      name: 'Corn',
      type: 'Cereal',
      area: '15 acres',
      sowingDate: '2024-02-01',
      harvestDate: '2024-06-15',
      status: 'Growing',
      expectedYield: '30 tons'
    },
    {
      id: 3,
      name: 'Soybeans',
      type: 'Legume',
      area: '15 acres',
      sowingDate: '2024-03-01',
      harvestDate: '2024-07-20',
      status: 'Planned',
      expectedYield: '25 tons'
    }
  ],

  // Tasks state
  tasks: [
    {
      id: 1,
      title: 'Water Wheat Field',
      description: 'Irrigate the wheat field in section A',
      dueDate: '2024-03-15',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'John Doe'
    },
    {
      id: 2,
      title: 'Apply Fertilizer',
      description: 'Apply NPK fertilizer to corn field',
      dueDate: '2024-03-16',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Jane Smith'
    }
  ],

  // Equipment state
  equipment: [
    {
      id: 1,
      name: 'Tractor A',
      type: 'Tractor',
      status: 'Operational',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      fuelLevel: 85,
      hoursUsed: 120
    },
    {
      id: 2,
      name: 'Harvester B',
      type: 'Harvester',
      status: 'Maintenance Required',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      fuelLevel: 45,
      hoursUsed: 180
    }
  ],

  // Weather state
  weather: {
    current: null,
    forecast: null,
    loading: false,
    error: null
  },

  // Actions for crops
  addCrop: (crop) => set((state) => ({
    crops: [...state.crops, { ...crop, id: state.crops.length + 1 }]
  })),

  updateCrop: (updatedCrop) => set((state) => ({
    crops: state.crops.map((crop) =>
      crop.id === updatedCrop.id ? updatedCrop : crop
    )
  })),

  deleteCrop: (id) => set((state) => ({
    crops: state.crops.filter((crop) => crop.id !== id)
  })),

  // Actions for tasks
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: state.tasks.length + 1 }]
  })),

  updateTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  // Actions for equipment
  updateEquipment: (updatedEquipment) => set((state) => ({
    equipment: state.equipment.map((item) =>
      item.id === updatedEquipment.id ? updatedEquipment : item
    )
  })),

  // Weather actions
  fetchWeather: async (lat, lon) => {
    set(state => ({ weather: { ...state.weather, loading: true, error: null } }))
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(lat, lon),
        getWeatherForecast(lat, lon)
      ])
      set(state => ({
        weather: {
          ...state.weather,
          current,
          forecast,
          loading: false
        }
      }))
    } catch (error) {
      set(state => ({
        weather: {
          ...state.weather,
          loading: false,
          error: error.message
        }
      }))
    }
  },

  clearWeather: () => set(state => ({
    weather: {
      current: null,
      forecast: null,
      loading: false,
      error: null
    }
  }))
}))

export default useStore 