import React from 'react'

type InstagramContentType = 'profile' | 'post' | 'reel'

interface InstagramFormProps {
  onValueChange: (value: string) => void
}

export function InstagramForm({ onValueChange }: InstagramFormProps) {
  const [username, setUsername] = React.useState('')
  const [contentType, setContentType] = React.useState<InstagramContentType>('profile')
  const [postUrl, setPostUrl] = React.useState('')
  const [error, setError] = React.useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setUsername(newValue)
    validateAndGenerateUrl(newValue, contentType, postUrl)
  }

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as InstagramContentType
    setContentType(newType)
    validateAndGenerateUrl(username, newType, postUrl)
  }

  const handlePostUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPostUrl(newValue)
    validateAndGenerateUrl(username, contentType, newValue)
  }

  const validateUsername = (username: string): boolean => {
    // Instagram username rules:
    // - 30 characters or less
    // - Letters, numbers, periods, and underscores only
    // - Cannot start with a period
    const cleanUsername = username.replace('@', '')
    const usernameRegex = /^[a-zA-Z0-9._][a-zA-Z0-9._]{0,29}$/
    return usernameRegex.test(cleanUsername)
  }

  const validatePostUrl = (url: string): boolean => {
    if (!url) return true
    const instagramPostRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[a-zA-Z0-9_-]+\/?$/
    return instagramPostRegex.test(url)
  }

  const validateAndGenerateUrl = (username: string, type: InstagramContentType, postUrl: string) => {
    setError('')
    
    if (type === 'profile') {
      if (!username) {
        onValueChange('')
        return
      }
      
      if (!validateUsername(username)) {
        setError('Username must be 30 characters or less and can only contain letters, numbers, periods, and underscores')
        onValueChange('')
        return
      }
      
      const cleanUsername = username.replace('@', '')
      const url = `https://instagram.com/${cleanUsername}`
      onValueChange(url)
    } else {
      if (!postUrl) {
        onValueChange('')
        return
      }
      
      if (!validatePostUrl(postUrl)) {
        setError('Please enter a valid Instagram post or reel URL')
        onValueChange('')
        return
      }
      
      onValueChange(postUrl)
    }
  }

  const handlePreview = () => {
    const url = contentType === 'profile' 
      ? `https://instagram.com/${username.replace('@', '')}`
      : postUrl
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label
          htmlFor="instagram-content-type"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Content Type
        </label>
        <select
          id="instagram-content-type"
          value={contentType}
          onChange={handleContentTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="profile">Profile</option>
          <option value="post">Post</option>
          <option value="reel">Reel</option>
        </select>
      </div>

      {contentType === 'profile' ? (
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
      ) : (
        <div>
          <label
            htmlFor="instagram-post-url"
            className="text-sm font-medium text-gray-700 self-start mb-1 block"
          >
            Instagram {contentType === 'post' ? 'Post' : 'Reel'} URL
          </label>
          <input
            id="instagram-post-url"
            type="url"
            value={postUrl}
            onChange={handlePostUrlChange}
            placeholder="https://instagram.com/p/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={handlePreview}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Preview {contentType === 'profile' ? 'Profile' : contentType === 'post' ? 'Post' : 'Reel'}
      </button>
    </div>
  )
} 