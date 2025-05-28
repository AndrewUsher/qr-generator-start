import React from 'react'
import { DestinationSidebar } from './DestinationSidebar'
import { QRInputPreview } from './QRInputPreview'
import { CustomizationPanel } from './CustomizationPanel'
import type { Destination } from './DestinationSidebar'

type QRSize = 'small' | 'medium' | 'large'

export function MainCard() {
	const [selectedDestination, setSelectedDestination] =
		React.useState<Destination>({
			label: 'Website',
			icon: '🔗',
			enabled: true,
		})
	const [qrSize, setQrSize] = React.useState<QRSize>('medium')
	const [selectedColor, setSelectedColor] = React.useState<string>('#000000')
	const [selectedBgColor, setSelectedBgColor] = React.useState<string>('#ffffff')

	return (
		<section className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-[-4rem] flex flex-col md:flex-row gap-8 relative z-10">
			{/* Destination Sidebar */}
			<div className="w-full md:w-1/4">
				<DestinationSidebar
					selectedDestination={selectedDestination}
					onDestinationSelect={setSelectedDestination}
				/>
			</div>
			{/* QR Input & Preview */}
			<div className="w-full md:w-2/4">
				<QRInputPreview
					selectedDestination={selectedDestination}
					qrSize={qrSize}
					fgColor={selectedColor}
					bgColor={selectedBgColor}
				/>
			</div>
			{/* Customization Panel */}
			<div className="w-full md:w-1/4">
				<CustomizationPanel 
					onSizeChange={setQrSize} 
					onColorChange={setSelectedColor}
					onBgColorChange={setSelectedBgColor}
					selectedColor={selectedColor}
					selectedBgColor={selectedBgColor}
				/>
			</div>
		</section>
	)
}
