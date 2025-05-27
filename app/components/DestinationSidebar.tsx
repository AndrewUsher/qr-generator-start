import React from 'react';

const destinations = [
	{ label: 'Website', icon: '🔗', enabled: true },
	{ label: 'Google Doc', icon: '📄', enabled: false },
	{ label: 'Youtube', icon: '▶️', enabled: false },
	{ label: 'Facebook', icon: '📘', enabled: false },
	{ label: 'Upload a File', icon: '📁', enabled: false },
	{ label: 'Instagram', icon: '📸', enabled: false },
	{ label: 'Message', icon: '💬', enabled: false },
	{ label: 'Email', icon: '✉️', enabled: false },
];

export function DestinationSidebar() {
	return (
		<aside className="flex flex-col gap-2">
			{destinations.map((dest) => (
				<button
					key={dest.label}
					className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition-colors
            ${dest.enabled ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'}`}
					disabled={!dest.enabled}
					aria-selected={dest.enabled}
				>
					<span className="text-xl">{dest.icon}</span>
					{dest.label}
				</button>
			))}
		</aside>
	);
}
