import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { BrandLogo } from '../../components/BrandLogo'

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type ResetFormValues = z.infer<typeof resetSchema>

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({ resolver: zodResolver(resetSchema) })

  const onSubmit = async (values: ResetFormValues) => {
    const { error } = await supabase.auth.updateUser({ password: values.password })
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Password updated — sign in with your new password')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <BrandLogo />
        </div>
        <label className="mb-1 block text-body-sm text-gray-600">New password</label>
        <input
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
          {isSubmitting ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
