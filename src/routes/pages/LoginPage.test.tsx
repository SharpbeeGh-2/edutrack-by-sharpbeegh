import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'

function renderLoginPage() {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  it('renders the email and password fields', () => {
    renderLoginPage()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in$/i })).toBeInTheDocument()
  })

  it('shows a validation error when submitting an invalid email', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.type(screen.getByLabelText('Password'), 'sixormore')
    await user.click(screen.getByRole('button', { name: /sign in$/i }))

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument()
  })

  it('shows a validation error when the password is too short', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.type(screen.getByLabelText('Email'), 'valid@example.com')
    await user.type(screen.getByLabelText('Password'), 'abc')
    await user.click(screen.getByRole('button', { name: /sign in$/i }))

    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument()
  })
})