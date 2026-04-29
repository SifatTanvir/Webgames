import React, { useState, useEffect, useRef } from 'react'

export const TASK_ID_ChefAtHomeScheduler = 'ebooking-scheduling-chefhome'
export const PASSWORD_ChefAtHomeScheduler = 'culinary'

interface Chef {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  priceRange: string
  image: string
  featured: boolean
}

interface MenuItem {
  id: string
  name: string
  category: string
  prepTime: string
  difficulty: string
  dietary: string[]
}

interface KitchenItem {
  id: string
  name: string
  category: string
  required: boolean
}

interface CorrectAnswers {
  selectedChef: string
  selectedMenuItems: string[]
  checkedKitchenItems: string[]
  depositAmount: string
  paymentMethod: string
}

const ChefAtHomeScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedChef, setSelectedChef] = useState('')
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([])
  const [checkedKitchenItems, setCheckedKitchenItems] = useState<string[]>([])
  const [depositAmount, setDepositAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showGenericSuccess, setShowGenericSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [taskPrompt, setTaskPrompt] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState<CorrectAnswers>({
    selectedChef: '',
    selectedMenuItems: [],
    checkedKitchenItems: [],
    depositAmount: '',
    paymentMethod: '',
  })

  // Dynamic data
  const [chefs, setChefs] = useState<Chef[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([])
  const [layoutStyle, setLayoutStyle] = useState<'cards' | 'grid' | 'list'>(
    'cards',
  )
  const [colorTheme, setColorTheme] = useState<'orange' | 'green' | 'purple'>(
    'orange',
  )

  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [taskPrompt])

  const generateRandomData = () => {
    // Randomize layout and theme
    const layouts: ('cards' | 'grid' | 'list')[] = ['cards', 'grid', 'list']
    const themes: ('orange' | 'green' | 'purple')[] = [
      'orange',
      'green',
      'purple',
    ]

    setLayoutStyle(layouts[Math.floor(Math.random() * layouts.length)])
    setColorTheme(themes[Math.floor(Math.random() * themes.length)])

    // Generate random chefs
    const chefNames = [
      'Marco Benedetti',
      'Sofia Chen',
      'Antoine Dubois',
      'Isabella Rodriguez',
      'Rajesh Patel',
      'Emma Thompson',
    ]
    const specialties = [
      'Italian',
      'Asian Fusion',
      'French',
      'Mediterranean',
      'Indian',
      'Modern European',
    ]
    const experiences = [
      '5+ years',
      '8+ years',
      '10+ years',
      '12+ years',
      '15+ years',
    ]
    const priceRanges = [
      '$80-120/hr',
      '$100-150/hr',
      '$120-180/hr',
      '$150-200/hr',
    ]

    const randomChefs = chefNames.map((name, index) => ({
      id: `chef-${index + 1}`,
      name,
      specialty: specialties[index],
      rating: +(4.2 + Math.random() * 0.7).toFixed(1),
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      priceRange: priceRanges[Math.floor(Math.random() * priceRanges.length)],
      image: `https://picsum.photos/40/40?random=${index + 10}`,
      featured: Math.random() > 0.7,
    }))

    setChefs(randomChefs)

    // Generate random menu items
    const dishNames = [
      'Truffle Risotto',
      'Seared Duck Breast',
      'Lobster Thermidor',
      'Beef Wellington',
      'Chocolate Soufflé',
      'Pan-Seared Salmon',
      'Rack of Lamb',
      'Crème Brûlée',
      'Foie Gras Terrine',
      'Wild Mushroom Tart',
      'Seafood Paella',
      'Osso Buco',
    ]

    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Side Dish']
    const prepTimes = ['30 mins', '45 mins', '60 mins', '90 mins']
    const difficulties = ['Easy', 'Medium', 'Hard', 'Expert']
    const dietaryOptions = [
      ['Gluten-Free'],
      ['Vegetarian'],
      ['Dairy-Free'],
      ['Keto'],
      ['Vegan'],
      [],
    ]

    const randomMenuItems = dishNames.map((name, index) => ({
      id: `menu-${index + 1}`,
      name,
      category: categories[Math.floor(Math.random() * categories.length)],
      prepTime: prepTimes[Math.floor(Math.random() * prepTimes.length)],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      dietary:
        dietaryOptions[Math.floor(Math.random() * dietaryOptions.length)],
    }))

    setMenuItems(randomMenuItems)

    // Generate kitchen checklist
    const kitchenItemsList = [
      { name: 'Sharp Chef Knife', category: 'Tools', required: true },
      { name: 'Cutting Board', category: 'Tools', required: true },
      { name: 'Cast Iron Pan', category: 'Cookware', required: false },
      { name: 'Stand Mixer', category: 'Appliances', required: false },
      { name: 'Fine Mesh Strainer', category: 'Tools', required: true },
      { name: 'Digital Scale', category: 'Tools', required: true },
      { name: 'Immersion Blender', category: 'Appliances', required: false },
      { name: 'Mandoline Slicer', category: 'Tools', required: false },
      { name: 'Thermometer', category: 'Tools', required: true },
      { name: 'Rolling Pin', category: 'Tools', required: false },
    ]

    const randomKitchenItems = kitchenItemsList.map((item, index) => ({
      id: `kitchen-${index + 1}`,
      ...item,
    }))

    setKitchenItems(randomKitchenItems)

    // Generate correct answers
    const correctChef =
      randomChefs.find((chef) => chef.featured) || randomChefs[0]
    const correctMenus = randomMenuItems
      .filter(
        (item) => item.difficulty === 'Medium' || item.difficulty === 'Hard',
      )
      .slice(0, 3)
    const requiredKitchenItems = randomKitchenItems.filter(
      (item) => item.required,
    )
    const depositAmounts = ['150', '200', '250', '300']
    const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer']

    const correctDeposit =
      depositAmounts[Math.floor(Math.random() * depositAmounts.length)]
    const correctPayment =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

    setCorrectAnswers({
      selectedChef: correctChef.id,
      selectedMenuItems: correctMenus.map((item) => item.id),
      checkedKitchenItems: requiredKitchenItems.map((item) => item.id),
      depositAmount: correctDeposit,
      paymentMethod: correctPayment,
    })

    // Generate task prompt
    const prompt = `Your task is to book a private chef experience. You need Chef ${
      correctChef.name
    } who specializes in ${
      correctChef.specialty
    } cuisine. Choose the following sophisticated dishes for your menu: ${correctMenus
      .map((item) => item.name)
      .join(
        ', ',
      )}. Ensure all required kitchen equipment is checked: ${requiredKitchenItems
      .map((item) => item.name)
      .join(
        ', ',
      )}. Finally, pay a deposit of $${correctDeposit} using ${correctPayment}. Complete the booking process to reveal the password.`

    setTaskPrompt(prompt)
    resetForm()
  }

  const resetForm = () => {
    setCurrentStep(1)
    setSelectedChef('')
    setSelectedMenuItems([])
    setCheckedKitchenItems([])
    setDepositAmount('')
    setPaymentMethod('')
    setShowPassword(false)
    setShowGenericSuccess(false)
    setIsSubmitting(false)
  }

  useEffect(() => {
    generateRandomData()
  }, [])

  const getThemeClasses = () => {
    switch (colorTheme) {
      case 'orange':
        return {
          primary: 'bg-orange-600',
          secondary: 'bg-orange-50',
          accent: 'text-orange-600',
          border: 'border-orange-200',
          button: 'bg-orange-500 hover:bg-orange-600',
          header: 'bg-orange-600',
          card: 'border-orange-200',
        }
      case 'green':
        return {
          primary: 'bg-emerald-600',
          secondary: 'bg-emerald-50',
          accent: 'text-emerald-600',
          border: 'border-emerald-200',
          button: 'bg-emerald-500 hover:bg-emerald-600',
          header: 'bg-emerald-600',
          card: 'border-emerald-200',
        }
      case 'purple':
        return {
          primary: 'bg-purple-600',
          secondary: 'bg-purple-50',
          accent: 'text-purple-600',
          border: 'border-purple-200',
          button: 'bg-purple-500 hover:bg-purple-600',
          header: 'bg-purple-600',
          card: 'border-purple-200',
        }
    }
  }

  const themeClasses = getThemeClasses()

  const checkAnswers = () => {
    const menuMatches =
      correctAnswers.selectedMenuItems.every((id) =>
        selectedMenuItems.includes(id),
      ) && selectedMenuItems.length === correctAnswers.selectedMenuItems.length

    const kitchenMatches =
      correctAnswers.checkedKitchenItems.every((id) =>
        checkedKitchenItems.includes(id),
      ) &&
      checkedKitchenItems.length >= correctAnswers.checkedKitchenItems.length

    return (
      selectedChef === correctAnswers.selectedChef &&
      menuMatches &&
      kitchenMatches &&
      depositAmount === correctAnswers.depositAmount &&
      paymentMethod === correctAnswers.paymentMethod
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (checkAnswers()) {
      setShowPassword(true)
    } else {
      setShowGenericSuccess(true)
    }

    setIsSubmitting(false)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedChef
      case 2:
        return selectedMenuItems.length > 0
      case 3:
        return checkedKitchenItems.length > 0
      case 4:
        return !!depositAmount && !!paymentMethod
      default:
        return false
    }
  }

  const handleMenuToggle = (itemId: string) => {
    setSelectedMenuItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const handleKitchenToggle = (itemId: string) => {
    setCheckedKitchenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const getLayoutClasses = () => {
    switch (layoutStyle) {
      case 'cards':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-4 gap-4'
      case 'list':
        return 'space-y-4'
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
            <h1 className='text-2xl font-bold mb-2 flex items-center'>
              👨‍🍳 Chef-at-Home Scheduler
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
            showPassword || showGenericSuccess
              ? 'pointer-events-none opacity-60 select-none'
              : ''
          }
        >
          {/* Progress Steps */}
          <div className='mb-8'>
            <div className='flex items-center justify-center mb-6'>
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className='flex items-center'>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      currentStep >= step ? themeClasses.primary : 'bg-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-24 h-2 mx-4 rounded ${
                        currentStep > step
                          ? themeClasses.primary
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className='text-center'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {currentStep === 1
                  ? 'Select Your Chef'
                  : currentStep === 2
                  ? 'Choose Your Menu'
                  : currentStep === 3
                  ? 'Kitchen Checklist'
                  : 'Payment & Booking'}
              </h2>
            </div>
          </div>

          {/* Step 1: Chef Selection */}
          {currentStep === 1 && (
            <div className='bg-white rounded-xl shadow-lg p-8 mb-6'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-4xl'>👨‍🍳</span>
                <h3 className='text-2xl font-bold text-gray-800'>
                  Browse Chef Profiles
                </h3>
              </div>

              <div className={getLayoutClasses()}>
                {chefs.map((chef) => (
                  <div
                    key={chef.id}
                    onClick={() => setSelectedChef(chef.id)}
                    className={`cursor-pointer transition-all duration-200 border-2 rounded-xl p-6 ${
                      selectedChef === chef.id
                        ? `${themeClasses.card} ${themeClasses.secondary}`
                        : 'border-gray-200 hover:border-gray-300'
                    } ${chef.featured ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    {chef.featured && (
                      <div className='bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-3'>
                        FEATURED
                      </div>
                    )}
                    <div className='flex items-center gap-4 mb-4'>
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className='w-16 h-16 rounded-full object-cover'
                      />
                      <div>
                        <h4 className='font-bold text-lg text-gray-800'>
                          {chef.name}
                        </h4>
                        <p
                          className={`text-sm ${themeClasses.accent} font-medium`}
                        >
                          {chef.specialty}
                        </p>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-yellow-500'>⭐</span>
                        <span className='text-sm text-gray-600'>
                          {chef.rating} rating
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-gray-500'>📅</span>
                        <span className='text-sm text-gray-600'>
                          {chef.experience}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-gray-500'>💰</span>
                        <span className='text-sm text-gray-600'>
                          {chef.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Menu Selection */}
          {currentStep === 2 && (
            <div className='bg-white rounded-xl shadow-lg p-8 mb-6'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-4xl'>🍽️</span>
                <h3 className='text-2xl font-bold text-gray-800'>
                  Select Menu Items
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleMenuToggle(item.id)}
                    className={`cursor-pointer transition-all duration-200 border-2 rounded-xl p-6 ${
                      selectedMenuItems.includes(item.id)
                        ? `${themeClasses.card} ${themeClasses.secondary}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <h4 className='font-bold text-lg text-gray-800'>
                        {item.name}
                      </h4>
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selectedMenuItems.includes(item.id)
                            ? `${themeClasses.primary} border-transparent`
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMenuItems.includes(item.id) && (
                          <span className='text-white text-sm'>✓</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${themeClasses.secondary} ${themeClasses.accent}`}
                      >
                        {item.category}
                      </span>
                      <div className='flex items-center gap-4 text-sm text-gray-600'>
                        <span>⏱️ {item.prepTime}</span>
                        <span>📊 {item.difficulty}</span>
                      </div>
                      {item.dietary.length > 0 && (
                        <div className='flex flex-wrap gap-1'>
                          {item.dietary.map((diet) => (
                            <span
                              key={diet}
                              className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'
                            >
                              {diet}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Kitchen Checklist */}
          {currentStep === 3 && (
            <div className='bg-white rounded-xl shadow-lg p-8 mb-6'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-4xl'>🔪</span>
                <h3 className='text-2xl font-bold text-gray-800'>
                  Kitchen Equipment Checklist
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {kitchenItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleKitchenToggle(item.id)}
                    className={`cursor-pointer transition-all duration-200 border-2 rounded-xl p-4 ${
                      checkedKitchenItems.includes(item.id)
                        ? `${themeClasses.card} ${themeClasses.secondary}`
                        : 'border-gray-200 hover:border-gray-300'
                    } `}
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          checkedKitchenItems.includes(item.id)
                            ? `${themeClasses.primary} border-transparent`
                            : 'border-gray-300'
                        }`}
                      >
                        {checkedKitchenItems.includes(item.id) && (
                          <span className='text-white text-sm'>✓</span>
                        )}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-800'>
                          {item.name}
                        </h4>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-sm text-gray-600'>
                            {item.category}
                          </span>                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className='bg-white rounded-xl shadow-lg p-8 mb-6'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-4xl'>💳</span>
                <h3 className='text-2xl font-bold text-gray-800'>
                  Payment & Deposit
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    Deposit Amount ($)
                  </label>
                  <div className='space-y-3'>
                    {['150', '200', '250', '300'].map((amount) => (
                      <div
                        key={amount}
                        onClick={() => setDepositAmount(amount)}
                        className={`border-2 p-4 cursor-pointer transition-all duration-200 rounded-lg ${
                          depositAmount === amount
                            ? `${themeClasses.card} ${themeClasses.secondary}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              depositAmount === amount
                                ? `${themeClasses.primary} border-transparent`
                                : 'border-gray-300'
                            }`}
                          >
                            {depositAmount === amount && (
                              <div className='w-full h-full bg-white rounded-full scale-50' />
                            )}
                          </div>
                          <span className='font-medium text-gray-800'>
                            ${amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    Payment Method
                  </label>
                  <div className='space-y-3'>
                    {['Credit Card', 'PayPal', 'Bank Transfer'].map(
                      (method) => (
                        <div
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`border-2 p-4 cursor-pointer transition-all duration-200 rounded-lg ${
                            paymentMethod === method
                              ? `${themeClasses.card} ${themeClasses.secondary}`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                paymentMethod === method
                                  ? `${themeClasses.primary} border-transparent`
                                  : 'border-gray-300'
                              }`}
                            >
                              {paymentMethod === method && (
                                <div className='w-full h-full bg-white rounded-full scale-50' />
                              )}
                            </div>
                            <span className='font-medium text-gray-800'>
                              {method}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Password Display */}
        {showPassword && (
          <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-xl mb-6'>
            <div className='text-6xl mb-4'>🎉</div>
            <h2 className='text-3xl font-bold text-green-800 mb-4'>
              Chef Booking Confirmed!
            </h2>
            <p className='text-green-700 mb-6 text-lg'>
              Your private chef experience has been successfully scheduled.
            </p>
            <div className='bg-white border-2 border-green-300 rounded-xl p-6 inline-block shadow-lg'>
              <p className='text-sm text-gray-600 mb-2 font-medium'>
                Your Password:
              </p>
              <p className='text-4xl font-mono font-bold text-green-600 tracking-wide'>
                {PASSWORD_ChefAtHomeScheduler}
              </p>
            </div>
          </div>
        )}

        {/* Generic Success */}
        {showGenericSuccess && (
          <div
            className={`${themeClasses.secondary} border-2 ${themeClasses.border} rounded-xl p-8 text-center shadow-xl mb-6`}
          >
            <div className='text-6xl mb-4'>👨‍🍳</div>
            <h2 className={`text-2xl font-bold ${themeClasses.accent} mb-4`}>
              Booking Request Submitted!
            </h2>
            <p className={`${themeClasses.accent} text-lg`}>
              Your chef booking request has been received and is being
              processed.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className='flex justify-between items-center'>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={
              currentStep === 1 ||
              isSubmitting ||
              showPassword ||
              showGenericSuccess
            }
            className='px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            ← Previous
          </button>

          <div className='text-center'>
            <div className='text-sm text-gray-500 mb-2'>
              Step {currentStep} of 4
            </div>
            <div className='w-48 bg-gray-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${themeClasses.primary}`}
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed() || showPassword || showGenericSuccess}
              className={`px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.button}`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                !canProceed() ||
                isSubmitting ||
                showPassword ||
                showGenericSuccess
              }
              className={`px-8 py-3 text-white rounded-lg transition-all duration-200 ${
                isSubmitting ||
                showPassword ||
                showGenericSuccess ||
                !canProceed()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : themeClasses.button
              } font-medium`}
            >
              {isSubmitting ? (
                <span className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Processing...
                </span>
              ) : showPassword || showGenericSuccess ? (
                '✓ Completed'
              ) : (
                '🍴 Complete Booking'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChefAtHomeScheduler
