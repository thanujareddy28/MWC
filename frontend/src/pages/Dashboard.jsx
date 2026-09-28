import { UserButton } from '@clerk/react'

function Dashboard() {
  return (
    <div className="min-h-screen bg-mwc-sand flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-medium text-mwc-forest">Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Dashboard
