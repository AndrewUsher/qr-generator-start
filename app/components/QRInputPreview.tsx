import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { Destination } from './DestinationSidebar'

interface QRInputPreviewProps {
	selectedDestination: Destination
}

export function QRInputPreview({ selectedDestination }: QRInputPreviewProps) {
	console.log(process.env.NODE_ENV)
	const [emailData, setEmailData] = React.useState({
		email: '',
		subject: '',
		message: '',
	})

	const [websiteUrl, setWebsiteUrl] = React.useState('')

	const handleEmailChange =
		(field: keyof typeof emailData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setEmailData((prev) => ({
				...prev,
				[field]: e.target.value,
			}))
		}

	const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWebsiteUrl(e.target.value)
	}

	const generateEmailUrl = () => {
		const { email, subject, message } = emailData
		if (!email) return ''

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
		return `mailto:${email}${queryString ? `?${queryString}` : ''}`
	}

	const getQRCodeValue = () => {
		if (!selectedDestination) return ''

		switch (selectedDestination.label) {
			case 'Email':
				return generateEmailUrl()
			case 'Website':
				return websiteUrl
			default:
				return ''
		}
	}

	const renderEmailForm = () => (
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

	const renderWebsiteForm = () => (
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

	const renderForm = () => {
		if (!selectedDestination) {
			return renderWebsiteForm()
		}

		switch (selectedDestination.label) {
			case 'Email':
				return renderEmailForm()
			case 'Website':
				return renderWebsiteForm()
			default:
				return renderWebsiteForm()
		}
	}

	const qrValue = getQRCodeValue()

	return (
		<div className="flex flex-col items-center gap-4">
			{renderForm()}
			<span className="text-sm text-gray-500 mt-2 self-start">
				{process.env.NODE_ENV === 'development'
					? `Live Preview for ${qrValue}`
					: 'Preview'}
			</span>
			<div className="w-56 h-56 bg-white rounded-lg flex items-center justify-center p-4">
				{qrValue ? (
					<QRCodeSVG
						value={qrValue}
						size={200}
						level="H"
						includeMargin={false}
						className="w-full h-full"
					/>
				) : (
					<span className="text-gray-400 text-2xl">QR Code</span>
				)}
			</div>
		</div>
	)
}
