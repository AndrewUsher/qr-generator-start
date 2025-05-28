# QR Generator

A modern, fully functional QR code generator web app built with React, TanStack Start, Tailwind CSS, and Shadcn UI. Generate QR codes for websites, emails, messages, Instagram, YouTube, and even files—with advanced customization and robust test coverage.

---

## Features

- **Multiple QR Destinations:**
  - Website URLs
  - Email (mailto)
  - Text messages (SMS)
  - Instagram (profile, post, reel)
  - YouTube (video, channel, playlist)
  - File upload (with direct encoding for small files)
- **File Upload & Encoding:**
  - Drag-and-drop or click to upload
  - Image preview and file type detection
  - Files ≤1.5KB are encoded directly as data URLs in the QR code
  - Larger files show status and are not directly encoded
- **Customization:**
  - QR code size (small, medium, large)
  - Foreground and background color pickers
  - Pattern selection (UI only; see limitations)
- **Live Preview:**
  - See your QR code update in real time as you type or upload
- **Download & Copy:**
  - Download QR code as SVG
  - Copy QR code image to clipboard
- **Validation & Feedback:**
  - Input validation for all destinations
  - Status messages for file encoding, copy, and download actions
- **Test Coverage:**
  - Comprehensive tests for all forms, file upload, encoding, and UI actions

---

## Technology Stack

- **Framework:** TanStack Start (React, SSR, file-based routing)
- **Styling:** Tailwind CSS, Shadcn UI, class-variance-authority, clsx, tailwind-merge
- **UI Primitives:** Radix UI, Lucide React
- **QR Code Rendering:** [qrcode.react](https://github.com/zpao/qrcode.react)
- **Testing:** Vitest, React Testing Library

---

## Directory Structure

```
app/
  components/
    forms/           # All destination forms (WebsiteForm, EmailForm, etc.)
    ui/              # Shadcn UI components
    lib/             # Utility functions
    ...
  routes/            # File-based routing
  styles/            # Tailwind and global CSS
  ...
```

---

## Usage

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## How It Works

- **Select a Destination:** Choose from Website, Email, Message, Instagram, File, or YouTube in the sidebar.
- **Fill Out the Form:** Each destination has a tailored form with validation and preview.
- **Customize Your QR Code:** Use the Customization Panel to adjust size, colors, and pattern.
- **Preview & Export:** See a live preview, then download or copy your QR code.
- **File Upload:** Upload a file to encode it directly (if small) or get a status message if too large.

---

## Known Limitations

- **QR Pattern Styling:**
  - The pattern selection UI is present, but the current QR code library (`qrcode.react`) does not support per-module or advanced pattern styling. Only color and size are customizable.
- **File Encoding Size Limit:**
  - Files larger than ~1.5KB cannot be encoded directly in the QR code due to QR data capacity limits.

---

## Tests

- All major features and edge cases are covered by tests in `app/components/__tests__/`.
- Run tests with:

```bash
npm test
```

---

## Credits

- Built with [TanStack Start](https://tanstack.com/start), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [qrcode.react](https://github.com/zpao/qrcode.react).
- UI icons by [Lucide](https://lucide.dev/).

---

## License

MIT
