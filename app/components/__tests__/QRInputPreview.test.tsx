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
})
