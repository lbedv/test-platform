import { useState } from "react"

const INITIAL_USER = {
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  registeredAt: "January 15, 2025",
}

export function useProfilePage() {
  const [user, setUser] = useState(INITIAL_USER)

  function handleSaveProfile(name: string, email: string) {
    setUser((prev) => ({ ...prev, fullName: name, email }))
  }

  return {
    user,
    handleSaveProfile,
  }
}
