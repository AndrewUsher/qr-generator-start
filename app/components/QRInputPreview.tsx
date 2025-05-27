import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { Destination } from './DestinationSidebar'
import { EmailForm } from './forms/EmailForm'
import { WebsiteForm } from './forms/WebsiteForm'
import { MessageForm } from './forms/MessageForm'
import { InstagramForm } from './forms/InstagramForm'
import { FileForm } from './forms/FileForm'
import { YoutubeForm } from './forms/YoutubeForm'

type QRSize = 'small' | 'medium' | 'large'

interface QRInputPreviewProps {
	selectedDestination: Destination
	qrSize: QRSize
}

export function QRInputPreview({
	selectedDestination,
	qrSize,
}: QRInputPreviewProps) {
	const [qrValue, setQrValue] = React.useState('')

	const getQRCodeSize = () => {
		switch (qrSize) {
			case 'small':
				return 150
			case 'medium':
				return 200
			case 'large':
				return 250
			default:
				return 200
		}
	}

	const getContainerSize = () => {
		switch (qrSize) {
			case 'small':
				return 'w-40 h-40'
			case 'medium':
				return 'w-56 h-56'
			case 'large':
				return 'w-72 h-72'
			default:
				return 'w-56 h-56'
		}
	}

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
			case 'File':
				return <FileForm onValueChange={setQrValue} />
			case 'Youtube':
				return <YoutubeForm onValueChange={setQrValue} />
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
			<div
				className={`${getContainerSize()} bg-white rounded-lg flex items-center justify-center p-4`}
			>
				{qrValue ? (
					<QRCodeSVG
						value={qrValue}
						size={getQRCodeSize()}
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
