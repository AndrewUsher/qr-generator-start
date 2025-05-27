import React from 'react'

interface MessageFormProps {
	onValueChange: (value: string) => void
}

export function MessageForm({ onValueChange }: MessageFormProps) {
	const [phoneNumber, setPhoneNumber] = React.useState('')
	const [messageText, setMessageText] = React.useState('')

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setPhoneNumber(newValue)
		generateSmsUrl(newValue, messageText)
	}

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value
		setMessageText(newValue)
		generateSmsUrl(phoneNumber, newValue)
	}

	const generateSmsUrl = (phone: string, message: string) => {
		if (!phone) {
			onValueChange('')
			return
		}

		const params: string[] = []
		if (message) {
			params.push(`body=${encodeURIComponent(message).replace(/\+/g, '%20')}`)
		}

		const queryString = params.join('&')
		const url = `sms:${phone}${queryString ? `?${queryString}` : ''}`
		onValueChange(url)
	}

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
					onChange={handlePhoneChange}
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
					onChange={handleMessageChange}
				/>
			</div>
		</div>
	)
}
