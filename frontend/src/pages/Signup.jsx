import { SignUp } from '@clerk/react'
import { clerkAppearance } from '../lib/clerkAppearance.js'

function Signup() {
  return (
    <div className="min-h-screen bg-mwc-sand flex items-center justify-center p-6">
      <SignUp routing="path" path="/signup" signInUrl="/login" appearance={clerkAppearance} />
    </div>
  )
}

export default Signup
