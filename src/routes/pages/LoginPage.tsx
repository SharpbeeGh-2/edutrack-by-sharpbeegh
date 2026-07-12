import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { BrandLogo } from '../../components/BrandLogo'
import { GoogleAuthButton } from '../../components/GoogleAuthButton'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword(values)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Signed in')
    navigate('/school')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <BrandLogo />
        </div>

        <div className="mb-4">
          <GoogleAuthButton label="Sign in with Google" />
        </div>
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-body-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <label htmlFor="email" className="mb-1 block text-body-sm text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md"
        />
        {errors.email && <p className="mb-2 text-body-sm text-danger">{errors.email.message}</p>}

        <label htmlFor="password" className="mb-1 block text-body-sm text-gray-600">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md"
        />
        {errors.password && (
          <p className="mb-4 text-body-sm text-danger">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-md bg-primary py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>

        <div className="mt-4 flex justify-between text-body-sm">
          <Link to="/forgot-password" className="text-primary underline">
            Forgot password?
          </Link>
          <Link to="/register" className="text-primary underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  )
}