import { useAuth } from '@clerk/react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function useApi() {
  const { getToken } = useAuth()

  return async function apiFetch(path, options = {}) {
    const token = await getToken()

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(
        body || `Request failed with status ${response.status} ${response.statusText}`.trim(),
      )
    }

    if (response.status === 204) {
      return null
    }

    const text = await response.text()
    if (!text) {
      return null
    }

    return JSON.parse(text)
  }
}

export default useApi
