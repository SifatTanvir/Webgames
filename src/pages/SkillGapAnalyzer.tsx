import { useState, useEffect, useRef, useCallback } from 'react'

export const TASK_ID_SkillGapAnalyzer = 'projectmanage-portifolio-skillgap'
export const PASSWORD_SkillGapAnalyzer = 'alignment'

interface Staff {
  id: string
  name: string
  department: string
  skills: string[]
  experience: number
  availability: 'Available' | 'Busy' | 'On Leave'
  rating: number
  avatar: string
}

interface Deliverable {
  id: string
  project: string
  title: string
  requiredSkills: string[]
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  deadline: string
  complexity: number
  status: 'Pending' | 'In Progress' | 'Blocked'
}

interface HireRecommendation {
  id: string
  role: string
  skills: string[]
  urgency: 'Low' | 'Medium' | 'High'
  budget: string
  department: string
}

interface CorrectAnswers {
  selectedDeliverable: string
  assignedStaff: string[]
  selectedRecommendation: string
  analysisDepth: string
}

interface DynamicStyles {
  layout: 'kanban' | 'timeline' | 'matrix'
  colorScheme: 'coral' | 'emerald' | 'violet' | 'amber'
  panelStyle: 'split' | 'overlay' | 'tabbed'
}

const SkillGapAnalyzer = () => {
  const [activePanel, setActivePanel] = useState('deliverables')
  const [selectedDeliverable, setSelectedDeliverable] = useState('')
  const [assignedStaff, setAssignedStaff] = useState<string[]>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState('')
  const [analysisDepth, setAnalysisDepth] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showGenericSuccess, setShowGenericSuccess] = useState(false)
  const [taskPrompt, setTaskPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const [correctAnswers, setCorrectAnswers] = useState<CorrectAnswers>({
    selectedDeliverable: '',
    assignedStaff: [],
    selectedRecommendation: '',
    analysisDepth: '',
  })

  const [dynamicStyles, setDynamicStyles] = useState<DynamicStyles>({
    layout: 'kanban',
    colorScheme: 'coral',
    panelStyle: 'split',
  })

  const [staff, setStaff] = useState<Staff[]>([])
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [hireRecommendations, setHireRecommendations] = useState<
    HireRecommendation[]
  >([])

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [taskPrompt])

  const generateRandomData = () => {
    // Random styles
    const layouts: DynamicStyles['layout'][] = ['kanban', 'timeline', 'matrix']
    const colorSchemes: DynamicStyles['colorScheme'][] = [
      'coral',
      'emerald',
      'violet',
      'amber',
    ]
    const panelStyles: DynamicStyles['panelStyle'][] = [
      'split',
      'overlay',
      'tabbed',
    ]

    setDynamicStyles({
      layout: layouts[Math.floor(Math.random() * layouts.length)],
      colorScheme:
        colorSchemes[Math.floor(Math.random() * colorSchemes.length)],
      panelStyle: panelStyles[Math.floor(Math.random() * panelStyles.length)],
    })

    // Generate staff data
    const staffNames = [
      'Alex Rivera',
      'Sam Chen',
      'Jordan Kim',
      'Taylor Wu',
      'Casey Davis',
      'Morgan Lee',
      'Avery Smith',
      'Riley Johnson',
      'Quinn Rodriguez',
      'Blake Thompson',
    ]

    const departments = [
      'Frontend',
      'Backend',
      'DevOps',
      'Design',
      'QA',
      'Data',
    ]
    const skillsPool = [
      'React',
      'Vue.js',
      'Node.js',
      'Python',
      'Go',
      'Rust',
      'TypeScript',
      'GraphQL',
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Figma',
      'Sketch',
      'Testing',
      'Analytics',
      'Machine Learning',
      'Blockchain',
      'Mobile Dev',
      'Security',
    ]

    const avatars = ['🧑‍💻', '👩‍💼', '🧑‍🎨', '👨‍🔬', '👩‍🚀', '🧑‍🏭', '👨‍💻', '👩‍🔧', '🧑‍🎤', '👨‍🎨']

    const randomStaff: Staff[] = staffNames.map((name, index) => ({
      id: `staff-${index + 1}`,
      name,
      department: departments[Math.floor(Math.random() * departments.length)],
      skills: skillsPool
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 3),
      experience: Math.floor(Math.random() * 8) + 1,
      availability: ['Available', 'Busy', 'On Leave'][
        Math.floor(Math.random() * 3)
      ] as Staff['availability'],
      rating: Math.floor(Math.random() * 3) + 3,
      avatar: avatars[index],
    }))

    setStaff(randomStaff)

    // Generate deliverables
    const projectNames = [
      'Payment Gateway v2',
      'Mobile SDK',
      'Analytics Engine',
      'User Dashboard',
      'API Gateway',
      'ML Pipeline',
      'Security Audit',
      'Performance Optimization',
    ]

    const randomDeliverables: Deliverable[] = projectNames
      .slice(0, 5)
      .map((project, index) => ({
        id: `deliverable-${index + 1}`,
        project,
        title: `${project} Implementation`,
        requiredSkills: skillsPool
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2),
        priority: ['Low', 'Medium', 'High', 'Critical'][
          Math.floor(Math.random() * 4)
        ] as Deliverable['priority'],
        deadline: `2025-${String(Math.floor(Math.random() * 6) + 7).padStart(
          2,
          '0',
        )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        complexity: Math.floor(Math.random() * 5) + 3,
        status: ['Pending', 'In Progress', 'Blocked'][
          Math.floor(Math.random() * 3)
        ] as Deliverable['status'],
      }))

    setDeliverables(randomDeliverables)

    // Generate hire recommendations
    const roles = [
      'Senior Full-Stack Developer',
      'DevOps Specialist',
      'UX Designer',
      'Data Engineer',
      'Security Engineer',
      'Mobile Developer',
    ]

    const randomRecommendations: HireRecommendation[] = roles
      .slice(0, 4)
      .map((role, index) => ({
        id: `hire-${index + 1}`,
        role,
        skills: skillsPool
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2),
        urgency: ['Low', 'Medium', 'High'][
          Math.floor(Math.random() * 3)
        ] as HireRecommendation['urgency'],
        budget: `$${Math.floor(Math.random() * 40) + 90}k - $${
          Math.floor(Math.random() * 40) + 130
        }k`,
        department: departments[Math.floor(Math.random() * departments.length)],
      }))

    setHireRecommendations(randomRecommendations)

    // Set correct answers
    const criticalDeliverable =
      randomDeliverables.find((d) => d.priority === 'Critical') ||
      randomDeliverables[0]
    const availableStaff = randomStaff.filter(
      (s) => s.availability === 'Available',
    )
    const bestMatches = availableStaff
      .filter((s) =>
        s.skills.some((skill) =>
          criticalDeliverable.requiredSkills.includes(skill),
        ),
      )
      .slice(0, 2)

    const urgentRecommendation =
      randomRecommendations.find((r) => r.urgency === 'High') ||
      randomRecommendations[0]

    setCorrectAnswers({
      selectedDeliverable: criticalDeliverable.id,
      assignedStaff: bestMatches.map((s) => s.id),
      selectedRecommendation: urgentRecommendation.id,
      analysisDepth: 'Deep Analysis',
    })

    // Generate task prompt
    const prompt = `The skill-gap analyzer has identified critical staffing bottlenecks across project portfolios. Analysis indicates deliverable ${
      criticalDeliverable.title
    } requires urgent attention with ${criticalDeliverable.priority.toLowerCase()} priority status and ${
      criticalDeliverable.deadline
    } deadline. Available team members ${bestMatches
      .map((s) => s.name)
      .join(' and ')} show skill alignment in ${bestMatches
      .flatMap((s) => s.skills)
      .filter(
        (skill, index, arr) =>
          arr.indexOf(skill) === index &&
          criticalDeliverable.requiredSkills.includes(skill),
      )
      .join(', ')} areas. Hiring pipeline shows ${
      urgentRecommendation.role
    } position flagged as ${urgentRecommendation.urgency.toLowerCase()} priority for ${
      urgentRecommendation.department
    } department to address skill gaps in ${urgentRecommendation.skills.join(
      ', ',
    )}. Configure Deep Analysis mode to generate comprehensive staffing matrix and unlock system access.`

    setTaskPrompt(prompt)

    // Reset form
    setSelectedDeliverable('')
    setAssignedStaff([])
    setSelectedRecommendation('')
    setAnalysisDepth('')
    setShowPassword(false)
    setShowGenericSuccess(false)
    setIsSubmitting(false)
    setActivePanel('deliverables')
  }

  useEffect(() => {
    generateRandomData()
  }, [])

  const checkAnswers = useCallback(() => {
    return (
      selectedDeliverable === correctAnswers.selectedDeliverable &&
      assignedStaff.length === correctAnswers.assignedStaff.length &&
      correctAnswers.assignedStaff.every((id) => assignedStaff.includes(id)) &&
      selectedRecommendation === correctAnswers.selectedRecommendation &&
      analysisDepth === correctAnswers.analysisDepth
    )
  }, [
    selectedDeliverable,
    assignedStaff,
    selectedRecommendation,
    analysisDepth,
    correctAnswers,
  ])

  const getThemeClasses = () => {
    const themes = {
      coral: {
        primary: 'bg-rose-500',
        secondary: 'bg-rose-50',
        accent: 'text-rose-600',
        border: 'border-rose-200',
        button: 'bg-rose-500 hover:bg-rose-600',
        header: 'bg-rose-600',
        panel: 'bg-rose-100',
      },
      emerald: {
        primary: 'bg-emerald-500',
        secondary: 'bg-emerald-50',
        accent: 'text-emerald-600',
        border: 'border-emerald-200',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        header: 'bg-emerald-600',
        panel: 'bg-emerald-100',
      },
      violet: {
        primary: 'bg-violet-500',
        secondary: 'bg-violet-50',
        accent: 'text-violet-600',
        border: 'border-violet-200',
        button: 'bg-violet-500 hover:bg-violet-600',
        header: 'bg-violet-600',
        panel: 'bg-violet-100',
      },
      amber: {
        primary: 'bg-amber-500',
        secondary: 'bg-amber-50',
        accent: 'text-amber-600',
        border: 'border-amber-200',
        button: 'bg-amber-500 hover:bg-amber-600',
        header: 'bg-amber-600',
        panel: 'bg-amber-100',
      },
    }
    return themes[dynamicStyles.colorScheme]
  }

  const themeClasses = getThemeClasses()

  const handleStaffToggle = (staffId: string) => {
    setAssignedStaff((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId],
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Low':
        return '🟢'
      case 'Medium':
        return '🟡'
      case 'High':
        return '🟠'
      case 'Critical':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'Available':
        return '✅'
      case 'Busy':
        return '⏳'
      case 'On Leave':
        return '🚫'
      default:
        return '❓'
    }
  }

  const isFormComplete = () => {
    return (
      selectedDeliverable &&
      assignedStaff.length > 0 &&
      selectedRecommendation &&
      analysisDepth
    )
  }

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'deliverables':
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              📋 Project Deliverables
            </h3>
            {deliverables.map((deliverable) => (
              <div
                key={deliverable.id}
                onClick={() => setSelectedDeliverable(deliverable.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedDeliverable === deliverable.id
                    ? `${themeClasses.border} ${themeClasses.secondary}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-lg'>
                      {getPriorityIcon(deliverable.priority)}
                    </span>
                    <h4 className='font-semibold'>{deliverable.title}</h4>
                  </div>
                  <span className='text-xs bg-gray-100 px-2 py-1 rounded'>
                    {deliverable.status}
                  </span>
                </div>
                <div className='text-sm text-gray-600 mb-2'>
                  Due: {deliverable.deadline}
                </div>
                <div className='flex flex-wrap gap-1 mb-2'>
                  {deliverable.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className='flex justify-between text-xs text-gray-500'>
                  <span>Complexity: {deliverable.complexity}/8</span>
                  <span>{deliverable.priority} Priority</span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'staff':
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              👥 Team Members
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {staff.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleStaffToggle(member.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    assignedStaff.includes(member.id)
                      ? `${themeClasses.border} ${themeClasses.secondary}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-start gap-3'>
                    <span className='text-2xl'>{member.avatar}</span>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-1'>
                        <h4 className='font-semibold'>{member.name}</h4>
                        <span className='text-lg'>
                          {getAvailabilityIcon(member.availability)}
                        </span>
                      </div>
                      <div className='text-sm text-gray-600 mb-2'>
                        {member.department} • {member.experience}y exp
                      </div>
                      <div className='flex items-center gap-1 mb-2'>
                        {'★'.repeat(member.rating)}
                        <span className='text-xs text-gray-500'>
                          ({member.rating}/5)
                        </span>
                      </div>
                      <div className='flex flex-wrap gap-1'>
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'hiring':
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              🎯 Hiring Recommendations
            </h3>
            {hireRecommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedRecommendation(rec.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedRecommendation === rec.id
                    ? `${themeClasses.border} ${themeClasses.secondary}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-semibold'>{rec.role}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.urgency === 'High'
                        ? 'bg-red-100 text-red-800'
                        : rec.urgency === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.urgency} Priority
                  </span>
                </div>
                <div className='text-sm text-gray-600 mb-2'>
                  {rec.department} Department
                </div>
                <div className='text-sm font-medium text-gray-700 mb-2'>
                  {rec.budget}
                </div>
                <div className='flex flex-wrap gap-1'>
                  {rec.skills.map((skill) => (
                    <span
                      key={skill}
                      className='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'analysis':
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              📊 Analysis Configuration
            </h3>

            <div className='space-y-4'>
              <div className='text-sm font-medium text-gray-700'>
                Analysis Depth:
              </div>
              {[
                {
                  mode: 'Quick Scan',
                  description: 'Basic skill matching',
                  duration: '1 min',
                },
                {
                  mode: 'Standard Review',
                  description: 'Detailed compatibility check',
                  duration: '3 min',
                },
                {
                  mode: 'Deep Analysis',
                  description: 'Comprehensive staffing matrix',
                  duration: '7 min',
                },
              ].map((option) => (
                <div
                  key={option.mode}
                  onClick={() => setAnalysisDepth(option.mode)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    analysisDepth === option.mode
                      ? `${themeClasses.border} ${themeClasses.secondary}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-semibold'>{option.mode}</h4>
                      <p className='text-sm text-gray-600'>
                        {option.description}
                      </p>
                    </div>
                    <span className='text-xs bg-gray-100 px-2 py-1 rounded'>
                      {option.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {isFormComplete() && (
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || showPassword || showGenericSuccess}
                  className={`w-full py-4 text-white rounded-lg transition-all duration-200 ${
                    isSubmitting || showPassword || showGenericSuccess
                      ? 'bg-gray-400 cursor-not-allowed'
                      : themeClasses.button
                  } font-medium text-lg`}
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center gap-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Generating Matrix...
                    </span>
                  ) : showPassword || showGenericSuccess ? (
                    '✓ Analysis Complete'
                  ) : (
                    '🚀 Execute Skill-Gap Analysis'
                  )}
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 ${themeClasses.header} text-white shadow-lg`}
      >
        <div className='max-w-7xl mx-auto flex justify-between items-start p-4'>
          <div className='flex-1 mr-4'>
            <h1 className='text-lg font-bold mb-2 flex items-center'>
              🎯 Skill-Gap Analyzer Matrix
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
          {/* Navigation Tabs */}
          <div className='flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg'>
            {[
              {
                id: 'deliverables',
                label: '📋 Deliverables',
                badge: deliverables.length,
              },
              {
                id: 'staff',
                label: '👥 Team',
                badge: staff.filter((s) => s.availability === 'Available')
                  .length,
              },
              {
                id: 'hiring',
                label: '🎯 Hiring',
                badge: hireRecommendations.length,
              },
              { id: 'analysis', label: '📊 Analysis', badge: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  activePanel === tab.id
                    ? `${themeClasses.primary} text-white shadow-md`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <div className='flex items-center justify-center gap-2'>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activePanel === tab.id ? 'bg-white/20' : 'bg-gray-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Status Bar */}
          <div className='mb-6 p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-600'>
                    Selected Deliverable:
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      selectedDeliverable
                        ? `${themeClasses.secondary} ${themeClasses.accent}`
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {selectedDeliverable
                      ? deliverables.find((d) => d.id === selectedDeliverable)
                          ?.title
                      : 'None'}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-600'>
                    Assigned Staff:
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      assignedStaff.length > 0
                        ? `${themeClasses.secondary} ${themeClasses.accent}`
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {assignedStaff.length} selected
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium text-gray-600'>
                  Completion:
                </span>
                <div className='w-32 bg-gray-200 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${themeClasses.primary}`}
                    style={{
                      width: `${
                        ((selectedDeliverable ? 1 : 0) +
                          (assignedStaff.length > 0 ? 1 : 0) +
                          (selectedRecommendation ? 1 : 0) +
                          (analysisDepth ? 1 : 0)) *
                        25
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Panel */}
          <div className='bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 min-h-[600px]'>
            {renderPanelContent()}
          </div>

          {/* Navigation Controls */}
          {!showPassword && !showGenericSuccess && (
            <div className='mt-6 flex justify-between items-center'>
              <button
                onClick={() => {
                  const panels = ['deliverables', 'staff', 'hiring', 'analysis']
                  const currentIndex = panels.indexOf(activePanel)
                  if (currentIndex > 0) {
                    setActivePanel(panels[currentIndex - 1])
                  }
                }}
                disabled={activePanel === 'deliverables'}
                className='px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
              >
                ← Previous Panel
              </button>

              <div className='text-center'>
                <div className='text-sm text-gray-500 mb-1'>
                  {activePanel === 'deliverables'
                    ? 'Select Deliverable'
                    : activePanel === 'staff'
                    ? 'Assign Team Members'
                    : activePanel === 'hiring'
                    ? 'Choose Hiring Priority'
                    : 'Configure Analysis'}
                </div>
                <div className='text-xs text-gray-400'>
                  {['deliverables', 'staff', 'hiring', 'analysis'].indexOf(
                    activePanel,
                  ) + 1}{' '}
                  of 4 panels
                </div>
              </div>

              <button
                onClick={() => {
                  const panels = ['deliverables', 'staff', 'hiring', 'analysis']
                  const currentIndex = panels.indexOf(activePanel)
                  if (currentIndex < panels.length - 1) {
                    setActivePanel(panels[currentIndex + 1])
                  }
                }}
                disabled={
                  activePanel === 'analysis' ||
                  (activePanel === 'deliverables' && !selectedDeliverable) ||
                  (activePanel === 'staff' && assignedStaff.length === 0) ||
                  (activePanel === 'hiring' && !selectedRecommendation)
                }
                className={`px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${themeClasses.button}`}
              >
                {activePanel === 'analysis' ? 'Complete Setup' : 'Next Panel →'}
              </button>
            </div>
          )}
        </div>

        {/* Password Display */}
        {showPassword && (
          <div className='mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>🎯</div>
            <h2 className='text-3xl font-bold text-green-800 mb-4'>
              Skill-Gap Matrix Generated!
            </h2>
            <p className='text-green-700 mb-6 text-lg'>
              Comprehensive staffing analysis complete with optimal resource
              allocation.
            </p>
            <div className='bg-white border-2 border-green-300 rounded-xl p-6 inline-block shadow-lg'>
              <p className='text-sm text-gray-600 mb-2 font-medium'>
                System Access Code:
              </p>
              <p className='text-4xl font-mono font-bold text-green-600 tracking-wide'>
                {PASSWORD_SkillGapAnalyzer}
              </p>
            </div>
          </div>
        )}

        {/* Generic Success */}
        {showGenericSuccess && (
          <div className='mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center shadow-xl'>
            <div className='text-6xl mb-4'>📊</div>
            <h2 className='text-2xl font-bold text-blue-800 mb-4'>
              Analysis Saved!
            </h2>
            <p className='text-blue-700 text-lg'>
              Your skill-gap analysis configuration has been recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillGapAnalyzer
