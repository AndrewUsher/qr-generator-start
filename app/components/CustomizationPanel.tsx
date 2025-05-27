import React from 'react'

type QRSize = 'small' | 'medium' | 'large'

interface CustomizationPanelProps {
	onSizeChange?: (size: QRSize) => void
}

export function CustomizationPanel({ onSizeChange }: CustomizationPanelProps) {
	const [selectedSize, setSelectedSize] = React.useState<QRSize>('medium')

	const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSize = e.target.value as QRSize
		setSelectedSize(newSize)
		onSizeChange?.(newSize)
	}

	return (
		<div className="flex flex-col gap-8">
			{/* Size Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Size</h3>
				<select
					value={selectedSize}
					onChange={handleSizeChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>

			{/* Pattern Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Pattern</h3>
				<div className="grid grid-cols-3 gap-2">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
						>
							{/* Pattern {i+1} */}
						</div>
					))}
				</div>
			</div>

			{/* Color Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Color</h3>
				<div className="grid grid-cols-4 gap-2">
					{[...Array(12)].map((_, i) => (
						<div
							key={i}
							className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-400"
						>
							{/* Color {i+1} */}
						</div>
					))}
				</div>
			</div>

			{/* Theme Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Theme</h3>
				<div className="grid grid-cols-4 gap-2">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
						>
							{/* Theme {i+1} */}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
