import type React from "react"
import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import {
  Play,
  Music,
  Cloud,
  Gamepad2,
  BookOpen,
  Dumbbell,
  ShoppingCart,
  Briefcase,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Eye,
  Calendar,
  DollarSign,
  BarChart3,
  CheckCircle,
  Check,
} from "lucide-react"

interface Subscription {
  id: number
  name: string
  category: string
  icon: React.ElementType
  price: number
  color: string
  usageData: {
    january: { hours: number; sessions: number }
    february: { hours: number; sessions: number }
    march: { hours: number; sessions: number }
    recent: string
    trend: "stable" | "declining" | "growing" | "minimal"
  }
  features: string[]
}

export const TASK_ID_SubscriptionManager = "finance-expense-cancelservices"
export const PASSWORD_SubscriptionManager = "SubOptimizer"

const allSubscriptionData: Subscription[] = [
  {
    id: 1,
    name: "Netflix",
    category: "Video",
    icon: Play,
    price: 15.99,
    color: "bg-red-500",
    usageData: {
      january: { hours: 45, sessions: 28 },
      february: { hours: 52, sessions: 31 },
      march: { hours: 38, sessions: 24 },
      recent: "Last watched 2 days ago",
      trend: "stable",
    },
    features: ["4K Streaming", "Multiple Profiles", "Offline Downloads"],
  },
  {
    id: 2,
    name: "Disney+",
    category: "Video",
    icon: Play,
    price: 7.99,
    color: "bg-blue-600",
    usageData: {
      january: { hours: 8, sessions: 4 },
      february: { hours: 3, sessions: 2 },
      march: { hours: 1, sessions: 1 },
      recent: "Last watched 3 weeks ago",
      trend: "declining",
    },
    features: ["Family Content", "Marvel & Star Wars", "4K Streaming"],
  },
  {
    id: 3,
    name: "Spotify Premium",
    category: "Music",
    icon: Music,
    price: 9.99,
    color: "bg-green-500",
    usageData: {
      january: { hours: 89, sessions: 156 },
      february: { hours: 94, sessions: 168 },
      march: { hours: 87, sessions: 142 },
      recent: "Currently playing",
      trend: "stable",
    },
    features: ["Ad-free Music", "Offline Downloads", "High Quality Audio"],
  },
  {
    id: 4,
    name: "Apple Music",
    category: "Music",
    icon: Music,
    price: 10.99,
    color: "bg-gray-800",
    usageData: {
      january: { hours: 12, sessions: 8 },
      february: { hours: 6, sessions: 4 },
      march: { hours: 2, sessions: 1 },
      recent: "Last used 2 weeks ago",
      trend: "declining",
    },
    features: ["Lossless Audio", "Spatial Audio", "Apple Integration"],
  },
  {
    id: 5,
    name: "Google Drive",
    category: "Storage",
    icon: Cloud,
    price: 1.99,
    color: "bg-blue-500",
    usageData: {
      january: { hours: 15, sessions: 45 },
      february: { hours: 18, sessions: 52 },
      march: { hours: 22, sessions: 61 },
      recent: "Active sync 1 hour ago",
      trend: "growing",
    },
    features: ["100GB Storage", "File Sync", "Collaboration Tools"],
  },
  {
    id: 6,
    name: "Xbox Game Pass",
    category: "Gaming",
    icon: Gamepad2,
    price: 14.99,
    color: "bg-green-600",
    usageData: {
      january: { hours: 25, sessions: 12 },
      february: { hours: 18, sessions: 8 },
      march: { hours: 4, sessions: 2 },
      recent: "Last played 10 days ago",
      trend: "declining",
    },
    features: ["100+ Games", "Cloud Gaming", "Day-one Releases"],
  },
  {
    id: 7,
    name: "Audible",
    category: "Books",
    icon: BookOpen,
    price: 14.95,
    color: "bg-orange-500",
    usageData: {
      january: { hours: 0, sessions: 0 },
      february: { hours: 2, sessions: 1 },
      march: { hours: 0, sessions: 0 },
      recent: "Last used 6 weeks ago",
      trend: "minimal",
    },
    features: ["Monthly Credits", "Exclusive Content", "Offline Listening"],
  },
  {
    id: 8,
    name: "Adobe Creative Suite",
    category: "Professional",
    icon: Briefcase,
    price: 52.99,
    color: "bg-red-600",
    usageData: {
      january: { hours: 45, sessions: 22 },
      february: { hours: 38, sessions: 19 },
      march: { hours: 41, sessions: 21 },
      recent: "Last used yesterday",
      trend: "stable",
    },
    features: ["Photoshop", "Illustrator", "Premiere Pro", "Cloud Storage"],
  },
  {
    id: 9,
    name: "Gym Membership",
    category: "Fitness",
    icon: Dumbbell,
    price: 30.0,
    color: "bg-purple-600",
    usageData: {
      january: { hours: 10, sessions: 8 },
      february: { hours: 12, sessions: 10 },
      march: { hours: 11, sessions: 9 },
      recent: "Last visited 3 days ago",
      trend: "stable",
    },
    features: ["Full Gym Access", "Classes", "Personal Training"],
  },
  {
    id: 10,
    name: "Amazon Prime",
    category: "Shopping",
    icon: ShoppingCart,
    price: 14.99,
    color: "bg-yellow-500",
    usageData: {
      january: { hours: 5, sessions: 10 },
      february: { hours: 6, sessions: 12 },
      march: { hours: 4, sessions: 8 },
      recent: "Last ordered 1 day ago",
      trend: "stable",
    },
    features: ["Free Shipping", "Prime Video", "Music"],
  },
]

const gradients = [
  'linear-gradient(135deg, #090040 0%, #471396 100%)',
  'linear-gradient(135deg, #471396 0%, #B13BFF 100%)',
  'linear-gradient(135deg, #B13BFF 0%, #FFCC00 100%)',
  'linear-gradient(135deg, #FFCC00 0%, #090040 100%)',
]

const SubscriptionManager: React.FC = () => {
  const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<number[]>([])
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({})
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAssessmentResult, setShowAssessmentResult] = useState(false)
  const [isAssessmentCorrect, setIsAssessmentCorrect] = useState(false)
  const [dynamicSubscriptionData, setDynamicSubscriptionData] = useState<Subscription[]>([])
  const [taskPrompt, setTaskPrompt] = useState("")
  const [numSubscriptionsToSelect, setNumSubscriptionsToSelect] = useState<number>(0)
  const [correctMinimalSubscriptionIds, setCorrectMinimalSubscriptionIds] = useState<number[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [gradientIndex, setGradientIndex] = useState(0)



  useEffect(() => {
    setGradientIndex(Math.floor(Math.random() * gradients.length))
  }, [])

  const initializeDynamicSubscriptions = useCallback(() => {
    const shuffleArray = (array: Subscription[]) => {
      let currentIndex = array.length,
        randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
          ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
      }
      return array
    }

    const numToSelectFromAll = Math.floor(Math.random() * (allSubscriptionData.length - 5 + 1)) + 5
    const selectedSubs = shuffleArray([...allSubscriptionData]).slice(0, numToSelectFromAll)

    const minimalCountNeeded = Math.max(numSubscriptionsToSelect, 3)
    const currentMinimalCount = selectedSubs.filter((s) => s.usageData.trend === "minimal").length

    if (currentMinimalCount < minimalCountNeeded) {
      const nonMinimalSubs = selectedSubs.filter((s) => s.usageData.trend !== "minimal")
      const subsToChange = shuffleArray([...nonMinimalSubs]).slice(0, minimalCountNeeded - currentMinimalCount)

      subsToChange.forEach((subToChange) => {
        const index = selectedSubs.findIndex((s) => s.id === subToChange.id)
        if (index !== -1) {
          selectedSubs[index] = {
            ...selectedSubs[index],
            usageData: {
              january: { hours: Math.floor(Math.random() * 3), sessions: Math.floor(Math.random() * 3) },
              february: { hours: Math.floor(Math.random() * 3), sessions: Math.floor(Math.random() * 3) },
              march: { hours: Math.floor(Math.random() * 3), sessions: Math.floor(Math.random() * 3) },
              recent: "Very rarely used",
              trend: "minimal",
            },
          }
        }
      })
    }

    setDynamicSubscriptionData(selectedSubs)
  }, [numSubscriptionsToSelect])

  const generateNewTask = useCallback(() => {
    const randomNumToSelect = Math.floor(Math.random() * 3) + 1
    setNumSubscriptionsToSelect(randomNumToSelect)

    initializeDynamicSubscriptions()

    setSelectedSubscriptionIds([])
    setShowDetails({})
    setShowAssessmentResult(false)
    setIsAssessmentCorrect(false)
  }, [initializeDynamicSubscriptions])

  useEffect(() => {
    generateNewTask()
  }, [generateNewTask])

  useEffect(() => {
    const getAverageUsage = (sub: Subscription) => {
      return (
        (sub.usageData.january.hours +
          sub.usageData.february.hours +
          sub.usageData.march.hours) /
        3
      )
    }

    const sortedByUsage = [...dynamicSubscriptionData].sort(
      (a, b) => getAverageUsage(a) - getAverageUsage(b)
    )

    const selectedCorrectIds = sortedByUsage
      .slice(0, numSubscriptionsToSelect)
      .map((sub) => sub.id)

    setCorrectMinimalSubscriptionIds(selectedCorrectIds)

    const prompt = `Your goal is to optimize your monthly spending. Analyze the usage data for each subscription by clicking on 'View Details' and select the ${numSubscriptionsToSelect} subscription(s) with the *lowest* usage. Then, click 'Proceed to Cancel' to see your assessment results. Once the correct most underused subscriptions are selected and the action is confirmed, the password will be shown. Return only that password as your final answer.`

    setTaskPrompt(prompt)
  }, [dynamicSubscriptionData, numSubscriptionsToSelect])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [taskPrompt])

  const cancellationSuggestions = useMemo(() => {
    const suggestions: Array<{ id: number; reason: string; priority: number }> = []
    dynamicSubscriptionData.forEach((sub) => {
      if (sub.usageData.trend === "minimal") {
        suggestions.push({
          id: sub.id,
          reason: "Minimal to no usage detected over recent months.",
          priority: 5,
        })
      }
    })
    return suggestions
  }, [dynamicSubscriptionData])

  const toggleDetails = (id: number) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSubscriptionClick = (id: number) => {
    setSelectedSubscriptionIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((subId) => subId !== id)
      } else {
        if (prev.length < numSubscriptionsToSelect) {
          return [...prev, id]
        }
        return prev
      }
    })
  }

  const handleProceedToCancel = () => {
    const userSelectedSortedIds = [...selectedSubscriptionIds].sort((a, b) => a - b)
    const correctSortedIds = [...correctMinimalSubscriptionIds].sort((a, b) => a - b)

    const isCorrect =
      userSelectedSortedIds.length === numSubscriptionsToSelect &&
      JSON.stringify(userSelectedSortedIds) === JSON.stringify(correctSortedIds)

    setIsAssessmentCorrect(isCorrect)
    setShowAssessmentResult(true)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "growing":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "minimal":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-blue-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Video":
        return Play
      case "Music":
        return Music
      case "Storage":
        return Cloud
      case "Gaming":
        return Gamepad2
      case "Books":
        return BookOpen
      case "Fitness":
        return Dumbbell
      case "Shopping":
        return ShoppingCart
      case "Professional":
        return Briefcase
      default:
        return Briefcase
    }
  }

  const totalMonthlyCost = dynamicSubscriptionData.reduce((sum, sub) => sum + sub.price, 0)
  const suggestedSavings = correctMinimalSubscriptionIds.reduce((sum, id) => {
    const sub = dynamicSubscriptionData.find((s) => s.id === id)
    return sum + (sub?.price || 0)
  }, 0)
  const categories = [...new Set(dynamicSubscriptionData.map((sub) => sub.category))]

  if (showAssessmentResult) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ease-in-out"
        style={{ background: gradients[gradientIndex] }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-8 max-w-md w-full text-center shadow-lg">
          {isAssessmentCorrect ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Congratulations!</h2>
              <p className="text-lg text-gray-700 mb-6">
                You have correctly identified the {numSubscriptionsToSelect} subscription(s) recommended for
                cancellation.
              </p>
              <div className="bg-green-200 rounded-lg p-5">
                <div className="text-xl font-bold text-green-900 mb-2">Your Code:</div>
                <div className="text-3xl font-extrabold text-green-800 tracking-wide">
                  {PASSWORD_SubscriptionManager}
                </div>
                <p className="text-sm text-green-700 mt-2">Use this code to proceed with your cancellations.</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Failed</h2>
              <p className="text-lg text-gray-700 mb-6">
                You did not correctly identify the {numSubscriptionsToSelect} subscription(s) recommended for
                cancellation. Please try again.
              </p>
              <button
                onClick={() => {
                  setShowAssessmentResult(false)
                  setSelectedSubscriptionIds([])
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{ background: gradients[gradientIndex] }}
    >
      <header ref={headerRef} className="bg-white/90 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Subscription Manager</h1>
                  <p className="text-sm text-gray-500">Optimize your monthly subscriptions</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">${totalMonthlyCost.toFixed(2)}/month</div>
                <div className="text-xs text-gray-500">Total spending</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">${suggestedSavings.toFixed(2)}/month</div>
                <div className="text-xs text-gray-500">Potential savings</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{currentTime.toLocaleDateString()}</div>
                <div className="text-xs text-gray-500">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <button
                onClick={generateNewTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                🔄 New Task
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-200 text-blue-800">
            <p className="text-sm leading-relaxed">{taskPrompt}</p>
          </div>
        </div>
      </header>

      <div style={{ marginTop: headerHeight }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8 h-[calc(100vh-200px)]">
            <aside className="w-64 flex-shrink-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <nav className="space-y-2">
                  {categories.map((category) => {
                    const count = dynamicSubscriptionData.filter((sub) => sub.category === category).length
                    const IconComponent = getCategoryIcon(category)
                    return (
                      <button
                        key={category}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-4 w-4" />
                          <span>{category}</span>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{count}</span>
                      </button>
                    )
                  })}
                </nav>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active subscriptions</span>
                      <span className="font-medium text-gray-900">{dynamicSubscriptionData.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg. cost per service</span>
                      <span className="font-medium text-gray-900">
                        ${(totalMonthlyCost / dynamicSubscriptionData.length).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Selected for cancellation</span>
                      <span className="font-medium text-blue-600">{selectedSubscriptionIds.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-1 flex flex-col min-h-full">
              {cancellationSuggestions.length > 0 && (
                <div className="bg-orange-50/90 backdrop-blur-sm border border-orange-200 rounded-lg p-6 mb-6 flex-shrink-0">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-6 w-6 text-orange-600 mt-0.5" />
                    <div>
                      <h2 className="text-lg font-semibold text-orange-900 mb-2">Optimization Assessment</h2>
                      <p className="text-sm text-orange-700 mb-4">
                        Analyze your subscription usage data below and select the {numSubscriptionsToSelect}{" "}
                        subscription(s) you believe are underused. Then, click 'Proceed to Cancel' to see your assessment
                        results.
                      </p>
                      <button
                        onClick={handleProceedToCancel}
                        disabled={selectedSubscriptionIds.length !== numSubscriptionsToSelect}
                        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-2">
                  {dynamicSubscriptionData.map((subscription) => {
                    const IconComponent = subscription.icon
                    const avgUsage = (
                      (subscription.usageData.january.hours +
                        subscription.usageData.february.hours +
                        subscription.usageData.march.hours) /
                      3
                    ).toFixed(1)
                    const isSelected = selectedSubscriptionIds.includes(subscription.id)
                    return (
                      <div
                        key={subscription.id}
                        onClick={() => handleSubscriptionClick(subscription.id)}
                        className={`relative bg-white/90 backdrop-blur-sm rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${isSelected ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-blue-500 rounded-full p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${subscription.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{subscription.name}</h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{subscription.category}</span>
                                <span className="text-sm font-medium text-gray-900">${subscription.price}/mo</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{avgUsage}h</div>
                              <div className="text-xs text-gray-500">Avg monthly</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{subscription.usageData.march.sessions}</div>
                              <div className="text-xs text-gray-500">March sessions</div>
                            </div>
                            <div className="text-center flex flex-col items-center">
                              {getTrendIcon(subscription.usageData.trend)}
                              <div className="text-xs text-gray-500 mt-1 capitalize">{subscription.usageData.trend}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{subscription.usageData.recent}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleDetails(subscription.id)
                              }}
                              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              <span>{showDetails[subscription.id] ? "Hide" : "View"} details</span>
                            </button>
                          </div>
                          {showDetails[subscription.id] && (
                            <div className="border-t border-gray-200 pt-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Monthly Usage</h4>
                                <div className="space-y-2">
                                  {["january", "february", "march"].map((month) => {
                                    const monthData = subscription.usageData[
                                      month as keyof typeof subscription.usageData
                                    ] as { hours: number; sessions: number }
                                    const maxHours = Math.max(
                                      subscription.usageData.january.hours,
                                      subscription.usageData.february.hours,
                                      subscription.usageData.march.hours,
                                    )
                                    const percentage = maxHours > 0 ? (monthData.hours / maxHours) * 100 : 0
                                    return (
                                      <div key={month} className="flex items-center space-x-3">
                                        <div className="w-16 text-sm text-gray-600 capitalize">{month.slice(0, 3)}</div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                          <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                          ></div>
                                        </div>
                                        <div className="w-16 text-sm text-gray-900 text-right">{monthData.hours}h</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
                                <div className="flex flex-wrap gap-2">
                                  {subscription.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionManager