import React from 'react';

export function CustomizationPanel() {
	return (
		<div className="flex flex-col gap-8">
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
	);
}
