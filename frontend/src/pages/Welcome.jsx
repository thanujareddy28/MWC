import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className="min-h-screen bg-mwc-sand flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center text-center mb-10">
        <svg width="80" height="80" viewBox="0 0 240 280" xmlns="http://www.w3.org/2000/svg" className="mb-3">
          <path d="M120,40 C90,65 65,105 65,148 C65,190 90,222 120,225 L120,40 Z" fill="#4A6353" />
          <path d="M120,40 C150,65 175,105 175,148 C175,190 150,222 120,225 L120,40 Z" fill="#8AA88F" />
          <path d="M120,50 Q108,130 120,222" stroke="#F5F1E6" strokeWidth="3" fill="none" opacity="0.85" />
          <circle cx="120" cy="236" r="9" fill="#E8A488" />
        </svg>
        <h1 className="text-3xl font-medium text-mwc-forest">MWC</h1>
        <p className="text-sm text-mwc-teal mt-1">Mental Wellness Companion</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <Link
          to="/signup"
          className="text-center bg-mwc-sage text-white rounded-lg py-2.5 font-medium hover:bg-mwc-forest transition-colors"
        >
          Create account
        </Link>
        <Link
          to="/login"
          className="text-center border border-mwc-teal/40 text-mwc-forest rounded-lg py-2.5 font-medium hover:bg-white transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  )
}

export default Welcome