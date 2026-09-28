import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    'Missing VITE_CLERK_PUBLISHABLE_KEY. Add it to frontend/.env.local (see frontend/.env.example) and restart the dev server.',
  )
}

if (!publishableKey.startsWith('pk_')) {
  throw new Error(
    'Invalid VITE_CLERK_PUBLISHABLE_KEY: it must be a Clerk publishable key starting with "pk_". Replace the placeholder in frontend/.env.local with your real key from the Clerk dashboard, then restart the dev server.',
  )
}

function ClerkWithRouter({ children }) {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl="/"
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkWithRouter>
        <App />
      </ClerkWithRouter>
    </BrowserRouter>
  </StrictMode>,
)
