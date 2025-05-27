import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QRInputPreview } from '../QRInputPreview'
import type { Destination } from '../DestinationSidebar'

const mockDestination: Destination = {
	label: 'Website',
	icon: '🔗',
	enabled: true,
}

describe('QRInputPreview', () => {
	it('renders website form by default', () => {
		render(<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
	})

	it('renders website form when no destination is selected', () => {
		render(<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
	})

	it('renders email form when email destination is selected', () => {
		const emailDestination: Destination = {
			label: 'Email',
			icon: '📧',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={emailDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument()
	})

	it('renders website form when website destination is selected', () => {
		const websiteDestination: Destination = {
			label: 'Website',
			icon: '🔗',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={websiteDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
	})

	it('renders message form when message destination is selected', () => {
		const messageDestination: Destination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={messageDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument()
	})

	it('updates QR code value when website URL is entered', () => {
		const websiteDestination: Destination = {
			label: 'Website',
			icon: '🔗',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={websiteDestination} qrSize="medium" />)
		const input = screen.getByPlaceholderText('https://example.com')
		fireEvent.change(input, { target: { value: 'https://test.com' } })
		expect(screen.getByText('Live Preview for https://test.com')).toBeInTheDocument()
	})

	it('updates QR code value when email is entered', () => {
		const emailDestination: Destination = {
			label: 'Email',
			icon: '📧',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={emailDestination} qrSize="medium" />)
		const input = screen.getByPlaceholderText('email@example.com')
		fireEvent.change(input, { target: { value: 'test@example.com' } })
		expect(screen.getByText('Live Preview for mailto:test@example.com')).toBeInTheDocument()
	})

	it('updates QR code value when message is entered', () => {
		const messageDestination: Destination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={messageDestination} qrSize="medium" />)
		const input = screen.getByPlaceholderText('Enter your message')
		fireEvent.change(input, { target: { value: 'Hello, World!' } })
		expect(screen.getByText('Live Preview for Hello, World!')).toBeInTheDocument()
	})

	it('shows QR code placeholder when no value is entered', () => {
		render(<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />)
		expect(screen.getByText('QR Code')).toBeInTheDocument()
	})

	it('shows QR code when value is entered', () => {
		render(<QRInputPreview selectedDestination={mockDestination} qrSize="medium" />)
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
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		expect(screen.getByText('Content Type')).toBeInTheDocument()
	})

	it('shows username input when profile type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		expect(screen.getByPlaceholderText('@username')).toBeInTheDocument()
	})

	it('shows post URL input when post type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'post' } })
		expect(screen.getByPlaceholderText('https://instagram.com/p/...')).toBeInTheDocument()
	})

	it('shows reel URL input when reel type is selected', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		const select = screen.getByLabelText('Content Type')
		fireEvent.change(select, { target: { value: 'reel' } })
		expect(screen.getByPlaceholderText('https://instagram.com/p/...')).toBeInTheDocument()
	})

	it('shows preview button for all content types', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
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
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		expect(screen.getByLabelText('Use shortened URL')).toBeInTheDocument()
	})

	it('shows profile preview for valid username', () => {
		const instagramDestination: Destination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
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
		render(<QRInputPreview selectedDestination={instagramDestination} qrSize="medium" />)
		
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
		
		expect(mockClipboard.writeText).toHaveBeenCalledWith('https://instagram.com/testuser')
		expect(screen.getByText('Copied!')).toBeInTheDocument()
	})

	it('renders file form when file destination is selected', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />)
		expect(screen.getByText('Click to upload')).toBeInTheDocument()
	})

	it('shows file preview when image is uploaded', () => {
		const fileDestination: Destination = {
			label: 'File',
			icon: '📁',
			enabled: true,
		}
		render(<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />)
		
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
		render(<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />)
		
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
		render(<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />)
		
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
		render(<QRInputPreview selectedDestination={fileDestination} qrSize="medium" />)
		
		const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.png', { type: 'image/png' })
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
})
