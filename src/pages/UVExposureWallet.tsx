import React, { useState, useEffect, useRef } from 'react'

export const TASK_ID_UVExposureWallet = 'health-healthmanagement-uvexposure'
export const PASSWORD_UVExposureWallet = 'sunguard'

interface UVReading {
  time: string
  uvIndex: number
  duration: number // minutes
  location: string
}

interface SkinType {
  type: number
  name: string
  description: string
  burnTime: number // minutes in direct sun
  recommendedSpf: number
}

interface DynamicConfig {
  layoutStyle: 'grid' | 'sidebar' | 'tabs'
  colorTheme: 'blue' | 'green' | 'purple' | 'orange'
  cardStyle: 'modern' | 'rounded' | 'minimal'
}

const UVExposureWallet: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('monitor')
  const [uvReadings, setUvReadings] = useState<UVReading[]>([])
  const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null)
  const [dailyGoalHours, setDailyGoalHours] = useState<string>('')
  const [alertThreshold, setAlertThreshold] = useState<string>('')
  const [enableNotifications, setEnableNotifications] = useState(false)
  const [preferredSpf, setPreferredSpf] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [taskPrompt, setTaskPrompt] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState({
    skinType: 0,
    dailyGoal: '',
    threshold: '',
    spf: '',
    notifications: false,
  })
  const [dynamicConfig, setDynamicConfig] = useState<DynamicConfig>({
    layoutStyle: 'grid',
    colorTheme: 'blue',
    cardStyle: 'modern',
  })
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const skinTypes: SkinType[] = [
    {
      type: 1,
      name: 'Very Fair',
      description: 'Always burns, never tans',
      burnTime: 10,
      recommendedSpf: 50,
    },
    {
      type: 2,
      name: 'Fair',
      description: 'Usually burns, tans minimally',
      burnTime: 20,
      recommendedSpf: 30,
    },
    {
      type: 3,
      name: 'Medium',
      description: 'Sometimes burns, tans gradually',
      burnTime: 30,
      recommendedSpf: 25,
    },
    {
      type: 4,
      name: 'Olive',
      description: 'Rarely burns, tans easily',
      burnTime: 45,
      recommendedSpf: 20,
    },
    {
      type: 5,
      name: 'Brown',
      description: 'Very rarely burns, tans darkly',
      burnTime: 60,
      recommendedSpf: 15,
    },
    {
      type: 6,
      name: 'Dark Brown',
      description: 'Never burns, tans very darkly',
      burnTime: 90,
      recommendedSpf: 15,
    },
  ]

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [taskPrompt])

  const generateRandomData = () => {
    // Randomize layout and styling
    const layouts: DynamicConfig['layoutStyle'][] = ['grid', 'sidebar', 'tabs']
    const themes: DynamicConfig['colorTheme'][] = [
      'blue',
      'green',
      'purple',
      'orange',
    ]
    const styles: DynamicConfig['cardStyle'][] = [
      'modern',
      'rounded',
      'minimal',
    ]

    const newConfig: DynamicConfig = {
      layoutStyle: layouts[Math.floor(Math.random() * layouts.length)],
      colorTheme: themes[Math.floor(Math.random() * themes.length)],
      cardStyle: styles[Math.floor(Math.random() * styles.length)],
    }
    setDynamicConfig(newConfig)

    // Generate random UV readings for the day
    const locations = [
      'Outdoor Park',
      'Beach Walk',
      'Garden Work',
      'Sports Field',
      'City Center',
      'Hiking Trail',
    ]
    const times = [
      '8:30 AM',
      '10:15 AM',
      '12:45 PM',
      '2:20 PM',
      '4:10 PM',
      '5:45 PM',
    ]

    const readings: UVReading[] = times
      .slice(0, Math.floor(Math.random() * 4) + 3)
      .map((time) => ({
        time,
        uvIndex: Math.floor(Math.random() * 8) + 3, // UV index 3-10
        duration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
        location: locations[Math.floor(Math.random() * locations.length)],
      }))
    setUvReadings(readings)

    // Calculate total exposure and generate correct answers
    const totalExposure = readings.reduce(
      (sum, reading) => sum + (reading.duration * reading.uvIndex) / 60,
      0,
    )
    const highestUV = Math.max(...readings.map((r) => r.uvIndex))

    // Determine correct skin type based on highest UV exposure
    const correctSkinType =
      highestUV > 8 ? 1 : highestUV > 6 ? 2 : highestUV > 4 ? 3 : 4
    const skinType = skinTypes.find((s) => s.type === correctSkinType)!

    const correctDailyGoal =
      totalExposure > 3 ? '2' : totalExposure > 2 ? '2.5' : '3'
    const correctThreshold = highestUV > 7 ? '6' : highestUV > 5 ? '7' : '8'
    const correctSpf = skinType.recommendedSpf.toString()

    setCorrectAnswers({
      skinType: correctSkinType,
      dailyGoal: correctDailyGoal,
      threshold: correctThreshold,
      spf: correctSpf,
      notifications: true,
    })

    // Generate task prompt
    const totalMinutes = readings.reduce(
      (sum, reading) => sum + reading.duration,
      0,
    )
    const avgUV = (
      readings.reduce((sum, reading) => sum + reading.uvIndex, 0) /
      readings.length
    ).toFixed(1)

    setTaskPrompt(
      `Your task is to configure UV protection settings after the system detected significant sun exposure. Your UV exposure monitoring system has logged ${
        readings.length
      } outdoor sessions today totaling ${totalMinutes} minutes with an average UV index of ${avgUV}. The highest UV exposure was ${highestUV} during your ${readings
        .find((r) => r.uvIndex === highestUV)
        ?.location.toLowerCase()} session. Configure your protection settings by selecting skin type ${correctSkinType} (${
        skinType.name
      }), setting daily exposure goal to ${correctDailyGoal} hours, burn risk threshold to UV ${correctThreshold}, and recommended SPF ${correctSpf}. Enable push notifications for real-time burn risk alerts to complete your UV safety profile and reveal the password.`,
    )

    // Reset form
    setSelectedSkinType(null)
    setDailyGoalHours('')
    setAlertThreshold('')
    setPreferredSpf('')
    setEnableNotifications(false)
    setShowPassword(false)
    setShowSuccess(false)
    setIsSubmitting(false)
    setCurrentTab('monitor')
  }

  useEffect(() => {
    generateRandomData()
  }, [])

  const checkAnswers = () => {
    return (
      selectedSkinType === correctAnswers.skinType &&
      dailyGoalHours === correctAnswers.dailyGoal &&
      alertThreshold === correctAnswers.threshold &&
      preferredSpf === correctAnswers.spf &&
      enableNotifications === correctAnswers.notifications
    )
  }

  const getThemeColors = () => {
    const themes = {
      blue: {
        primary: 'bg-blue-600',
        secondary: 'bg-blue-50',
        accent: 'text-blue-600',
        border: 'border-blue-200',
        button: 'bg-blue-500 hover:bg-blue-600',
        gradient: 'from-blue-500 to-blue-600',
      },
      green: {
        primary: 'bg-green-600',
        secondary: 'bg-green-50',
        accent: 'text-green-600',
        border: 'border-green-200',
        button: 'bg-green-500 hover:bg-green-600',
        gradient: 'from-green-500 to-green-600',
      },
      purple: {
        primary: 'bg-purple-600',
        secondary: 'bg-purple-50',
        accent: 'text-purple-600',
        border: 'border-purple-200',
        button: 'bg-purple-500 hover:bg-purple-600',
        gradient: 'from-purple-500 to-purple-600',
      },
      orange: {
        primary: 'bg-orange-600',
        secondary: 'bg-orange-50',
        accent: 'text-orange-600',
        border: 'border-orange-200',
        button: 'bg-orange-500 hover:bg-orange-600',
        gradient: 'from-orange-500 to-orange-600',
      },
    }
    return themes[dynamicConfig.colorTheme]
  }

  const getCardClasses = () => {
    const base = 'bg-white shadow-lg border'
    switch (dynamicConfig.cardStyle) {
      case 'modern':
        return `${base} rounded-2xl border-gray-100`
      case 'rounded':
        return `${base} rounded-xl border-gray-200`
      case 'minimal':
        return `${base} rounded-lg border-gray-150`
    }
  }

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'bg-green-500'
    if (uvIndex <= 5) return 'bg-yellow-500'
    if (uvIndex <= 7) return 'bg-orange-500'
    if (uvIndex <= 10) return 'bg-red-500'
    return 'bg-purple-500'
  }

  const getUVLabel = (uvIndex: number) => {
    if (uvIndex <= 2) return 'Low'
    if (uvIndex <= 5) return 'Moderate'
    if (uvIndex <= 7) return 'High'
    if (uvIndex <= 10) return 'Very High'
    return 'Extreme'
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (checkAnswers()) {
      setShowPassword(true)
    } else {
      setShowSuccess(true)
    }
    setIsSubmitting(false)
  }

  const isFormValid = () => {
    return selectedSkinType && dailyGoalHours && alertThreshold && preferredSpf
  }

  const colors = getThemeColors()
  const cardClasses = getCardClasses()

  const renderContent = () => {
    if (dynamicConfig.layoutStyle === 'tabs') {
      return (
        <div className='space-y-6'>
          {/* Tab Navigation */}
          <div className={`${cardClasses} p-2`}>
            <div className='flex space-x-1'>
              {[
                { id: 'monitor', label: '📊 UV Monitor', icon: '📊' },
                { id: 'profile', label: '👤 Skin Profile', icon: '👤' },
                { id: 'settings', label: '⚙️ Protection Settings', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    currentTab === tab.id
                      ? `${colors.primary} text-white`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className='mr-2'>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className='min-h-[500px]'>
            {currentTab === 'monitor' && renderMonitorContent()}
            {currentTab === 'profile' && renderProfileContent()}
            {currentTab === 'settings' && renderSettingsContent()}
          </div>

          {/* Tab Navigation Buttons */}
          <div className='flex justify-between items-center mt-6'>
            <button
              onClick={() => {
                const tabs = ['monitor', 'profile', 'settings']
                const currentIndex = tabs.indexOf(currentTab)
                if (currentIndex > 0) {
                  setCurrentTab(tabs[currentIndex - 1])
                }
              }}
              disabled={currentTab === 'monitor'}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentTab === 'monitor'
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← Previous
            </button>

            <div className='text-center'>
              <div className='text-sm text-gray-500 mb-2'>
                {currentTab === 'monitor'
                  ? 'Step 1 of 3'
                  : currentTab === 'profile'
                  ? 'Step 2 of 3'
                  : 'Step 3 of 3'}
              </div>
              <div className='w-48 bg-gray-200 rounded-full h-2'>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${colors.primary}`}
                  style={{
                    width: `${
                      currentTab === 'monitor'
                        ? '33%'
                        : currentTab === 'profile'
                        ? '66%'
                        : '100%'
                    }`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                const tabs = ['monitor', 'profile', 'settings']
                const currentIndex = tabs.indexOf(currentTab)
                if (currentIndex < tabs.length - 1) {
                  setCurrentTab(tabs[currentIndex + 1])
                }
              }}
              disabled={currentTab === 'settings'}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentTab === 'settings'
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : `${colors.button} text-white`
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )
    }

    if (dynamicConfig.layoutStyle === 'sidebar') {
      return (
        <div className='flex gap-6'>
          {/* Sidebar */}
          <div className={`w-80 ${cardClasses} p-6 h-fit`}>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              UV Dashboard
            </h3>
            <div className='space-y-4'>{renderMonitorContent()}</div>
          </div>

          {/* Main Content */}
          <div className='flex-1 space-y-6'>
            {renderProfileContent()}
            {renderSettingsContent()}
          </div>
        </div>
      )
    }

    // Grid layout (default)
    return (
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          {renderMonitorContent()}
          {renderProfileContent()}
        </div>
        <div className='space-y-6'>{renderSettingsContent()}</div>
      </div>
    )
  }

  const renderMonitorContent = () => (
    <div className={`${cardClasses} p-6`}>
      <div className='flex items-center gap-3 mb-6'>
        <span className='text-2xl'>☀️</span>
        <h2 className='text-xl font-bold text-gray-800'>Today's UV Exposure</h2>
      </div>

      <div className='space-y-4'>
        {uvReadings.map((reading, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
          >
            <div>
              <div className='font-medium text-gray-800'>{reading.time}</div>
              <div className='text-sm text-gray-600'>{reading.location}</div>
              <div className='text-sm text-gray-600'>
                {reading.duration} minutes
              </div>
            </div>
            <div className='text-right'>
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getUVColor(
                  reading.uvIndex,
                )}`}
              >
                UV {reading.uvIndex}
              </div>
              <div className='text-xs text-gray-600 mt-1'>
                {getUVLabel(reading.uvIndex)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 p-4 ${colors.secondary} rounded-lg`}>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-gray-700'>Total Exposure</span>
          <span className={`${colors.accent} font-bold`}>
            {uvReadings.reduce((sum, r) => sum + r.duration, 0)} minutes
          </span>
        </div>
      </div>
    </div>
  )

  const renderProfileContent = () => (
    <div className={`${cardClasses} p-6`}>
      <div className='flex items-center gap-3 mb-6'>
        <span className='text-2xl'>👤</span>
        <h2 className='text-xl font-bold text-gray-800'>Skin Type Profile</h2>
      </div>

      <div className='space-y-3'>
        {skinTypes.map((skinType) => (
          <div
            key={skinType.type}
            onClick={() => setSelectedSkinType(skinType.type)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedSkinType === skinType.type
                ? `${colors.border} ${colors.secondary}`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='font-medium text-gray-800'>
                  Type {skinType.type}: {skinType.name}
                </div>
                <div className='text-sm text-gray-600'>
                  {skinType.description}
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                  Burns in {skinType.burnTime} min • Recommended SPF{' '}
                  {skinType.recommendedSpf}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedSkinType === skinType.type
                    ? `${colors.primary} border-transparent`
                    : 'border-gray-300'
                }`}
              >
                {selectedSkinType === skinType.type && (
                  <div className='w-full h-full bg-white rounded-full scale-50'></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSettingsContent = () => (
    <div className={`${cardClasses} p-6`}>
      <div className='flex items-center gap-3 mb-6'>
        <span className='text-2xl'>⚙️</span>
        <h2 className='text-xl font-bold text-gray-800'>Protection Settings</h2>
      </div>

      <div className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Daily UV Exposure Goal (hours)
          </label>
          <select
            value={dailyGoalHours}
            onChange={(e) => setDailyGoalHours(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select daily goal</option>
            <option value='1'>1 hour</option>
            <option value='1.5'>1.5 hours</option>
            <option value='2'>2 hours</option>
            <option value='2.5'>2.5 hours</option>
            <option value='3'>3 hours</option>
            <option value='4'>4 hours</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Burn Risk Alert Threshold (UV Index)
          </label>
          <select
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select UV threshold</option>
            <option value='3'>UV 3 - Moderate</option>
            <option value='6'>UV 6 - High</option>
            <option value='7'>UV 7 - High</option>
            <option value='8'>UV 8 - Very High</option>
            <option value='9'>UV 9 - Very High</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Preferred SPF Level
          </label>
          <select
            value={preferredSpf}
            onChange={(e) => setPreferredSpf(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select SPF level</option>
            <option value='15'>SPF 15</option>
            <option value='20'>SPF 20</option>
            <option value='25'>SPF 25</option>
            <option value='30'>SPF 30</option>
            <option value='50'>SPF 50</option>
          </select>
        </div>

        <div className='flex items-center gap-4'>
          <input
            type='checkbox'
            id='notifications'
            checked={enableNotifications}
            onChange={(e) => setEnableNotifications(e.target.checked)}
            className='w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          />
          <label htmlFor='notifications' className='flex-1 cursor-pointer'>
            <div className='font-medium text-gray-800'>
              Enable Push Notifications
            </div>
            <div className='text-sm text-gray-600'>
              Get real-time burn risk alerts
            </div>
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}
      >
        <div className='max-w-7xl mx-auto flex justify-between items-start p-4'>
          <div className='flex-1 mr-4'>
            <h1 className='text-lg font-bold mb-2 flex items-center'>
              ☀️ UV Exposure Wallet
            </h1>
            <p className='text-sm opacity-90 leading-relaxed'>{taskPrompt}</p>
          </div>
          <button
            onClick={generateRandomData}
            className='bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2'
          >
            🔄 New Task
          </button>
        </div>
      </div>

      <div style={{ height: headerHeight }} />

      <div className='max-w-7xl mx-auto py-8 px-4'>
        <div
          className={
            showPassword || showSuccess
              ? 'pointer-events-none opacity-60 select-none'
              : ''
          }
        >
          {renderContent()}

          {/* Submit Button */}
          <div className='mt-8 text-center'>
            <button
              onClick={handleSubmit}
              disabled={
                !isFormValid() || isSubmitting || showPassword || showSuccess
              }
              className={`px-8 py-4 text-white rounded-xl font-medium text-lg transition-all duration-200 ${
                !isFormValid() || isSubmitting || showPassword || showSuccess
                  ? 'bg-gray-400 cursor-not-allowed'
                  : colors.button
              }`}
            >
              {isSubmitting ? (
                <span className='flex items-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Configuring UV Protection...
                </span>
              ) : showPassword || showSuccess ? (
                '✓ Configuration Complete'
              ) : (
                '🛡️ Save UV Protection Settings'
              )}
            </button>
          </div>
        </div>

        {/* Password Display */}
        {showPassword && (
          <div className='mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>🛡️</div>
            <h2 className='text-3xl font-bold text-green-800 mb-4'>
              UV Protection Activated!
            </h2>
            <p className='text-green-700 mb-6 text-lg'>
              Your personalized sun safety profile is now configured.
            </p>
            <div className='bg-white border-2 border-green-300 rounded-xl p-6 inline-block shadow-lg'>
              <p className='text-sm text-gray-600 mb-2 font-medium'>
                Password:
              </p>
              <p className='text-4xl font-mono font-bold text-green-600 tracking-wide'>
                {PASSWORD_UVExposureWallet}
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className='mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>📱</div>
            <h2 className='text-2xl font-bold text-blue-800 mb-4'>
              Settings Saved!
            </h2>
            <p className='text-blue-700 text-lg'>
              Your UV exposure preferences have been updated.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UVExposureWallet
