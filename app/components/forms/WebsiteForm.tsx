import React from 'react'

interface WebsiteFormProps {
  onValueChange: (value: string) => void
}

export function WebsiteForm({ onValueChange }: WebsiteFormProps) {
  const [websiteUrl, setWebsiteUrl] = React.useState('')

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setWebsiteUrl(newValue)
    formatAndUpdateUrl(newValue)
  }

  const formatAndUpdateUrl = (url: string) => {
    if (!url) {
      onValueChange('')
      return
    }

    // Add https:// if no protocol is specified
    const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`
    onValueChange(formattedUrl)
  }

  return (
    <div>
      <label
        htmlFor="website-url"
        className="text-sm font-medium text-gray-700 self-start mb-1 block"
      >
        Enter your website URL
      </label>
      <input
        id="website-url"
        type="text"
        placeholder="https://example.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
        value={websiteUrl}
        onChange={handleWebsiteChange}
      />
    </div>
  )
} 