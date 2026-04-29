import React, { useState, useEffect, useRef } from 'react'

export const PASSWORD_PreDiabetesTracker = 'glucagon'
export const TASK_ID_PreDiabetesTracker = 'health-healthmanagement-diabetestracker'

interface LearningModule {
  id: string
  title: string
  category: 'nutrition' | 'exercise' | 'monitoring' | 'lifestyle'
  completed: boolean
  progress: number
  duration: string
  points: number
}

interface RecipeSwap {
  id: string
  original: string
  replacement: string
  carbReduction: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  implemented: boolean
}

interface HbA1cReading {
  date: string
  value: number
  clinic: string
  trend: 'improving' | 'stable' | 'concerning'
}

interface CorrectAnswers {
  completedModules: string[]
  implementedRecipes: string[]
  targetHbA1c: number
  exerciseGoal: number
  nutritionScore: number
}

interface DynamicSettings {
  dashboardLayout: 'grid' | 'cards' | 'sidebar'
  chartStyle: 'line' | 'bar' | 'area'
  colorTheme: 'blue' | 'green' | 'purple' | 'teal'
  displayDensity: 'compact' | 'comfortable' | 'spacious'
}

const PreDiabetesTracker: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([])
  const [recipes, setRecipes] = useState<RecipeSwap[]>([])
  const [hba1cData, setHba1cData] = useState<HbA1cReading[]>([])
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'modules' | 'recipes' | 'progress'
  >('dashboard')
  const [exerciseGoal, setExerciseGoal] = useState(150)
  const [nutritionScore, setNutritionScore] = useState(75)
  const [targetHbA1c, setTargetHbA1c] = useState(5.7)
  const [showPassword, setShowPassword] = useState(false)
  const [showGenericSuccess, setShowGenericSuccess] = useState(false)
  const [taskPrompt, setTaskPrompt] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState<CorrectAnswers>({
    completedModules: [],
    implementedRecipes: [],
    targetHbA1c: 5.7,
    exerciseGoal: 150,
    nutritionScore: 75,
  })
  const [dynamicSettings, setDynamicSettings] = useState<DynamicSettings>({
    dashboardLayout: 'grid',
    chartStyle: 'line',
    colorTheme: 'blue',
    displayDensity: 'comfortable',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [taskPrompt])

  const generateRandomData = () => {
    // Randomize dynamic settings
    const layouts: DynamicSettings['dashboardLayout'][] = [
      'grid',
      'cards',
      'sidebar',
    ]
    const chartStyles: DynamicSettings['chartStyle'][] = ['line', 'bar', 'area']
    const themes: DynamicSettings['colorTheme'][] = [
      'blue',
      'green',
      'purple',
      'teal',
    ]
    const densities: DynamicSettings['displayDensity'][] = [
      'compact',
      'comfortable',
      'spacious',
    ]

    setDynamicSettings({
      dashboardLayout: layouts[Math.floor(Math.random() * layouts.length)],
      chartStyle: chartStyles[Math.floor(Math.random() * chartStyles.length)],
      colorTheme: themes[Math.floor(Math.random() * themes.length)],
      displayDensity: densities[Math.floor(Math.random() * densities.length)],
    })

    // Generate learning modules
    const moduleTemplates = [
      {
        title: 'Understanding Blood Sugar Levels',
        category: 'monitoring' as const,
        duration: '15 min',
        points: 50,
      },
      {
        title: 'Carb Counting Basics',
        category: 'nutrition' as const,
        duration: '20 min',
        points: 75,
      },
      {
        title: 'Low-Impact Exercise Routines',
        category: 'exercise' as const,
        duration: '25 min',
        points: 60,
      },
      {
        title: 'Stress Management Techniques',
        category: 'lifestyle' as const,
        duration: '18 min',
        points: 45,
      },
      {
        title: 'Reading Nutrition Labels',
        category: 'nutrition' as const,
        duration: '12 min',
        points: 40,
      },
      {
        title: 'Building Healthy Habits',
        category: 'lifestyle' as const,
        duration: '30 min',
        points: 80,
      },
      {
        title: 'Home Glucose Testing',
        category: 'monitoring' as const,
        duration: '16 min',
        points: 55,
      },
      {
        title: 'Strength Training for Beginners',
        category: 'exercise' as const,
        duration: '22 min',
        points: 65,
      },
    ]

    const generatedModules = moduleTemplates.map((template, index) => ({
      id: `module-${index}`,
      ...template,
      completed: false, // Don't auto-fill
      progress: 0, // Start at 0
    }))
    setModules(generatedModules)

    // Generate recipe swaps
    const recipeTemplates = [
      {
        original: 'White Rice',
        replacement: 'Cauliflower Rice',
        carbReduction: 85,
        difficulty: 'easy' as const,
        category: 'Side Dishes',
      },
      {
        original: 'Regular Pasta',
        replacement: 'Zucchini Noodles',
        carbReduction: 90,
        difficulty: 'medium' as const,
        category: 'Main Dishes',
      },
      {
        original: 'Sugar Cookies',
        replacement: 'Almond Flour Cookies',
        carbReduction: 60,
        difficulty: 'hard' as const,
        category: 'Desserts',
      },
      {
        original: 'Mashed Potatoes',
        replacement: 'Mashed Turnips',
        carbReduction: 70,
        difficulty: 'easy' as const,
        category: 'Side Dishes',
      },
      {
        original: 'Bread Crumbs',
        replacement: 'Crushed Pork Rinds',
        carbReduction: 95,
        difficulty: 'easy' as const,
        category: 'Coatings',
      },
      {
        original: 'Pizza Crust',
        replacement: 'Portobello Cap',
        carbReduction: 80,
        difficulty: 'medium' as const,
        category: 'Main Dishes',
      },
    ]

    const generatedRecipes = recipeTemplates.map((template, index) => ({
      id: `recipe-${index}`,
      ...template,
      implemented: false, // Don't auto-fill
    }))
    setRecipes(generatedRecipes)

    // Generate HbA1c data
    const clinics = [
      'City Health Center',
      'Family Medical Clinic',
      'Diabetes Care Center',
      'Primary Health Partners',
    ]
    const baseValue = 6.2 + Math.random() * 0.8 // 6.2 to 7.0
    const readings: HbA1cReading[] = []

    for (let i = 0; i < 4; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - (3 - i) * 3) // Quarterly readings
      const value = baseValue - i * 0.1 + (Math.random() * 0.2 - 0.1) // Generally improving trend
      readings.push({
        date: date.toLocaleDateString(),
        value: Math.round(value * 10) / 10,
        clinic: clinics[Math.floor(Math.random() * clinics.length)],
        trend:
          value < 6.5 ? 'improving' : value < 7.0 ? 'stable' : 'concerning',
      })
    }
    setHba1cData(readings)

    // Set correct answers
    function pickRandom(arr: any[], n: number) {
      return arr
        .map((a) => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .slice(0, n)
        .map((x) => x[1])
    }

    const eligibleModules = generatedModules.filter(
      (m) => m.category === 'nutrition' || m.category === 'monitoring',
    )
    const requiredModules = pickRandom(eligibleModules, 3).map((m) => m.id)


    const eligibleRecipes = generatedRecipes.filter(
      (r) => r.difficulty === 'easy' || r.carbReduction >= 80,
    )
    const requiredRecipes = pickRandom(eligibleRecipes, 2).map((r) => r.id)


    const correctTargetHbA1c = 5.5 + Math.round(Math.random() * 4) * 0.1 // 5.5, 5.6, 5.7, 5.8, 5.9
    const correctExerciseGoal = 120 + Math.floor(Math.random() * 4) * 30 // 120, 150, 180, 210
    const correctNutritionScore = 80 + Math.floor(Math.random() * 4) * 5 // 80, 85, 90, 95

    setCorrectAnswers({
      completedModules: requiredModules,
      implementedRecipes: requiredRecipes,
      targetHbA1c: correctTargetHbA1c,
      exerciseGoal: correctExerciseGoal,
      nutritionScore: correctNutritionScore,
    })

    // Generate task prompt with blob information
    const moduleNames = requiredModules
      .map((id) => generatedModules.find((m) => m.id === id)?.title)
      .join(', ')
    const recipeNames = requiredRecipes
      .map(
        (id) =>
          generatedRecipes.find((r) => r.id === id)?.original +
          ' → ' +
          generatedRecipes.find((r) => r.id === id)?.replacement,
      )
      .join(', ')

    const prompt = `Your task is to configure a comprehensive pre-diabetes management program that requires completion tracking across multiple health metrics. The current wellness assessment indicates optimal progress requires module completion in nutrition fundamentals and glucose monitoring areas, specifically: ${moduleNames}. Recipe implementation should focus on high-impact carbohydrate reductions including ${recipeNames}. Clinical targets suggest HbA1c goal of ${correctTargetHbA1c}% with weekly exercise commitment of ${correctExerciseGoal} minutes. Nutritional adherence scoring should achieve ${correctNutritionScore}% to demonstrate mastery. The integrated tracking system will validate completion across all components and generate certification credentials upon meeting the established wellness benchmarks and reveal the password.`

    setTaskPrompt(prompt)

    // Reset state - no auto-filling
    setCurrentTab('dashboard')
    setExerciseGoal(150) // Default middle value
    setNutritionScore(75) // Default middle value
    setTargetHbA1c(6.0) // Default middle value
    setShowPassword(false)
    setShowGenericSuccess(false)
    setIsSubmitting(false)
  }

  useEffect(() => {
    generateRandomData()
  }, [])

  const getThemeClasses = () => {
    const themes = {
      blue: {
        primary: 'bg-blue-600',
        secondary: 'bg-blue-50',
        accent: 'text-blue-600',
        border: 'border-blue-200',
        button: 'bg-blue-500 hover:bg-blue-600',
        header: 'bg-blue-600',
        gradient: 'from-blue-500 to-blue-600',
      },
      green: {
        primary: 'bg-green-600',
        secondary: 'bg-green-50',
        accent: 'text-green-600',
        border: 'border-green-200',
        button: 'bg-green-500 hover:bg-green-600',
        header: 'bg-green-600',
        gradient: 'from-green-500 to-green-600',
      },
      purple: {
        primary: 'bg-purple-600',
        secondary: 'bg-purple-50',
        accent: 'text-purple-600',
        border: 'border-purple-200',
        button: 'bg-purple-500 hover:bg-purple-600',
        header: 'bg-purple-600',
        gradient: 'from-purple-500 to-purple-600',
      },
      teal: {
        primary: 'bg-teal-600',
        secondary: 'bg-teal-50',
        accent: 'text-teal-600',
        border: 'border-teal-200',
        button: 'bg-teal-500 hover:bg-teal-600',
        header: 'bg-teal-600',
        gradient: 'from-teal-500 to-teal-600',
      },
    }
    return themes[dynamicSettings.colorTheme]
  }

  const toggleModuleCompletion = (moduleId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              completed: !module.completed,
              progress: module.completed ? 0 : 100,
            }
          : module,
      ),
    )
  }

  const toggleRecipeImplementation = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, implemented: !recipe.implemented }
          : recipe,
      ),
    )
  }

  const checkAnswers = () => {
    const completedModuleIds = modules
      .filter((m) => m.completed)
      .map((m) => m.id)
    const implementedRecipeIds = recipes
      .filter((r) => r.implemented)
      .map((r) => r.id)

    const modulesMatch = correctAnswers.completedModules.every((id) =>
      completedModuleIds.includes(id),
    )
    const recipesMatch = correctAnswers.implementedRecipes.every((id) =>
      implementedRecipeIds.includes(id),
    )

    return (
      modulesMatch &&
      recipesMatch &&
      targetHbA1c === correctAnswers.targetHbA1c &&
      exerciseGoal === correctAnswers.exerciseGoal &&
      nutritionScore === correctAnswers.nutritionScore
    )
  }

  const validateRequiredInputs = () => {
    // Check if at least one module is completed
    const hasCompletedModules = modules.some((m) => m.completed)

    // Check if at least one recipe is implemented
    const hasImplementedRecipes = recipes.some((r) => r.implemented)

    // Check if user has adjusted sliders from default values
    const hasAdjustedHbA1c = targetHbA1c !== 6.0 // Default is 6.0
    const hasAdjustedExercise = exerciseGoal !== 150 // Default is 150
    const hasAdjustedNutrition = nutritionScore !== 75 // Default is 75

    // All validation must pass
    return (
      hasCompletedModules &&
      hasImplementedRecipes &&
      hasAdjustedHbA1c &&
      hasAdjustedExercise &&
      hasAdjustedNutrition
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (checkAnswers()) {
      setShowPassword(true)
      setShowGenericSuccess(false)
    } else {
      setShowPassword(false)
      setShowGenericSuccess(true)
    }

    setIsSubmitting(false)
  }

  const themeClasses = getThemeClasses()

  const getDashboardLayoutClasses = () => {
    switch (dynamicSettings.dashboardLayout) {
      case 'grid':
        return 'grid grid-cols-1 lg:grid-cols-3 gap-6'
      case 'cards':
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'
      case 'sidebar':
        return 'grid grid-cols-1 lg:grid-cols-4 gap-6'
    }
  }

  const getPaddingClasses = () => {
    switch (dynamicSettings.displayDensity) {
      case 'compact':
        return 'p-3'
      case 'comfortable':
        return 'p-4'
      case 'spacious':
        return 'p-6'
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      nutrition: '🥗',
      exercise: '💪',
      monitoring: '📊',
      lifestyle: '🌱',
    }
    return icons[category as keyof typeof icons] || '📚'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 ${themeClasses.header} text-white shadow-lg`}
      >
        <div className='max-w-7xl mx-auto flex justify-between items-start p-4'>
          <div className='flex-1 mr-4'>
            <h1 className='text-lg font-bold mb-2 flex items-center'>
              🩺 Pre-Diabetes Course Tracker
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
        {/* Navigation Tabs */}
        <div className='mb-8'>
          <div className='flex flex-wrap gap-2 border-b border-gray-200'>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'modules', label: 'Learning Modules', icon: '📚' },
              { id: 'recipes', label: 'Recipe Swaps', icon: '🍽️' },
              { id: 'progress', label: 'Goals & Progress', icon: '🎯' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  currentTab === tab.id
                    ? `${themeClasses.primary} text-white`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                disabled={showPassword || showGenericSuccess || isSubmitting}
              >
                <span className='mr-2'>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={
            showPassword || showGenericSuccess
              ? 'pointer-events-none opacity-60'
              : ''
          }
        >
          {/* Dashboard Tab */}
          {currentTab === 'dashboard' && (
            <div className={getDashboardLayoutClasses()}>
              {/* HbA1c Chart */}
              <div
                className={`${
                  dynamicSettings.dashboardLayout === 'sidebar'
                    ? 'lg:col-span-2'
                    : ''
                } bg-white rounded-xl shadow-lg border border-gray-200 ${getPaddingClasses()}`}
              >
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  📈 HbA1c Trends
                </h3>
                <div className='space-y-3'>
                  {hba1cData.map((reading, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <div>
                        <div className='font-medium text-gray-900'>
                          {reading.value}%
                        </div>
                        <div className='text-sm text-gray-600'>
                          {reading.date}
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm text-gray-600'>
                          {reading.clinic}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            reading.trend === 'improving'
                              ? 'bg-green-100 text-green-800'
                              : reading.trend === 'stable'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reading.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Overview */}
              <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-4'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  📊 Progress Overview
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Modules Completed</span>
                      <span>
                        {modules.filter((m) => m.completed).length}/
                        {modules.length}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`${themeClasses.primary} h-2 rounded-full`}
                        style={{
                          width: `${
                            (modules.filter((m) => m.completed).length /
                              modules.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Recipes Implemented</span>
                      <span>
                        {recipes.filter((r) => r.implemented).length}/
                        {recipes.length}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`${themeClasses.primary} h-2 rounded-full`}
                        style={{
                          width: `${
                            (recipes.filter((r) => r.implemented).length /
                              recipes.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-4'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  🎯 Current Goals
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Target HbA1c</span>
                    <span className='font-bold'>{targetHbA1c}%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Exercise Goal</span>
                    <span className='font-bold'>{exerciseGoal} min/week</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Nutrition Score</span>
                    <span className='font-bold'>{nutritionScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Modules Tab */}
          {currentTab === 'modules' && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {modules.map((module) => (
                <div
                  key={module.id}
                  className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'
                >
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>
                        {getCategoryIcon(module.category)}
                      </span>
                      <div>
                        <h3 className='font-bold text-gray-900'>
                          {module.title}
                        </h3>
                        <p className='text-sm text-gray-600 capitalize'>
                          {module.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleModuleCompletion(module.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        module.completed
                          ? `${themeClasses.primary} border-transparent`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      disabled={
                        showPassword || showGenericSuccess || isSubmitting
                      }
                    >
                      {module.completed && (
                        <span className='text-white text-sm'>✓</span>
                      )}
                    </button>
                  </div>

                  <div className='mb-4'>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`${themeClasses.primary} h-2 rounded-full transition-all`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className='flex justify-between items-center text-sm text-gray-600'>
                    <span>{module.duration}</span>
                    <span>{module.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recipe Swaps Tab */}
          {currentTab === 'recipes' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'
                >
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='font-bold text-gray-900'>
                          {recipe.original}
                        </h3>
                        <span className='text-gray-400'>→</span>
                        <h3 className='font-bold text-green-600'>
                          {recipe.replacement}
                        </h3>
                      </div>
                      <p className='text-sm text-gray-600'>{recipe.category}</p>
                    </div>
                    <button
                      onClick={() => toggleRecipeImplementation(recipe.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        recipe.implemented
                          ? `${themeClasses.primary} text-white`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      disabled={
                        showPassword || showGenericSuccess || isSubmitting
                      }
                    >
                      {recipe.implemented ? 'Implemented' : 'Try This'}
                    </button>
                  </div>

                  <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center gap-1'>
                      <span className='text-green-600 font-bold'>
                        -{recipe.carbReduction}%
                      </span>
                      <span className='text-gray-600'>carbs</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                        recipe.difficulty,
                      )}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Goals & Progress Tab */}
          {currentTab === 'progress' && (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  🎯 Health Goals
                </h3>

                <div className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      Target HbA1c Level: {targetHbA1c}%
                    </label>
                    <input
                      type='range'
                      min='5.5'
                      max='6.5'
                      step='0.1'
                      value={targetHbA1c}
                      onChange={(e) =>
                        setTargetHbA1c(parseFloat(e.target.value))
                      }
                      className='w-full'
                      disabled={
                        showPassword || showGenericSuccess || isSubmitting
                      }
                    />
                    <div className='flex justify-between text-xs text-gray-500 mt-1'>
                      <span>5.5%</span>
                      <span>6.5%</span>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      Weekly Exercise Goal: {exerciseGoal} minutes
                    </label>
                    <input
                      type='range'
                      min='90'
                      max='300'
                      step='30'
                      value={exerciseGoal}
                      onChange={(e) =>
                        setExerciseGoal(parseInt(e.target.value))
                      }
                      className='w-full'
                      disabled={
                        showPassword || showGenericSuccess || isSubmitting
                      }
                    />
                    <div className='flex justify-between text-xs text-gray-500 mt-1'>
                      <span>90 min</span>
                      <span>300 min</span>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      Nutrition Adherence Score: {nutritionScore}%
                    </label>
                    <input
                      type='range'
                      min='60'
                      max='100'
                      step='5'
                      value={nutritionScore}
                      onChange={(e) =>
                        setNutritionScore(parseInt(e.target.value))
                      }
                      className='w-full'
                      disabled={
                        showPassword || showGenericSuccess || isSubmitting
                      }
                    />
                    <div className='flex justify-between text-xs text-gray-500 mt-1'>
                      <span>60%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  📈 Progress Analytics
                </h3>

                <div className='space-y-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='text-center p-4 bg-blue-50 rounded-lg'>
                      <div className='text-2xl font-bold text-blue-600'>
                        {modules.filter((m) => m.completed).length}
                      </div>
                      <div className='text-sm text-gray-600'>
                        Modules Completed
                      </div>
                    </div>
                    <div className='text-center p-4 bg-green-50 rounded-lg'>
                      <div className='text-2xl font-bold text-green-600'>
                        {recipes.filter((r) => r.implemented).length}
                      </div>
                      <div className='text-sm text-gray-600'>Recipes Tried</div>
                    </div>
                  </div>

                  <div className='p-4 bg-yellow-50 rounded-lg'>
                    <h4 className='font-medium text-gray-900 mb-2'>
                      Latest HbA1c Reading
                    </h4>
                    <div className='flex justify-between items-center'>
                      <span className='text-2xl font-bold text-yellow-600'>
                        {hba1cData[hba1cData.length - 1]?.value}%
                      </span>
                      <span className='text-sm text-gray-600'>
                        {hba1cData[hba1cData.length - 1]?.date}
                      </span>
                    </div>
                  </div>

                  <div className='p-4 bg-purple-50 rounded-lg'>
                    <h4 className='font-medium text-gray-900 mb-2'>
                      Total Points Earned
                    </h4>
                    <div className='text-2xl font-bold text-purple-600'>
                      {modules
                        .filter((m) => m.completed)
                        .reduce((sum, module) => sum + module.points, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation and Submit Buttons */}
        <div className='mt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
          {/* Next Steps Button */}
          <button
            onClick={() => {
              const tabs = ['dashboard', 'modules', 'recipes', 'progress']
              const currentIndex = tabs.indexOf(currentTab)
              if (currentIndex < tabs.length - 1) {
                setCurrentTab(tabs[currentIndex + 1] as any)
              }
            }}
            disabled={
              currentTab === 'progress' ||
              showPassword ||
              showGenericSuccess ||
              isSubmitting
            }
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentTab === 'progress' ||
              showPassword ||
              showGenericSuccess ||
              isSubmitting
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : `${themeClasses.border} border-2 ${themeClasses.accent} hover:${themeClasses.secondary} hover:shadow-md`
            }`}
          >
            {currentTab === 'dashboard'
              ? '📚 View Learning Modules'
              : currentTab === 'modules'
              ? '🍽️ Check Recipe Swaps'
              : currentTab === 'recipes'
              ? '🎯 Set Goals & Progress'
              : '✓ All Steps Complete'}
          </button>

          {/* Main Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              !validateRequiredInputs() ||
              isSubmitting ||
              showPassword ||
              showGenericSuccess
            }
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              !validateRequiredInputs() ||
              isSubmitting ||
              showPassword ||
              showGenericSuccess
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : `bg-gradient-to-r ${themeClasses.gradient} text-white hover:shadow-lg transform hover:scale-105`
            }`}
          >
            {isSubmitting ? (
              <span className='flex items-center gap-3'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Updating Progress...
              </span>
            ) : showPassword || showGenericSuccess ? (
              '✓ Program Completed'
            ) : !validateRequiredInputs() ? (
              '⚠️ Complete the tracker'
            ) : (
              '🚀 Update & Sync Progress'
            )}
          </button>
        </div>

        {/* Requirements Checklist */}
        {!validateRequiredInputs() && !showPassword && !showGenericSuccess && (
          <div className='mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6'>
            <h3 className='text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2'>
              ⚠️ Complete These Steps to Continue:
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <div
                  className={`flex items-center gap-2 ${
                    modules.some((m) => m.completed)
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  <span>{modules.some((m) => m.completed) ? '✅' : '❌'}</span>
                  <span className='text-sm'>
                    Complete at least one learning module
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    recipes.some((r) => r.implemented)
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  <span>
                    {recipes.some((r) => r.implemented) ? '✅' : '❌'}
                  </span>
                  <span className='text-sm'>
                    Implement at least one recipe swap
                  </span>
                </div>
              </div>
              <div className='space-y-2'>
                <div
                  className={`flex items-center gap-2 ${
                    targetHbA1c !== 6.0 ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  <span>{targetHbA1c !== 6.0 ? '✅' : '❌'}</span>
                  <span className='text-sm'>
                    Adjust HbA1c target from default value
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    exerciseGoal !== 150 ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  <span>{exerciseGoal !== 150 ? '✅' : '❌'}</span>
                  <span className='text-sm'>
                    Adjust exercise goal from default value
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    nutritionScore !== 75 ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  <span>{nutritionScore !== 75 ? '✅' : '❌'}</span>
                  <span className='text-sm'>
                    Adjust nutrition score from default value
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Messages */}
        {showPassword && (
          <div className='mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>🎉</div>
            <h2 className='text-3xl font-bold text-green-800 mb-4'>
              Pre-Diabetes Program Completed!
            </h2>
            <p className='text-green-700 mb-6 text-lg'>
              Congratulations! You've successfully completed your wellness
              tracking and achieved all target metrics.
            </p>
            <div className='bg-white border-2 border-green-300 rounded-xl p-6 inline-block shadow-lg'>
              <p className='text-sm text-gray-600 mb-2 font-medium'>
                Your Certification Password:
              </p>
              <p className='text-4xl font-mono font-bold text-green-600 tracking-wide'>
                {PASSWORD_PreDiabetesTracker}
              </p>
            </div>
          </div>
        )}

        {showGenericSuccess && (
          <div className='mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>📊</div>
            <h2 className='text-2xl font-bold text-blue-800 mb-4'>
              Progress Updated Successfully!
            </h2>
            <p className='text-blue-700 text-lg'>
              Your pre-diabetes management data has been synchronized across all
              tracking systems.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreDiabetesTracker
