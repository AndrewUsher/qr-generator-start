import React from 'react';

export function QRInputPreview() {
	return (
		<div className="flex flex-col items-center gap-4">
			<label
				htmlFor="website-url"
				className="text-sm font-medium text-gray-700 self-start mb-1"
			>
				Enter your website URL
			</label>
			<input
				id="website-url"
				type="text"
				placeholder="URL the website"
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
				disabled
			/>
			<span className="text-sm text-gray-500 mt-2 self-start">
				Live Preview
			</span>
			<div className="w-56 h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">
				QR Code
			</div>
		</div>
	);
}
