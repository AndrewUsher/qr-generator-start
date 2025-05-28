import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QRInputPreview } from '../QRInputPreview'
import type { Destination } from '../DestinationSidebar'

// Mocks for browser APIs
beforeAll(() => {
	Object.assign(URL, {
		revokeObjectURL: vi.fn(),
		createObjectURL: vi.fn(() => 'blob:http://localhost/fake'),
	})
	Object.assign(navigator, {
		clipboard: { write: vi.fn().mockResolvedValue(undefined) },
	})
	Object.assign(window, {
		ClipboardItem: function (data) {
			this.data = data
		},
		Image: class {
			onload?: () => void
			set src(_) {
				setTimeout(() => (this.onload?.()), 10)
			}
		},
	})
})

beforeEach(() => {
	// Mock canvas and toBlob for copy tests
		vi.spyOn(document, 'createElement').mockImplementation((tag) => {
			if (tag === 'canvas') {
				return {
					getContext: () => ({
						drawImage: vi.fn(),
					}),
					toBlob: (cb) => cb(new Blob()),
					width: 200,
					height: 200,
				} as unknown
			}
			return document.createElement.call(document, tag)
		})
})

const mockDestination: Destination = {
	label: 'Website',
	icon: '🔗',
	enabled: true,
}

describe('QRInputPreview', () => {
	it('renders website form by default', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		expect(
			screen.getByPlaceholderText('https://example.com'),
		).toBeInTheDocument()
	})

	it('renders website form when no destination is selected', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		expect(
			screen.getByPlaceholderText('https://example.com'),
		).toBeInTheDocument()
	})

	it('renders email form when email destination is selected', () => {
		const emailDestination: Destination = {
			label: 'Email',
			icon: '📧',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={emailDestination} qrSize="medium" />,
		)
		expect(screen.getByPlaceholderText('recipient@example.com')).toBeInTheDocument()
	})

	it('renders website form when website destination is selected', () => {
		const websiteDestination: Destination = {
			label: 'Website',
			icon: '🔗',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={websiteDestination}
				qrSize="medium"
			/>,
		)
		expect(
			screen.getByPlaceholderText('https://example.com'),
		).toBeInTheDocument()
	})

	it('renders message form when message destination is selected', () => {
		const messageDestination: Destination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={messageDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByPlaceholderText('Type your message here...')).toBeInTheDocument()
	})

	it('updates QR code value when website URL is entered', () => {
		const websiteDestination: Destination = {
			label: 'Website',
			icon: '🔗',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={websiteDestination}
				qrSize="medium"
			/>,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		expect(screen.getByText('Preview')).toBeInTheDocument()
	})

	it('updates QR code value when email is entered', () => {
		const emailDestination: Destination = {
			label: 'Email',
			icon: '📧',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={emailDestination} qrSize="medium" />,
		)
		const input = screen.getByPlaceholderText('recipient@example.com')
		fireEvent.change(input, { target: { value: 'test@example.com' } })
		expect(screen.getByText('Preview')).toBeInTheDocument()
	})

	it('updates QR code value when message is entered', () => {
		const messageDestination: Destination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={messageDestination}
				qrSize="medium"
			/>,
		)
		const input = screen.getByPlaceholderText('Type your message here...')
		fireEvent.change(input, { target: { value: 'Hello, World!' } })
		expect(screen.getByText('Preview')).toBeInTheDocument()
	})

	it('shows QR code placeholder when no value is entered', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		expect(screen.getByText('QR Code')).toBeInTheDocument()
	})

	it('shows QR code when value is entered', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		expect(screen.queryByText('QR Code')).not.toBeInTheDocument()
	})

	it('renders Instagram form when Instagram destination is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByText('Content Type')).toBeInTheDocument()
	})

	it('shows username input when profile type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByPlaceholderText('@username')).toBeInTheDocument()
	})

	it('shows post URL input when post type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'post' } })
		expect(
			screen.getByPlaceholderText('https://instagram.com/p/...'),
		).toBeInTheDocument()
	})

	it('shows reel URL input when reel type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'reel' } })
		expect(
			screen.getByPlaceholderText('https://instagram.com/p/...'),
		).toBeInTheDocument()
	})

	it('shows preview button for all content types', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByText('Preview Profile')).toBeInTheDocument()

		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'post' } })
		expect(screen.getByText('Preview Post')).toBeInTheDocument()

		fireEvent.change(select, { target: { value: 'reel' } })
		expect(screen.getByText('Preview Reel')).toBeInTheDocument()
	})

	it('shows shortened URL option', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByLabelText('Use shortened URL')).toBeInTheDocument()
	})

	it('shows profile preview for valid username', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)
		const input = screen.getByPlaceholderText('@username')
		fireEvent.change(input, { target: { value: 'testuser' } })
		expect(screen.getByText('@testuser')).toBeInTheDocument()
	})

	it('copies URL to clipboard', async () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={instagramDestination}
				qrSize="medium"
			/>,
		)

		// Mock clipboard API
		const mockClipboard = {
			writeText: vi.fn().mockResolvedValue(undefined),
		}
		Object.assign(navigator, {
			clipboard: mockClipboard,
		})

		const input = screen.getByPlaceholderText('@username')
		fireEvent.change(input, { target: { value: 'testuser' } })

		const copyButton = screen.getByText('Copy URL')
		fireEvent.click(copyButton)

		expect(mockClipboard.writeText).toHaveBeenCalledWith(
			'https://instagram.com/testuser',
		)
		expect(screen.getByText('Copied!')).toBeInTheDocument()
	})

	it('renders file form when file destination is selected', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)
		expect(screen.getByText('Click to upload')).toBeInTheDocument()
	})

	it('shows file preview when image is uploaded', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const file = new File(['test'], 'test.png', { type: 'image/png' })
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [file],
		})

		fireEvent.change(input)

		expect(screen.getByText('test.png')).toBeInTheDocument()
		expect(screen.getByText('0.0 KB')).toBeInTheDocument()
	})

	it('shows file type icon for non-image files', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [file],
		})

		fireEvent.change(input)

		expect(screen.getByText('test.pdf')).toBeInTheDocument()
		expect(screen.getByText('PDF')).toBeInTheDocument()
	})

	it('removes file when remove button is clicked', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const file = new File(['test'], 'test.png', { type: 'image/png' })
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [file],
		})

		fireEvent.change(input)

		const removeButton = screen.getByLabelText('Remove file')
		fireEvent.click(removeButton)

		expect(screen.queryByText('test.png')).not.toBeInTheDocument()
		expect(screen.getByText('Click to upload')).toBeInTheDocument()
	})

	it('rejects files larger than 5MB', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.png', {
			type: 'image/png',
		})
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [largeFile],
		})

		const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
		fireEvent.change(input)

		expect(alertMock).toHaveBeenCalledWith('File size must be less than 5MB')
		expect(screen.queryByText('large.png')).not.toBeInTheDocument()

		alertMock.mockRestore()
	})

	it('shows direct encoding status for small files', async () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const smallFile = new File(['test'], 'test.txt', { type: 'text/plain' })
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [smallFile],
		})

		fireEvent.change(input)

		expect(
			screen.getByText('File will be encoded directly in QR code'),
		).toBeInTheDocument()
	})

	it('shows external encoding status for large files', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const largeFile = new File(['x'.repeat(2000)], 'large.txt', {
			type: 'text/plain',
		})
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [largeFile],
		})

		fireEvent.change(input)

		expect(
			screen.getByText('File is too large for direct encoding'),
		).toBeInTheDocument()
	})

	it('clears encoding status when file is removed', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(
			<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />,
		)

		const file = new File(['test'], 'test.txt', { type: 'text/plain' })
		const input = screen.getByLabelText(/Click to upload/)

		Object.defineProperty(input, 'files', {
			value: [file],
		})

		fireEvent.change(input)

		const removeButton = screen.getByLabelText('Remove file')
		fireEvent.click(removeButton)

		expect(
			screen.queryByText('File will be encoded directly in QR code'),
		).not.toBeInTheDocument()
		expect(
			screen.queryByText('File is too large for direct encoding'),
		).not.toBeInTheDocument()
	})

	it('renders YouTube form when YouTube destination is selected', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		expect(screen.getByText('Content Type')).toBeInTheDocument()
	})

	it('shows video URL input when video type is selected', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		expect(
			screen.getByPlaceholderText('https://youtube.com/watch?v=...'),
		).toBeInTheDocument()
	})

	it('shows channel URL input when channel type is selected', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'channel' } })
		expect(
			screen.getByPlaceholderText('https://youtube.com/channel/...'),
		).toBeInTheDocument()
	})

	it('shows playlist URL input when playlist type is selected', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'playlist' } })
			expect(
			screen.getByPlaceholderText('https://youtube.com/playlist?list=...'),
			).toBeInTheDocument()
	})

	it('shows video preview for valid video URL', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		const input = screen.getByPlaceholderText('https://youtube.com/watch?v=...')
		fireEvent.change(input, {
			target: { value: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
		})
		const linkButton = screen.getByRole('button', { name: 'Validate URL' })
		fireEvent.click(linkButton)
		expect(screen.getByText('Video: dQw4w9WgXcQ')).toBeInTheDocument()
	})

	it('shows channel preview for valid channel URL', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'channel' } })
		const input = screen.getByPlaceholderText('https://youtube.com/channel/...')
		fireEvent.change(input, {
			target: { value: 'https://youtube.com/channel/UC1234567890' },
		})
		const linkButton = screen.getByRole('button', { name: 'Validate URL' })
		fireEvent.click(linkButton)
		expect(screen.getByText('Channel: UC1234567890')).toBeInTheDocument()
	})

	it('shows playlist preview for valid playlist URL', () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'playlist' } })
		const input = screen.getByPlaceholderText(
			'https://youtube.com/playlist?list=...',
		)
		fireEvent.change(input, {
			target: { value: 'https://youtube.com/playlist?list=PL1234567890' },
		})
		const linkButton = screen.getByRole('button', { name: 'Validate URL' })
		fireEvent.click(linkButton)
		expect(screen.getByText('Playlist: PL1234567890')).toBeInTheDocument()
	})

	it('copies URL to clipboard', async () => {
		const youtubeDestination: Destination = {
			label: 'Youtube',
			icon: '🎥',
			enabled: true,
		}
		render(
			<QRInputPreview
				selectedDestination={youtubeDestination}
				qrSize="medium"
			/>,
		)

		// Mock clipboard API
		const mockClipboard = {
			writeText: vi.fn().mockResolvedValue(undefined),
		}
		Object.assign(navigator, {
			clipboard: mockClipboard,
		})

		const input = screen.getByPlaceholderText('https://youtube.com/watch?v=...')
		fireEvent.change(input, {
			target: { value: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
		})

		const copyButton = screen.getByRole('button', { name: 'Copy URL' })
		fireEvent.click(copyButton)

		expect(mockClipboard.writeText).toHaveBeenCalledWith(
			'https://youtube.com/watch?v=dQw4w9WgXcQ',
		)
		expect(screen.getByRole('button', { name: 'Copy URL' })).toBeInTheDocument()
	})
})

describe('QRInputPreview color customization', () => {
	it('renders QR code with custom foreground color', () => {
		render(
			<QRInputPreview
				selectedDestination={mockDestination}
				qrSize="medium"
				fgColor="#ff0000"
			/>,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		const svg = screen.getByRole('img') || document.querySelector('svg')
		expect(svg).toBeTruthy()
		// The QRCodeSVG component sets fgColor as the fill for the path
		// We check that a path exists with the correct fill
		const path = svg?.querySelector('path')
		expect(path?.getAttribute('fill')).toBe('#ff0000')
	})

	it('renders QR code with custom background color', () => {
		render(
			<QRInputPreview
				selectedDestination={mockDestination}
				qrSize="medium"
				bgColor="#00ff00"
			/>,
		)
		const svg = screen.getByRole('img') || document.querySelector('svg')
		expect(svg).toBeTruthy()
		// The QRCodeSVG component sets bgColor as the fill for the rect
		const rect = svg?.querySelector('rect')
		expect(rect?.getAttribute('fill')).toBe('#00ff00')
	})

	it('renders QR code with both custom fgColor and bgColor', () => {
		render(
			<QRInputPreview
				selectedDestination={mockDestination}
				qrSize="medium"
				fgColor="#123456"
				bgColor="#abcdef"
			/>,
		)
		const svg = screen.getByRole('img') || document.querySelector('svg')
		expect(svg).toBeTruthy()
		const rect = svg?.querySelector('rect')
		const path = svg?.querySelector('path')
		expect(rect?.getAttribute('fill')).toBe('#abcdef')
		expect(path?.getAttribute('fill')).toBe('#123456')
	})
})

describe('QRInputPreview download and copy', () => {
	it('shows Download and Copy buttons when QR value is present', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		expect(screen.getByText('Download QR Code')).toBeInTheDocument()
		expect(screen.getByText('Copy QR Code Image')).toBeInTheDocument()
	})

	it('downloads SVG when Download QR Code is clicked', () => {
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		const createElementSpy = vi.spyOn(document, 'createElement')
		const appendChildSpy = vi.spyOn(document.body, 'appendChild')
		const removeChildSpy = vi.spyOn(document.body, 'removeChild')
		const revokeSpy = vi.spyOn(URL, 'revokeObjectURL')
		const link = document.createElement('a')
		createElementSpy.mockReturnValue(link)
		const clickSpy = vi.spyOn(link, 'click')
		const downloadBtn = screen.getByText('Download QR Code')
		fireEvent.click(downloadBtn)
		expect(createElementSpy).toHaveBeenCalledWith('a')
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(clickSpy).toHaveBeenCalled()
		expect(removeChildSpy).toHaveBeenCalledWith(link)
		expect(revokeSpy).toHaveBeenCalled()
		createElementSpy.mockRestore()
		appendChildSpy.mockRestore()
		removeChildSpy.mockRestore()
		revokeSpy.mockRestore()
	})

	it('copies QR code image to clipboard when Copy QR Code Image is clicked', async () => {
		const writeMock = vi.fn().mockResolvedValue(undefined)
		Object.assign(navigator, {
			clipboard: { write: writeMock },
		})
		Object.assign(window, {
			ClipboardItem: function (data) {
				this.data = data
			},
		})
		render(
			<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />,
		)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		const copyBtn = screen.getByText('Copy QR Code Image')
		fireEvent.click(copyBtn)
		// Wait for async clipboard logic
		await new Promise((resolve) => setTimeout(resolve, 100))
		// We can't check the actual image, but we can check that clipboard.write was called
		expect(writeMock).toHaveBeenCalled()
	})
})
