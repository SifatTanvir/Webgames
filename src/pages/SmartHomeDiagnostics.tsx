import type React from "react"
import { useState, useEffect } from "react"
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Home,
  Shield,
  Thermometer,
  Lightbulb,
  Lock,
  Camera,
  Speaker,
  Tv,
  AlertTriangle,
  Router,
} from "lucide-react"

export const TASK_ID_SmartHome = "iot-repair-deviceconnectivity"
export const PASSWORD_SmartHome = "SmartFix"


const smartDevices = [...[
  {
    id: 1,
    name: "Living Room Light",
    type: "light",
    icon: Lightbulb,
    position: { x: 25, y: 30 },
    responsive: true,
    status: "online",
    battery: 85,
    lastSignal: "2 minutes ago",
    routerDistance: "12 feet",
    logs: [
      "2024-01-15 14:30 - Device online",
      "2024-01-15 14:25 - Signal strength: -45dBm",
      "2024-01-15 14:20 - Battery level: 85%",
    ],
  },
  {
    id: 2,
    name: "Front Door Lock",
    type: "lock",
    icon: Lock,
    position: { x: 15, y: 15 },
    responsive: false,
    status: "offline",
    battery: 15,
    lastSignal: "3 hours ago",
    routerDistance: "25 feet",
    logs: [
      "2024-01-15 11:30 - Low battery warning",
      "2024-01-15 11:25 - Connection timeout",
      "2024-01-15 11:20 - Battery level: 15%",
    ],
    correctAction: "replace battery",
  },
  {
    id: 3,
    name: "Bedroom Thermostat",
    type: "thermostat",
    icon: Thermometer,
    position: { x: 75, y: 25 },
    responsive: true,
    status: "online",
    battery: 92,
    lastSignal: "1 minute ago",
    routerDistance: "8 feet",
    logs: [
      "2024-01-15 14:31 - Temperature set to 72°F",
      "2024-01-15 14:30 - Device online",
      "2024-01-15 14:25 - Signal strength: -38dBm",
    ],
  },
  {
    id: 4,
    name: "Kitchen Camera",
    type: "camera",
    icon: Camera,
    position: { x: 45, y: 60 },
    responsive: false,
    status: "offline",
    battery: 78,
    lastSignal: "45 minutes ago",
    routerDistance: "35 feet",
    logs: [
      "2024-01-15 13:45 - Signal lost",
      "2024-01-15 13:40 - Weak signal warning",
      "2024-01-15 13:35 - Distance from router: 35ft",
    ],
    correctAction: "move device",
  },
  {
    id: 5,
    name: "Garage Door Sensor",
    type: "sensor",
    icon: Shield,
    position: { x: 85, y: 70 },
    responsive: true,
    status: "online",
    battery: 67,
    lastSignal: "30 seconds ago",
    routerDistance: "18 feet",
    logs: [
      "2024-01-15 14:31 - Door closed",
      "2024-01-15 14:30 - Signal strength: -52dBm",
      "2024-01-15 14:25 - Battery level: 67%",
    ],
  },
  {
    id: 6,
    name: "Living Room Speaker",
    type: "speaker",
    icon: Speaker,
    position: { x: 35, y: 45 },
    responsive: false,
    status: "offline",
    battery: 88,
    lastSignal: "2 hours ago",
    routerDistance: "15 feet",
    logs: [
      "2024-01-15 12:30 - Hub connection lost",
      "2024-01-15 12:25 - Attempting reconnection",
      "2024-01-15 12:20 - Hub status: offline",
    ],
    correctAction: "restart hub",
  },
  {
    id: 7,
    name: "Bedroom TV",
    type: "tv",
    icon: Tv,
    position: { x: 65, y: 35 },
    responsive: true,
    status: "online",
    battery: 100,
    lastSignal: "10 seconds ago",
    routerDistance: "10 feet",
    logs: [
      "2024-01-15 14:31 - Streaming active",
      "2024-01-15 14:30 - Signal strength: -42dBm",
      "2024-01-15 14:25 - Power: AC connected",
    ],
  },
  {
    id: 8,
    name: "Patio Light",
    type: "light",
    icon: Lightbulb,
    position: { x: 55, y: 80 },
    responsive: false,
    status: "offline",
    battery: 45,
    lastSignal: "6 hours ago",
    routerDistance: "40 feet",
    logs: [
      "2024-01-15 08:30 - Weather interference detected",
      "2024-01-15 08:25 - Signal degraded",
      "2024-01-15 08:20 - Distance from router: 40ft",
    ],
    correctAction: "move device",
  },
]].sort(() => Math.random() - 0.5)

const recoveryActions = [
  "restart hub",
  "replace battery",
  "move device",
  "reset network",
  "update firmware",
  "check power",
]

const SmartHomeDiagnostics: React.FC = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "floorplan" | "diagnostics" | "results">("dashboard")
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null)
  const [deviceActions, setDeviceActions] = useState<{ [key: number]: string }>({})
  const [showLogs, setShowLogs] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus, setSystemStatus] = useState({
    totalDevices: 8,
    onlineDevices: 4,
    alerts: 4,
    hubStatus: "online",
  })


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  useEffect(() => {
    const statusTimer = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        hubStatus: Math.random() > 0.1 ? "online" : "reconnecting",
      }))
    }, 5000)
    return () => clearInterval(statusTimer)
  }, [])

  const handleDeviceClick = (deviceId: number) => {
    setSelectedDevice(deviceId)
    setShowLogs(true)
  }

  const handleActionSelect = (deviceId: number, action: string) => {
    setDeviceActions((prev) => ({
      ...prev,
      [deviceId]: action,
    }))
  }

  const validateSolution = () => {
    const offlineDevices = smartDevices.filter((d) => !d.responsive)
    return offlineDevices.every((device) => deviceActions[device.id] === device.correctAction)
  }

  const handleSubmit = () => {
    setCurrentView("results")
  }

  const resetSystem = () => {
    setCurrentView("dashboard")
    setSelectedDevice(null)
    setDeviceActions({})
    setShowLogs(false)
  }

  type Device = {
    id: number
    name: string
    type: string
    icon: React.FC
    responsive: boolean
    logs: string[]
    batteryLevel?: number
    proximity?: number
    correctAction?: string
  }
  

  const getDeviceStatusColor = (device: Device) => {
    if (!device.responsive) return "text-red-400 bg-red-500/10"
    return "text-green-400 bg-green-500/10"
  }

  const getBatteryIcon = (level: number) => {
    return level < 20 ? BatteryLow : Battery
  }

  const selectedDeviceData = selectedDevice ? smartDevices.find((d) => d.id === selectedDevice) : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">SmartHome Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <button
                onClick={() => setCurrentView("dashboard")}
                disabled={validateSolution()}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  currentView === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("floorplan")}
                disabled={validateSolution()}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  currentView === "floorplan" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Floor Plan
              </button>
              <button
                onClick={() => setCurrentView("diagnostics")}
                disabled={validateSolution()}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  currentView === "diagnostics" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Diagnostics
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">System Time</div>
              <div className="text-sm font-medium text-gray-900">{currentTime.toLocaleTimeString()}</div>
            </div>
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                systemStatus.hubStatus === "online" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  systemStatus.hubStatus === "online" ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              Hub {systemStatus.hubStatus}
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard View */}
      {currentView === "dashboard" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Overview</h1>
            <p className="text-gray-600">Monitor and manage your smart home devices</p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Devices</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStatus.totalDevices}</p>
                </div>
                <Home className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Online</p>
                  <p className="text-2xl font-bold text-green-600">{systemStatus.onlineDevices}</p>
                </div>
                <Wifi className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{systemStatus.alerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hub Status</p>
                  <p
                    className={`text-sm font-medium ${
                      systemStatus.hubStatus === "online" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {systemStatus.hubStatus.charAt(0).toUpperCase() + systemStatus.hubStatus.slice(1)}
                  </p>
                </div>
                <Router
                  className={`h-8 w-8 ${systemStatus.hubStatus === "online" ? "text-green-500" : "text-yellow-500"}`}
                />
              </div>
            </div>
          </div>

          {/* Device List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Device Status</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {smartDevices.map((device) => {
                const IconComponent = device.icon
                const BatteryIcon = getBatteryIcon(device.battery)
                return (
                  <div key={device.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getDeviceStatusColor(device)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                          <p className="text-xs text-gray-500 capitalize">{device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <BatteryIcon
                            className={`h-4 w-4 ${device.battery < 20 ? "text-red-500" : "text-gray-400"}`}
                          />
                          <span className="text-xs text-gray-600">{device.battery}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {device.responsive ? (
                            <Wifi className="h-4 w-4 text-green-500" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${device.responsive ? "text-green-600" : "text-red-600"}`}
                          >
                            {device.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{device.lastSignal}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView("floorplan")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View Floor Plan
            </button>
          </div>
        </div>
      )}

      {/* Floor Plan View */}
      {currentView === "floorplan" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Interactive Floor Plan</h1>
            <p className="text-gray-600">Click on devices to view detailed logs and diagnostics</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Floor Plan */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="relative bg-gray-100 rounded-lg" style={{ height: "500px" }}>
                  {/* Room Labels */}
                  <div className="absolute top-4 left-4 text-xs font-medium text-gray-600">Living Room</div>
                  <div className="absolute top-4 right-4 text-xs font-medium text-gray-600">Bedroom</div>
                  <div className="absolute bottom-16 left-4 text-xs font-medium text-gray-600">Kitchen</div>
                  <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-600">Garage</div>

                  {/* Devices */}
                  {smartDevices.map((device) => {
                    const IconComponent = device.icon
                    return (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceClick(device.id)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full border-2 transition-all hover:scale-110 ${
                          device.responsive
                            ? "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                            : "bg-red-100 border-red-300 text-red-700 hover:bg-red-200"
                        } ${selectedDevice === device.id ? "ring-4 ring-blue-300" : ""}`}
                        style={{
                          left: `${device.position.x}%`,
                          top: `${device.position.y}%`,
                        }}
                        title={device.name}
                      >
                        <IconComponent className="h-5 w-5" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Device Details Panel */}
            <div className="space-y-4">
              {selectedDeviceData && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <selectedDeviceData.icon
                      className={`h-6 w-6 ${selectedDeviceData.responsive ? "text-green-600" : "text-red-600"}`}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedDeviceData.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{selectedDeviceData.type}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <span
                        className={`text-sm font-medium ${
                          selectedDeviceData.responsive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {selectedDeviceData.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Battery</span>
                      <span
                        className={`text-sm font-medium ${
                          selectedDeviceData.battery < 20 ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {selectedDeviceData.battery}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Signal</span>
                      <span className="text-sm text-gray-900">{selectedDeviceData.lastSignal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Router Distance</span>
                      <span className="text-sm text-gray-900">{selectedDeviceData.routerDistance}</span>
                    </div>
                  </div>

                  {showLogs && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Logs</h4>
                      <div className="space-y-1">
                        {selectedDeviceData.logs.map((log, index) => (
                          <div key={index} className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Online & Responsive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Offline & Needs Attention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView("diagnostics")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Run Diagnostics
            </button>
          </div>
        </div>
      )}

      {/* Diagnostics View */}
      {currentView === "diagnostics" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Recovery</h1>
            <p className="text-gray-600">Select the appropriate recovery action for each offline device</p>
          </div>

          <div className="space-y-6">
            {smartDevices
              .filter((d) => !d.responsive)
              .map((device) => {
                const IconComponent = device.icon
                return (
                  <div key={device.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{device.name}</h3>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Battery Level</div>
                            <div
                              className={`text-sm font-medium ${device.battery < 20 ? "text-red-600" : "text-gray-900"}`}
                            >
                              {device.battery}%
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Last Signal</div>
                            <div className="text-sm font-medium text-gray-900">{device.lastSignal}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Router Distance</div>
                            <div className="text-sm font-medium text-gray-900">{device.routerDistance}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Recovery Action</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {recoveryActions.map((action) => (
                              <button
                                key={action}
                                onClick={() => handleActionSelect(device.id, action)}
                                className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                                  deviceActions[device.id] === action
                                    ? "bg-blue-100 border-blue-300 text-blue-700"
                                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={smartDevices.filter((d) => !d.responsive).some((d) => !deviceActions[d.id])}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Apply Recovery Actions
            </button>
          </div>
        </div>
      )}

      {currentView === "results" && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center space-y-8">
            <div className="text-6xl">{validateSolution() ? "🎯" : "🔧"}</div>

            <div>
              <h1 className={`text-3xl font-bold mb-4 text-green-600`}>
                Recovery Complete!
              </h1>
              <p className="text-lg text-gray-600">
               
                  All devices have been successfully diagnosed and recovery actions applied.
              </p>
            </div>

            {validateSolution() ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                <div className="text-4xl mb-4">🔐</div>
                <h2 className="text-xl font-semibold text-green-900 mb-4">Smart Home Expert Certification</h2>
                <div className="text-3xl font-bold text-green-700 mb-4 font-mono">{PASSWORD_SmartHome}</div>
                <p className="text-green-700">
                  You've successfully diagnosed and resolved all smart home device issues!
                </p>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
                <h2 className="text-xl font-semibold text-orange-900 mb-4">System Analysis</h2>
                <p className="text-orange-700">
                You've successfully diagnosed and resolved all smart home device issues!
                </p>
              </div>
            )}

            <button
              onClick={resetSystem}
              disabled={validateSolution()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start New Diagnosis
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartHomeDiagnostics
