import React from 'react'

type QRSize = 'small' | 'medium' | 'large'

interface CustomizationPanelProps {
	onSizeChange?: (size: QRSize) => void
	onColorChange?: (color: string) => void
	onBgColorChange?: (color: string) => void
	selectedColor?: string
	selectedBgColor?: string
}

const PREDEFINED_COLORS = [
	'#000000', // Black
	'#2563eb', // Blue
	'#ef4444', // Red
	'#22c55e', // Green
	'#a21caf', // Purple
	'#f59e42', // Orange
	'#eab308', // Yellow
	'#14b8a6', // Teal
	'#6b7280', // Gray
	'#f472b6', // Pink
	'#facc15', // Gold
	'#fff', // White
]

export function CustomizationPanel({
	onSizeChange,
	onColorChange,
	onBgColorChange,
	selectedColor,
	selectedBgColor,
}: CustomizationPanelProps) {
	const [selectedSize, setSelectedSize] = React.useState<QRSize>('medium')
	const [customColor, setCustomColor] = React.useState<string>('')
	const [customBgColor, setCustomBgColor] = React.useState<string>('')

	const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSize = e.target.value as QRSize
		setSelectedSize(newSize)
		onSizeChange?.(newSize)
	}

	const handleColorSelect = (color: string) => {
		setCustomColor('')
		onColorChange?.(color)
	}

	const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomColor(e.target.value)
		onColorChange?.(e.target.value)
	}

	const handleBgColorSelect = (color: string) => {
		setCustomBgColor('')
		onBgColorChange?.(color)
	}

	const handleCustomBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomBgColor(e.target.value)
		onBgColorChange?.(e.target.value)
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

			{/* Color Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Color</h3>
				<div className="grid grid-cols-6 gap-2 mb-3">
					{PREDEFINED_COLORS.map((color) => (
						<button
							key={color}
							type="button"
							className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-colors ${
								selectedColor === color && !customColor
									? 'border-blue-500'
									: 'border-transparent hover:border-gray-400'
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleColorSelect(color)}
							aria-label={`Select color ${color}`}
						/>
					))}
				</div>
				<div className="flex items-center gap-2 mb-2">
					<label htmlFor="custom-color" className="text-sm text-gray-600">
						Custom:
					</label>
					<input
						type="color"
						id="custom-color"
						value={customColor || selectedColor || '#000000'}
						onChange={handleCustomColor}
						className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
						aria-label="Pick a custom color"
					/>
					{customColor && (
						<span className="text-xs text-gray-500">{customColor}</span>
					)}
				</div>
			</div>

			{/* Background Color Section */}
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-2">Background</h3>
				<div className="grid grid-cols-6 gap-2 mb-3">
					{PREDEFINED_COLORS.map((color) => (
						<button
							key={color}
							type="button"
							className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-colors ${
								selectedBgColor === color && !customBgColor
									? 'border-blue-500'
									: 'border-transparent hover:border-gray-400'
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleBgColorSelect(color)}
							aria-label={`Select background color ${color}`}
						/>
					))}
				</div>
				<div className="flex items-center gap-2 mb-2">
					<label htmlFor="custom-bg-color" className="text-sm text-gray-600">
						Custom:
					</label>
					<input
						type="color"
						id="custom-bg-color"
						value={customBgColor || selectedBgColor || '#ffffff'}
						onChange={handleCustomBgColor}
						className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
						aria-label="Pick a custom background color"
					/>
					{customBgColor && (
						<span className="text-xs text-gray-500">{customBgColor}</span>
					)}
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
