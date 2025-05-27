import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { Destination } from './DestinationSidebar'
import { EmailForm } from './forms/EmailForm'
import { WebsiteForm } from './forms/WebsiteForm'
import { MessageForm } from './forms/MessageForm'

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
	const [messageText, setMessageText] = React.useState('')
	const [phoneNumber, setPhoneNumber] = React.useState('')

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

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessageText(e.target.value)
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value)
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

	const generateSmsUrl = () => {
		if (!phoneNumber) return ''

		const params: string[] = []
		if (messageText) {
			params.push(
				`body=${encodeURIComponent(messageText).replace(/\+/g, '%20')}`,
			)
		}

		const queryString = params.join('&')
		return `sms:${phoneNumber}${queryString ? `?${queryString}` : ''}`
	}

	const getQRCodeValue = () => {
		if (!selectedDestination) return ''

		switch (selectedDestination.label) {
			case 'Email':
				return generateEmailUrl()
			case 'Website':
				return websiteUrl
			case 'Message':
				return generateSmsUrl()
			default:
				return ''
		}
	}

	const renderForm = () => {
		if (!selectedDestination) {
			return <WebsiteForm websiteUrl={websiteUrl} onWebsiteChange={handleWebsiteChange} />
		}

		switch (selectedDestination.label) {
			case 'Email':
				return <EmailForm emailData={emailData} onEmailChange={handleEmailChange} />
			case 'Website':
				return <WebsiteForm websiteUrl={websiteUrl} onWebsiteChange={handleWebsiteChange} />
			case 'Message':
				return (
					<MessageForm
						phoneNumber={phoneNumber}
						messageText={messageText}
						onPhoneChange={handlePhoneChange}
						onMessageChange={handleMessageChange}
					/>
				)
			default:
				return <WebsiteForm websiteUrl={websiteUrl} onWebsiteChange={handleWebsiteChange} />
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
