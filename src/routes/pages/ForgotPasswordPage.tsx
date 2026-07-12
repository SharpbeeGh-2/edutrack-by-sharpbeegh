import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { BrandLogo } from '../../components/BrandLogo'

const forgotSchema = z.object({
  email: z.string().email('Enter a valid email address'),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async (values: ForgotFormValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      toast.error(error.message)
      return
    }
    setSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6">
          <BrandLogo />
        </div>

        {sent ? (
          <p className="text-body-md text-gray-600">
            If an account exists for that email, a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-1 block text-body-sm text-gray-600">Email</label>
            <input type="email" {...register('email')} className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-body-md" />
            {errors.email && <p className="mb-2 text-body-sm text-danger">{errors.email.message}</p>}

            <button type="submit" disabled={isSubmitting} className="mt-4 w-full rounded-md bg-primary py-2 text-white disabled:opacity-50">
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-body-sm text-gray-500">
          <Link to="/login" className="text-primary underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}