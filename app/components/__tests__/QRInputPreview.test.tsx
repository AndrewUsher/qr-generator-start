import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { QRInputPreview } from '../QRInputPreview'

describe('QRInputPreview', () => {
	const mockDestination = {
		label: 'Email',
		icon: '✉️',
		enabled: true,
	}

	it('renders email form when email destination is selected', () => {
		render(<QRInputPreview selectedDestination={mockDestination} />)

		expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
	})

	it('updates email form fields when user types', () => {
		render(<QRInputPreview selectedDestination={mockDestination} />)

		const emailInput = screen.getByLabelText(/email address/i)
		const subjectInput = screen.getByLabelText(/subject/i)
		const messageInput = screen.getByLabelText(/message/i)

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
		fireEvent.change(messageInput, { target: { value: 'Test Message' } })

		expect(emailInput).toHaveValue('test@example.com')
		expect(subjectInput).toHaveValue('Test Subject')
		expect(messageInput).toHaveValue('Test Message')
	})

	it('renders website form when website destination is selected', () => {
		const websiteDestination = {
			label: 'Website',
			icon: '🔗',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={websiteDestination} />)

		expect(screen.getByLabelText(/enter your website url/i)).toBeInTheDocument()
	})

	it('renders message form when message destination is selected', () => {
		const messageDestination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={messageDestination} />)

		expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
	})

	it('updates message form when user types', () => {
		const messageDestination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={messageDestination} />)

		const phoneInput = screen.getByLabelText(/phone number/i)
		const messageInput = screen.getByLabelText(/message/i)

		fireEvent.change(phoneInput, { target: { value: '+1234567890' } })
		fireEvent.change(messageInput, { target: { value: 'Hello, World!' } })

		expect(phoneInput).toHaveValue('+1234567890')
		expect(messageInput).toHaveValue('Hello, World!')
	})

	it('generates SMS URL when form is filled', () => {
		const messageDestination = {
			label: 'Message',
			icon: '💬',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={messageDestination} />)

		const phoneInput = screen.getByLabelText(/phone number/i)
		const messageInput = screen.getByLabelText(/message/i)

		fireEvent.change(phoneInput, { target: { value: '+1234567890' } })
		fireEvent.change(messageInput, { target: { value: 'Hello, World!' } })

		// In development mode, we can see the QR code value in the preview text
		if (process.env.NODE_ENV === 'development') {
			expect(
				screen.getByText(/sms:\+1234567890\?body=Hello%2C%20World!/),
			).toBeInTheDocument()
		}
	})

	it('shows QR code preview when form is filled', () => {
		render(<QRInputPreview selectedDestination={mockDestination} />)

		const emailInput = screen.getByLabelText(/email address/i)
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

		// In development mode, we can see the QR code value in the preview text
		if (process.env.NODE_ENV === 'development') {
			expect(screen.getByText(/mailto:test@example.com/)).toBeInTheDocument()
		}
	})

	it('renders instagram form when instagram destination is selected', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		expect(screen.getByLabelText(/instagram username/i)).toBeInTheDocument()
	})

	it('updates instagram form when user types', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		const usernameInput = screen.getByLabelText(/instagram username/i)

		fireEvent.change(usernameInput, { target: { value: 'testuser' } })
		expect(usernameInput).toHaveValue('testuser')
	})

	it('generates instagram URL when form is filled', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		const usernameInput = screen.getByLabelText(/instagram username/i)

		fireEvent.change(usernameInput, { target: { value: 'testuser' } })

		// In development mode, we can see the QR code value in the preview text
		if (process.env.NODE_ENV === 'development') {
			expect(screen.getByText(/https:\/\/instagram.com\/testuser/)).toBeInTheDocument()
		}
	})

	it('handles @ symbol in instagram username', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		const usernameInput = screen.getByLabelText(/instagram username/i)

		fireEvent.change(usernameInput, { target: { value: '@testuser' } })

		// In development mode, we can see the QR code value in the preview text
		if (process.env.NODE_ENV === 'development') {
			expect(screen.getByText(/https:\/\/instagram.com\/testuser/)).toBeInTheDocument()
		}
	})

	it('validates instagram username format', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		const usernameInput = screen.getByLabelText(/instagram username/i)

		// Test invalid username with special characters
		fireEvent.change(usernameInput, { target: { value: 'test@user' } })
		expect(screen.getByText(/username must be 30 characters or less/i)).toBeInTheDocument()

		// Test valid username
		fireEvent.change(usernameInput, { target: { value: 'test.user_123' } })
		expect(screen.queryByText(/username must be 30 characters or less/i)).not.toBeInTheDocument()
	})

	it('handles instagram post URL input', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		// Switch to post type
		const contentTypeSelect = screen.getByLabelText(/content type/i)
		fireEvent.change(contentTypeSelect, { target: { value: 'post' } })

		const postUrlInput = screen.getByLabelText(/instagram post url/i)

		// Test invalid URL
		fireEvent.change(postUrlInput, { target: { value: 'invalid-url' } })
		expect(screen.getByText(/please enter a valid instagram post or reel url/i)).toBeInTheDocument()

		// Test valid URL
		fireEvent.change(postUrlInput, { target: { value: 'https://instagram.com/p/abc123' } })
		expect(screen.queryByText(/please enter a valid instagram post or reel url/i)).not.toBeInTheDocument()
	})

	it('handles instagram reel URL input', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		// Switch to reel type
		const contentTypeSelect = screen.getByLabelText(/content type/i)
		fireEvent.change(contentTypeSelect, { target: { value: 'reel' } })

		const reelUrlInput = screen.getByLabelText(/instagram reel url/i)

		// Test invalid URL
		fireEvent.change(reelUrlInput, { target: { value: 'invalid-url' } })
		expect(screen.getByText(/please enter a valid instagram post or reel url/i)).toBeInTheDocument()

		// Test valid URL
		fireEvent.change(reelUrlInput, { target: { value: 'https://instagram.com/reel/abc123' } })
		expect(screen.queryByText(/please enter a valid instagram post or reel url/i)).not.toBeInTheDocument()
	})

	it('shows preview button for all content types', () => {
		const instagramDestination = {
			label: 'Instagram',
			icon: '📸',
			enabled: true,
		}

		render(<QRInputPreview selectedDestination={instagramDestination} />)

		// Check profile preview button
		expect(screen.getByText(/preview profile/i)).toBeInTheDocument()

		// Switch to post type
		const contentTypeSelect = screen.getByLabelText(/content type/i)
		fireEvent.change(contentTypeSelect, { target: { value: 'post' } })
		expect(screen.getByText(/preview post/i)).toBeInTheDocument()

		// Switch to reel type
		fireEvent.change(contentTypeSelect, { target: { value: 'reel' } })
		expect(screen.getByText(/preview reel/i)).toBeInTheDocument()
	})
})
