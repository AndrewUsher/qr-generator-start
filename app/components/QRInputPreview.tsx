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
	fgColor?: string
	bgColor?: string
}

export function QRInputPreview({
	selectedDestination,
	qrSize,
	fgColor = '#000000',
	bgColor = '#ffffff',
}: QRInputPreviewProps) {
	const [qrValue, setQrValue] = React.useState('')
	const [copyStatus, setCopyStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

	const svgRef = React.useRef<SVGSVGElement>(null)

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

	const handleDownload = () => {
		const svg = svgRef.current
		if (!svg) return
		const serializer = new XMLSerializer()
		const source = serializer.serializeToString(svg)
		const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
		const url = URL.createObjectURL(svgBlob)
		const link = document.createElement('a')
		link.href = url
		link.download = 'qr-code.svg'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const handleCopy = async () => {
		const svg = svgRef.current
		if (!svg) return
		try {
			const serializer = new XMLSerializer()
			const source = serializer.serializeToString(svg)
			const img = new window.Image()
			const svg64 = btoa(unescape(encodeURIComponent(source)))
			const image64 = `data:image/svg+xml;base64,${svg64}`
			img.src = image64
			img.onload = async () => {
				const canvas = document.createElement('canvas')
				canvas.width = svg.width.baseVal.value || getQRCodeSize()
				canvas.height = svg.height.baseVal.value || getQRCodeSize()
				const ctx = canvas.getContext('2d')
				if (!ctx) return setCopyStatus('error')
				ctx.drawImage(img, 0, 0)
				canvas.toBlob(async (blob) => {
					if (!blob) return setCopyStatus('error')
					try {
						await navigator.clipboard.write([
							new window.ClipboardItem({ 'image/png': blob }),
						])
						setCopyStatus('success')
						setTimeout(() => setCopyStatus('idle'), 1500)
					} catch {
						setCopyStatus('error')
					}
				}, 'image/png')
			}
		} catch {
			setCopyStatus('error')
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
						ref={svgRef}
						value={qrValue}
						size={getQRCodeSize()}
						level="H"
						includeMargin={false}
						className="w-full h-full"
						fgColor={fgColor}
						bgColor={bgColor}
						role="img"
					/>
				) : (
					<span className="text-gray-400 text-2xl">QR Code</span>
				)}
			</div>
			{qrValue && (
				<div className="flex gap-2 mt-2">
					<button
						onClick={handleDownload}
						type="button"
						className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
					>
						Download QR Code
					</button>
					<button
						onClick={handleCopy}
						type="button"
						className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm border border-gray-300"
					>
						{copyStatus === 'success'
							? 'Copied!'
							: copyStatus === 'error'
							? 'Copy Failed'
							: 'Copy QR Code Image'}
					</button>
				</div>
			)}
		</div>
	)
}
