import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { Destination } from './DestinationSidebar'
import { EmailForm } from './forms/EmailForm'
import { WebsiteForm } from './forms/WebsiteForm'
import { MessageForm } from './forms/MessageForm'
import { InstagramForm } from './forms/InstagramForm'

interface QRInputPreviewProps {
	selectedDestination: Destination
}

export function QRInputPreview({ selectedDestination }: QRInputPreviewProps) {
	const [qrValue, setQrValue] = React.useState('')

	const renderForm = () => {
		if (!selectedDestination) {
			return <WebsiteForm onValueChange={setQrValue} />
		}

		switch (selectedDestination.label) {
			case 'Email':
				return <EmailForm onValueChange={setQrValue} />
			case 'Website':
				return <WebsiteForm onValueChange={setQrValue} />
			case 'Message':
				return <MessageForm onValueChange={setQrValue} />
			case 'Instagram':
				return <InstagramForm onValueChange={setQrValue} />
			default:
				return <WebsiteForm onValueChange={setQrValue} />
		}
	}

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
