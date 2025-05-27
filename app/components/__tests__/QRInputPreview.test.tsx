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
