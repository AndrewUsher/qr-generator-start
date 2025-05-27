interface EmailFormProps {
  emailData: {
    email: string
    subject: string
    message: string
  }
  onEmailChange: (field: 'email' | 'subject' | 'message') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function EmailForm({ emailData, onEmailChange }: EmailFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label
          htmlFor="email-address"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Email Address
        </label>
        <input
          id="email-address"
          type="email"
          placeholder="recipient@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          value={emailData.email}
          onChange={onEmailChange('email')}
        />
      </div>
      <div>
        <label
          htmlFor="email-subject"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Subject
        </label>
        <input
          id="email-subject"
          type="text"
          placeholder="Email subject"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          value={emailData.subject}
          onChange={onEmailChange('subject')}
        />
      </div>
      <div>
        <label
          htmlFor="email-message"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Message
        </label>
        <textarea
          id="email-message"
          placeholder="Your message here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base min-h-[100px] resize-y"
          value={emailData.message}
          onChange={onEmailChange('message')}
        />
      </div>
    </div>
  )
} 