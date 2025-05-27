interface MessageFormProps {
  phoneNumber: string
  messageText: string
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function MessageForm({
  phoneNumber,
  messageText,
  onPhoneChange,
  onMessageChange,
}: MessageFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label
          htmlFor="phone-number"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Phone Number
        </label>
        <input
          id="phone-number"
          type="tel"
          placeholder="+1234567890"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          value={phoneNumber}
          onChange={onPhoneChange}
        />
      </div>
      <div>
        <label
          htmlFor="message-text"
          className="text-sm font-medium text-gray-700 self-start mb-1 block"
        >
          Message
        </label>
        <textarea
          id="message-text"
          placeholder="Type your message here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base min-h-[150px] resize-y"
          value={messageText}
          onChange={onMessageChange}
        />
      </div>
    </div>
  )
} 