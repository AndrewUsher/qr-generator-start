import React from 'react'

interface EmailFormProps {
	onValueChange: (value: string) => void
}

export function EmailForm({ onValueChange }: EmailFormProps) {
	const [emailData, setEmailData] = React.useState({
		email: '',
		subject: '',
		message: '',
	})

	const handleEmailChange =
		(field: keyof typeof emailData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newValue = e.target.value
			setEmailData((prev) => {
				const newData = {
					...prev,
					[field]: newValue,
				}
				generateEmailUrl(newData)
				return newData
			})
		}

	const generateEmailUrl = (data: typeof emailData) => {
		const { email, subject, message } = data
		if (!email) {
			onValueChange('')
			return
		}

		const params: string[] = []
		if (subject) {
			params.push(
				`subject=${encodeURIComponent(subject).replace(/\+/g, '%20')}`,
			)
		}
		if (message) {
			params.push(`body=${encodeURIComponent(message).replace(/\+/g, '%20')}`)
		}

		const queryString = params.join('&')
		const url = `mailto:${email}${queryString ? `?${queryString}` : ''}`
		onValueChange(url)
	}

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
					onChange={handleEmailChange('email')}
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
					onChange={handleEmailChange('subject')}
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
					onChange={handleEmailChange('message')}
				/>
			</div>
		</div>
	)
}
