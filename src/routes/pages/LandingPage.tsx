import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  CreditCard,
  Bell,
  FileText,
  Bus,
  Building2,
  ShieldCheck,
  Globe,
  ArrowRight,
  Check,
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Student & Admissions',
    description: 'Complete student lifecycle from admission to graduation',
  },
  {
    icon: BookOpen,
    title: 'Classes & Subjects',
    description: 'Manage classes, subjects, timetables and assignments',
  },
  {
    icon: BarChart3,
    title: 'Assessments & Exams',
    description: 'Create exams, record scores, generate report cards',
  },
  {
    icon: CreditCard,
    title: 'Fees & Finance',
    description: 'Fee structures, payments, receipts and financial reports',
  },
  {
    icon: Bell,
    title: 'Communication',
    description: 'Announcements, notifications, and messaging to all stakeholders',
  },
  {
    icon: FileText,
    title: 'Report Cards',
    description: 'Auto-generate professional report cards every term',
  },
  {
    icon: Bus,
    title: 'Transportation',
    description: 'Manage bus routes and assign students to routes',
  },
  {
    icon: Building2,
    title: 'Hostel Management',
    description: 'Room allocation, hostel fees and boarding management',
  },
  {
    icon: Users,
    title: 'Staff & Payroll',
    description: 'Staff profiles, roles, attendance and salary management',
  },
  {
    icon: ShieldCheck,
    title: 'Attendance',
    description: 'Daily attendance tracking with detailed analytics',
  },
  {
    icon: GraduationCap,
    title: 'Promotion & Alumni',
    description: 'Promote students and maintain alumni records',
  },
  {
    icon: Globe,
    title: 'Multi-Tenant',
    description: 'Each school gets its own secure, isolated environment',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up and create your school profile with basic information.',
  },
  {
    number: '02',
    title: 'Configure Your School',
    description: 'Set academic year, terms, grading scale, classes and subjects.',
  },
  {
    number: '03',
    title: 'Start Managing',
    description: 'Add students and staff, and start using every module right away.',
  },
]

// Placeholder pricing — swap in real GHS figures once decided (see gap analysis).
const plans = [
  {
    name: 'Free',
    price: 'GH₵0',
    description: 'Perfect for small schools getting started',
    features: ['Up to 50 students', 'Basic modules', '1 admin user', 'Email support'],
    featured: false,
  },
  {
    name: 'Basic',
    price: 'GH₵150',
    description: 'Ideal for growing schools',
    features: [
      'Up to 300 students',
      'All core modules',
      '5 admin users',
      'Priority support',
      'SMS notifications',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: 'GH₵400',
    description: 'For established institutions',
    features: [
      'Unlimited students',
      'All modules',
      'Unlimited users',
      'Dedicated support',
      'Custom branding',
      'API access',
    ],
    featured: false,
  },
]

function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-gray-900">
        <GraduationCap size={20} />
      </span>
      <span className={`text-h5 font-bold ${light ? 'text-white' : 'text-gray-900'}`}>
        EduTrack
      </span>
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-6 py-3 backdrop-blur">
        <LogoMark />
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-body-md font-medium text-white hover:opacity-90"
        >
          <ArrowRight size={16} />
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1 text-body-sm font-medium text-accent">
          Built for Ghanaian Schools
        </span>
        <h1 className="mx-auto max-w-3xl text-h1 font-extrabold leading-tight text-gray-900">
          The Complete <span className="text-accent">School Management</span> System for Modern
          Schools
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-gray-500">
          EduTrack streamlines every aspect of school administration — from admissions to alumni —
          in one powerful, easy-to-use platform.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-md bg-gray-900 px-6 py-3 text-body-md font-medium text-white hover:opacity-90"
          >
            <ArrowRight size={16} />
            Start Free Trial
          </Link>
          <a
            href="#features"
            className="rounded-md bg-gray-200 px-6 py-3 text-body-md font-medium text-gray-800 hover:bg-gray-300"
          >
            See Features
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-h2 font-bold text-gray-900">
          Everything Your School Needs
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-body-lg text-gray-500">
          One platform to manage all aspects of your school — from attendance to alumni.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                <feature.icon size={22} />
              </span>
              <h3 className="text-h5 font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1 text-body-md text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get started steps */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 font-bold text-gray-900">Get Started in Minutes</h2>
          <p className="mt-3 text-body-lg text-gray-500">
            Set up your school and start managing in 3 simple steps
          </p>

          <div className="mt-12 space-y-10">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-h1 font-extrabold text-accent/30">{step.number}</span>
                <h3 className="mt-2 text-h4 font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-body-md text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-h2 font-bold text-gray-900">Simple, Transparent Pricing</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-body-lg text-gray-500">
          Start free, scale as you grow. No hidden fees.
        </p>

        <div className="mt-10 space-y-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? 'rounded-lg border-2 border-accent bg-gray-900 p-6 text-white'
                  : 'rounded-lg border border-gray-200 bg-white p-6'
              }
            >
              <p
                className={
                  plan.featured ? 'text-body-md text-gray-300' : 'text-body-md text-gray-500'
                }
              >
                {plan.name}
              </p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-h1 font-extrabold">{plan.price}</span>
                <span
                  className={
                    plan.featured ? 'text-body-md text-gray-400' : 'text-body-md text-gray-500'
                  }
                >
                  /mo
                </span>
              </p>
              <p
                className={
                  plan.featured
                    ? 'mt-1 text-body-md text-gray-300'
                    : 'mt-1 text-body-md text-gray-500'
                }
              >
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-body-md">
                    <Check size={16} className="text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={
                  plan.featured
                    ? 'mt-6 flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-body-md font-medium text-gray-900 hover:opacity-90'
                    : 'mt-6 flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-body-md font-medium text-white hover:opacity-90'
                }
              >
                <ArrowRight size={16} />
                {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-16 text-gray-300">
        <div className="mx-auto max-w-2xl">
          <LogoMark light />
          <p className="mt-4 max-w-sm text-body-md text-gray-400">
            Empowering Ghanaian schools with world-class management tools.
          </p>
          <p className="mt-2 text-body-sm text-gray-500">by SharpbeeGh</p>

          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-body-md font-semibold text-white">Product</p>
              <a
                href="#features"
                className="mt-3 block text-body-sm text-gray-400 hover:text-white"
              >
                Features
              </a>
              <a href="#pricing" className="mt-2 block text-body-sm text-gray-400 hover:text-white">
                Pricing
              </a>
            </div>
            <div>
              <p className="text-body-md font-semibold text-white">Company</p>
              <a href="#" className="mt-3 block text-body-sm text-gray-400 hover:text-white">
                About
              </a>
              <a href="#" className="mt-2 block text-body-sm text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
            <div>
              <p className="text-body-md font-semibold text-white">Legal</p>
              <a href="#" className="mt-3 block text-body-sm text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="mt-2 block text-body-sm text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-body-sm text-gray-500">
            © 2026 EduTrack by SharpbeeGh. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
