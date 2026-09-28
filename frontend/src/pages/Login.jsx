import { SignIn } from '@clerk/react'
import { clerkAppearance } from '../lib/clerkAppearance.js'

function Login() {
  return (
    <div className="min-h-screen bg-mwc-sand flex items-center justify-center p-6">
      <SignIn routing="path" path="/login" signUpUrl="/signup" appearance={clerkAppearance} />
    </div>
  )
}

export default Login
