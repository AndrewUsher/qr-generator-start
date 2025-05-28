import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CustomizationPanel } from '../CustomizationPanel'

const PREDEFINED_COLORS = [
	'#000000', '#2563eb', '#ef4444', '#22c55e', '#a21caf', '#f59e42',
	'#eab308', '#14b8a6', '#6b7280', '#f472b6', '#facc15', '#fff',
]

describe('CustomizationPanel', () => {
	it('calls onColorChange when a color swatch is clicked', () => {
		const onColorChange = vi.fn()
		render(<CustomizationPanel onColorChange={onColorChange} selectedColor="#000000" />)
		const blueSwatch = screen.getByLabelText('Select color #2563eb')
		fireEvent.click(blueSwatch)
		expect(onColorChange).toHaveBeenCalledWith('#2563eb')
	})

	it('calls onColorChange when a custom color is picked', () => {
		const onColorChange = vi.fn()
		render(<CustomizationPanel onColorChange={onColorChange} selectedColor="#000000" />)
		const colorInput = screen.getByLabelText('Pick a custom color')
		fireEvent.change(colorInput, { target: { value: '#123456' } })
		expect(onColorChange).toHaveBeenCalledWith('#123456')
	})

	it('calls onBgColorChange when a background color swatch is clicked', () => {
		const onBgColorChange = vi.fn()
		render(<CustomizationPanel onBgColorChange={onBgColorChange} selectedBgColor="#ffffff" />)
		const pinkSwatch = screen.getByLabelText('Select background color #f472b6')
		fireEvent.click(pinkSwatch)
		expect(onBgColorChange).toHaveBeenCalledWith('#f472b6')
	})

	it('calls onBgColorChange when a custom background color is picked', () => {
		const onBgColorChange = vi.fn()
		render(<CustomizationPanel onBgColorChange={onBgColorChange} selectedBgColor="#ffffff" />)
		const colorInput = screen.getByLabelText('Pick a custom background color')
		fireEvent.change(colorInput, { target: { value: '#abcdef' } })
		expect(onBgColorChange).toHaveBeenCalledWith('#abcdef')
	})

	it('highlights the selected color swatch', () => {
		render(<CustomizationPanel selectedColor="#ef4444" />)
		const redSwatch = screen.getByLabelText('Select color #ef4444')
		expect(redSwatch.className).toContain('border-blue-500')
	})

	it('highlights the selected background color swatch', () => {
		render(<CustomizationPanel selectedBgColor="#eab308" />)
		const yellowSwatch = screen.getByLabelText('Select background color #eab308')
		expect(yellowSwatch.className).toContain('border-blue-500')
	})
}) 