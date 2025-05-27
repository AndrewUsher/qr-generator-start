import React from 'react'

export type Destination = {
	label: string
	icon: string
	enabled: boolean
}

const destinations: Destination[] = [
	{ label: 'Website', icon: '🔗', enabled: true },
	{ label: 'Google Doc', icon: '📄', enabled: false },
	{ label: 'Youtube', icon: '▶️', enabled: true },
	{ label: 'Facebook', icon: '📘', enabled: false },
	{ label: 'File', icon: '📁', enabled: true },
	{ label: 'Instagram', icon: '📸', enabled: true },
	{ label: 'Message', icon: '💬', enabled: true },
	{ label: 'Email', icon: '✉️', enabled: true },
]

interface DestinationSidebarProps {
	selectedDestination: Destination
	onDestinationSelect: (destination: Destination) => void
}

export function DestinationSidebar({
	selectedDestination,
	onDestinationSelect,
}: DestinationSidebarProps) {
	return (
		<aside className="flex flex-col gap-2">
			{destinations.map((dest) => (
				<button
					type="button"
					key={dest.label}
					className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition-colors
            ${
							dest.enabled
								? selectedDestination.label === dest.label
									? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
									: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								: 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
						}`}
					disabled={!dest.enabled}
					onClick={() => dest.enabled && onDestinationSelect(dest)}
					aria-selected={selectedDestination.label === dest.label}
				>
					<span className="text-xl">{dest.icon}</span>
					{dest.label}
				</button>
			))}
		</aside>
	)
}
