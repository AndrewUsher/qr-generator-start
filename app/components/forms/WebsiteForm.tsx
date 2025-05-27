interface WebsiteFormProps {
  websiteUrl: string
  onWebsiteChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function WebsiteForm({ websiteUrl, onWebsiteChange }: WebsiteFormProps) {
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
        onChange={onWebsiteChange}
      />
    </div>
  )
} 