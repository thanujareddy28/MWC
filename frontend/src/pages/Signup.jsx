import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Fill in every field to continue.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords don\'t match.')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', {
        username: form.username,
        email: form.email,
        password: form.password,
      })
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('username', response.data.username)
      navigate('/dashboard')
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(detail || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mwc-sand flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex flex-col items-center text-center">
        <svg width="64" height="64" viewBox="0 0 240 280" xmlns="http://www.w3.org/2000/svg" className="mb-2">
          <path d="M120,40 C90,65 65,105 65,148 C65,190 90,222 120,225 L120,40 Z" fill="#4A6353" />
          <path d="M120,40 C150,65 175,105 175,148 C175,190 150,222 120,225 L120,40 Z" fill="#8AA88F" />
          <path d="M120,50 Q108,130 120,222" stroke="#F5F1E6" strokeWidth="3" fill="none" opacity="0.85" />
          <circle cx="120" cy="236" r="9" fill="#E8A488" />
        </svg>
        <h1 className="text-2xl font-medium text-mwc-forest">MWC</h1>
        <p className="text-sm text-mwc-teal mt-1">Mental Wellness Companion</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl border border-mwc-teal/20 p-8">
        <h2 className="text-lg font-medium text-mwc-forest mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-mwc-forest mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="yourname"
              className="w-full border border-mwc-teal/30 rounded-lg px-3 py-2 text-mwc-forest focus:outline-none focus:border-mwc-sage"
            />
          </div>

          <div>
            <label className="block text-sm text-mwc-forest mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@email.com"
              className="w-full border border-mwc-teal/30 rounded-lg px-3 py-2 text-mwc-forest focus:outline-none focus:border-mwc-sage"
            />
          </div>

          <div>
            <label className="block text-sm text-mwc-forest mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full border border-mwc-teal/30 rounded-lg px-3 py-2 text-mwc-forest focus:outline-none focus:border-mwc-sage"
            />
          </div>

          <div>
            <label className="block text-sm text-mwc-forest mb-1">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full border border-mwc-teal/30 rounded-lg px-3 py-2 text-mwc-forest focus:outline-none focus:border-mwc-sage"
            />
          </div>

          {error && (
            <p className="text-sm text-mwc-coral bg-mwc-coral/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-mwc-sage text-white rounded-lg py-2 font-medium hover:bg-mwc-forest transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating your account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup