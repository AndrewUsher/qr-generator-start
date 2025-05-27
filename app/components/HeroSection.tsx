import React from 'react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
	return (
		<section className="w-full flex flex-col items-center justify-center py-16 bg-white">
			<h1 className="text-5xl md:text-6xl font-black text-center mb-4">
				Generate and Publish{' '}
				<span className="text-blue-600 font-extrabold underline decoration-blue-400">
					Dynamic
				</span>{' '}
				QR Codes.
			</h1>
			<p className="text-lg text-gray-500 text-center max-w-xl mb-8">
				Qoda is a dynamic QR code generator. It allows users to easily create
				customized QR codes for sharing or embedding on their website.
			</p>
			<div className="flex gap-4 mb-8">
				<Button
					className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow"
					variant="default"
				>
					Get Started
				</Button>
				<Button
					className="border-2 border-blue-600 text-blue-600 bg-white px-8 py-3 text-lg rounded-lg"
					variant="outline"
				>
					Watch demo
				</Button>
			</div>
			{/* Placeholder for arrow illustration */}
			<div className="w-24 h-8 mb-2">
				{/* TODO: Add SVG arrow illustration here */}
			</div>
		</section>
	);
}
