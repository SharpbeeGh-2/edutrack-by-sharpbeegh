import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { BrandLogo } from '../../components/BrandLogo'
import { GoogleAuthButton } from '../../components/GoogleAuthButton'

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  schoolName: z.string().min(1, 'School name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterFormValues) => {
    // NOTE: this creates the Supabase Auth user only. Creating the actual
    // `schools` row, `school_memberships`, and starting the 30-day free trial
    // from schoolName/first_name/last_name requires a database trigger or
    // Edge Function — that's Phase 1 backend work, not wired yet.
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          school_name: values.schoolName,
        },
      },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Account created — check your email to confirm, then sign in')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <BrandLogo />
        </div>

        <div className="mb-4">
          <GoogleAuthButton label="Sign up with Google" />
        </div>
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-body-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <label className="mb-1 block text-body-sm text-gray-600">School name</label>
        <input {...register('schoolName')} className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
        {errors.schoolName && <p className="mb-2 text-body-sm text-danger">{errors.schoolName.message}</p>}

        <div className="mb-1 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-body-sm text-gray-600">First name</label>
            <input {...register('firstName')} className="w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
            {errors.firstName && <p className="text-body-sm text-danger">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-body-sm text-gray-600">Last name</label>
            <input {...register('lastName')} className="w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
            {errors.lastName && <p className="text-body-sm text-danger">{errors.lastName.message}</p>}
          </div>
        </div>

        <label className="mb-1 mt-2 block text-body-sm text-gray-600">Email</label>
        <input type="email" {...register('email')} className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
        {errors.email && <p className="mb-2 text-body-sm text-danger">{errors.email.message}</p>}

        <label className="mb-1 block text-body-sm text-gray-600">Password</label>
        <input type="password" {...register('password')} className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
        {errors.password && <p className="mb-4 text-body-sm text-danger">{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting} className="mt-2 w-full rounded-md bg-primary py-2 text-white disabled:opacity-50">
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="mt-4 text-center text-body-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}