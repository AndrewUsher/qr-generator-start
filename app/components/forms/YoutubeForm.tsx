import React from 'react'
import { Youtube, Link, Copy, Check } from 'lucide-react'

interface YoutubeFormProps {
	onValueChange: (value: string) => void
}

type YoutubeContentType = 'video' | 'channel' | 'playlist'

export function YoutubeForm({ onValueChange }: YoutubeFormProps) {
	const [url, setUrl] = React.useState('')
	const [contentType, setContentType] =
		React.useState<YoutubeContentType>('video')
	const [copied, setCopied] = React.useState(false)
	const [preview, setPreview] = React.useState<{
		title: string
		thumbnail: string
		type: YoutubeContentType
	} | null>(null)

	const validateAndGenerateUrl = async () => {
		// Basic URL validation
		if (!url) return

		let videoId: string | null = null
		let channelId: string | null = null
		let playlistId: string | null = null

		// Handle different YouTube URL formats
		if (url.includes('youtube.com/watch')) {
			const urlParams = new URLSearchParams(new URL(url).search)
			videoId = urlParams.get('v')
		} else if (url.includes('youtu.be/')) {
			videoId = url.split('youtu.be/')[1].split('?')[0]
		} else if (url.includes('youtube.com/channel/')) {
			channelId = url.split('youtube.com/channel/')[1].split('?')[0]
		} else if (url.includes('youtube.com/c/')) {
			// Handle custom channel URLs
			const channelName = url.split('youtube.com/c/')[1].split('?')[0]
			// Note: In a real app, you'd need to make an API call to get the channel ID
			channelId = channelName
		} else if (url.includes('youtube.com/playlist')) {
			const urlParams = new URLSearchParams(new URL(url).search)
			playlistId = urlParams.get('list')
		}

		if (videoId) {
			const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
			setPreview({
				title: `Video: ${videoId}`,
				thumbnail,
				type: 'video',
			})
			onValueChange(`https://youtube.com/watch?v=${videoId}`)
		} else if (channelId) {
			setPreview({
				title: `Channel: ${channelId}`,
				thumbnail: 'https://via.placeholder.com/320x180?text=Channel',
				type: 'channel',
			})
			onValueChange(`https://youtube.com/channel/${channelId}`)
		} else if (playlistId) {
			setPreview({
				title: `Playlist: ${playlistId}`,
				thumbnail: 'https://via.placeholder.com/320x180?text=Playlist',
				type: 'playlist',
			})
			onValueChange(`https://youtube.com/playlist?list=${playlistId}`)
		} else {
			setPreview(null)
			onValueChange('')
		}
	}

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy URL:', error)
		}
	}

	const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = e.target.value as YoutubeContentType
		setContentType(newType)
		setUrl('')
		setPreview(null)
		onValueChange('')
	}

	return (
		<div className="w-full space-y-4">
			<div className="flex flex-col gap-4">
				<div>
					<label
						htmlFor="content-type"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Content Type
					</label>
					<select
						id="content-type"
						value={contentType}
						onChange={handleContentTypeChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="video">Video</option>
						<option value="channel">Channel</option>
						<option value="playlist">Playlist</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="youtube-url"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						YouTube URL
					</label>
					<div className="flex gap-2">
						<input
							type="text"
							id="youtube-url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder={
								contentType === 'video'
									? 'https://youtube.com/watch?v=...'
									: contentType === 'channel'
										? 'https://youtube.com/channel/...'
										: 'https://youtube.com/playlist?list=...'
							}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
							type="button"
							onClick={validateAndGenerateUrl}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							aria-label="Validate URL"
						>
							<Link className="w-5 h-5" />
						</button>
						<button
							type="button"
							onClick={handleCopyUrl}
							className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
							aria-label="Copy URL"
						>
							{copied ? (
								<Check className="w-5 h-5" />
							) : (
								<Copy className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			{preview && (
				<div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
					<img
						src={preview.thumbnail}
						alt={preview.title}
						className="w-32 h-20 object-cover rounded"
						onError={(e) => {
							e.currentTarget.src =
								'https://via.placeholder.com/320x180?text=Error'
						}}
					/>
					<div>
						<p className="font-medium">{preview.title}</p>
						<p className="text-sm text-gray-500">
							{preview.type === 'video'
								? 'YouTube Video'
								: preview.type === 'channel'
									? 'YouTube Channel'
									: 'YouTube Playlist'}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
