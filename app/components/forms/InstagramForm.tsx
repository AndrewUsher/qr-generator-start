import React from 'react'

interface InstagramFormProps {
  onValueChange: (value: string) => void
}

export function InstagramForm({ onValueChange }: InstagramFormProps) {
  const [username, setUsername] = React.useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setUsername(newValue)
    generateInstagramUrl(newValue)
  }

  const generateInstagramUrl = (username: string) => {
    if (!username) {
      onValueChange('')
      return
    }

    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '')
    const url = `https://instagram.com/${cleanUsername}`
    onValueChange(url)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label
          htmlFor="instagram-username"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Instagram Username
        </label>
        <input
          id="instagram-username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="@username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
} 