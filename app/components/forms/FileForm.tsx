import React from 'react'
import { Upload, X, AlertCircle } from 'lucide-react'

interface FileFormProps {
	onValueChange: (value: string) => void
}

const MAX_DIRECT_ENCODE_SIZE = 1500 // bytes, leaving some margin for QR code overhead

export function FileForm({ onValueChange }: FileFormProps) {
	const [file, setFile] = React.useState<File | null>(null)
	const [preview, setPreview] = React.useState<string | null>(null)
	const [encodingStatus, setEncodingStatus] = React.useState<'direct' | 'external' | null>(null)
	const fileInputRef = React.useRef<HTMLInputElement>(null)

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (!selectedFile) return

		// Validate file size (max 5MB)
		if (selectedFile.size > 5 * 1024 * 1024) {
			alert('File size must be less than 5MB')
			return
		}

		setFile(selectedFile)

		// Check if we can encode directly
		if (selectedFile.size <= MAX_DIRECT_ENCODE_SIZE) {
			try {
				const dataUrl = await readFileAsDataURL(selectedFile)
				setPreview(dataUrl)
				onValueChange(dataUrl)
				setEncodingStatus('direct')
			} catch (error) {
				console.error('Error reading file:', error)
				setEncodingStatus('external')
			}
		} else {
			// For larger files, create preview URL for images
			if (selectedFile.type.startsWith('image/')) {
				const url = URL.createObjectURL(selectedFile)
				setPreview(url)
				onValueChange(url)
			} else {
				// For non-image files, we'll use a placeholder
				setPreview(null)
				onValueChange(selectedFile.name)
			}
			setEncodingStatus('external')
		}
	}

	const readFileAsDataURL = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = reject
			reader.readAsDataURL(file)
		})
	}

	const handleRemoveFile = () => {
		if (preview) {
			URL.revokeObjectURL(preview)
		}
		setFile(null)
		setPreview(null)
		setEncodingStatus(null)
		onValueChange('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className="w-full space-y-4">
			<div className="flex flex-col items-center justify-center w-full">
				<label
					htmlFor="file-upload"
					className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Upload className="w-8 h-8 mb-4 text-gray-500" />
						<p className="mb-2 text-sm text-gray-500">
							<span className="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p className="text-xs text-gray-500">Max file size: 5MB</p>
					</div>
					<input
						id="file-upload"
						type="file"
						className="hidden"
						onChange={handleFileChange}
						ref={fileInputRef}
						accept="image/*,.pdf,.doc,.docx,.txt"
					/>
				</label>
			</div>

			{file && (
				<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
					<div className="flex items-center space-x-4">
						{preview ? (
							<img
								src={preview}
								alt={file.name}
								className="w-12 h-12 object-cover rounded"
							/>
						) : (
							<div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
								<span className="text-xs text-gray-500">
									{file.name.split('.').pop()?.toUpperCase()}
								</span>
							</div>
						)}
						<div>
							<p className="text-sm font-medium text-gray-900">{file.name}</p>
							<p className="text-xs text-gray-500">
								{(file.size / 1024).toFixed(1)} KB
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={handleRemoveFile}
						className="p-1 text-gray-500 hover:text-gray-700"
						aria-label="Remove file"
					>
						<X className="w-5 h-5" />
					</button>
				</div>
			)}

			{encodingStatus && (
				<div className={`flex items-center gap-2 p-3 rounded-lg ${
					encodingStatus === 'direct' 
						? 'bg-green-50 text-green-700' 
						: 'bg-yellow-50 text-yellow-700'
				}`}>
					<AlertCircle className="w-5 h-5" />
					<p className="text-sm">
						{encodingStatus === 'direct'
							? 'File will be encoded directly in QR code'
							: 'File is too large for direct encoding'}
					</p>
				</div>
			)}
		</div>
	)
} 