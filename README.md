# PDF Merger

**Weekly Vibe Code Challenge: Project 1**

A macOS desktop application for merging PDF files built with Electron, React, Tailwind CSS, and pdf-lib.

## Features

✨ **Drag and Drop** - Simply drag PDF files into the app or click to browse
📋 **Visual Preview** - See all selected PDFs with file names and sizes
🔄 **Reorder PDFs** - Drag and drop PDFs to reorder them before merging
📝 **Custom Filename** - Name your merged PDF file
📍 **Choose Output Location** - Save merged PDFs wherever you want
⚡ **Progress Tracking** - Real-time progress indicator during merge
✅ **Success Feedback** - Clear notifications when merge completes
❌ **Error Handling** - Graceful error messages for any issues

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **macOS** (for building .app bundle)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MergePDF
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   npm run build:css
   ```

## Development

Run the application in development mode:

```bash
npm start
```

This will:
- Build Tailwind CSS
- Watch for CSS changes
- Launch the Electron application

## Building for Production

### Build the Application

```bash
npm run build
```

This creates a production-ready webpack bundle in the `dist/` directory.

### Package as macOS App

```bash
npm run package:mac
```

This creates a distributable macOS application (.app bundle) in the `release/` directory. You can:
- Double-click the .app to launch it
- Move it to your Applications folder
- Distribute it to other macOS users

The packaged app includes:
- DMG installer
- ZIP archive

## Usage

1. **Launch the app** - Double-click the PDF Merger.app or run `npm start`

2. **Add PDF files**
   - Drag and drop PDF files onto the drop zone, OR
   - Click the drop zone to browse and select files

3. **Reorder PDFs** (optional)
   - Drag PDF items up or down to change merge order
   - The number badge shows the current position

4. **Configure output**
   - Enter a filename for the merged PDF
   - Click "Browse" to select where to save the file
   - Or leave default (will prompt when merging)

5. **Merge**
   - Click the "Merge PDFs" button
   - Watch the progress indicator
   - Success notification appears when complete

6. **Remove files** (optional)
   - Click the X button on any PDF to remove it from the list

## Project Structure

```
MergePDF/
├── electron.js              # Main Electron process
├── preload.js               # Security bridge (IPC)
├── package.json             # Dependencies and scripts
├── webpack.config.js        # React bundler config
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── src/
│   ├── index.html          # HTML entry point
│   ├── renderer.jsx        # React entry point
│   ├── App.jsx             # Main app component
│   ├── components/
│   │   ├── DropZone.jsx    # Drag-drop file selector
│   │   ├── PDFList.jsx     # PDF list container
│   │   ├── PDFListItem.jsx # Individual PDF item
│   │   ├── MergeButton.jsx # Merge action button
│   │   ├── ProgressIndicator.jsx # Progress bar
│   │   └── Toast.jsx       # Notification component
│   └── styles/
│       ├── input.css       # Tailwind source
│       └── output.css      # Compiled CSS
├── build/                   # App icon and resources
├── dist/                    # Webpack build output
└── release/                 # Packaged .app bundles
```

## Technology Stack

- **Electron** - Desktop app framework
- **React** - UI library for component-based architecture
- **Tailwind CSS** - Utility-first CSS framework
- **pdf-lib** - PDF manipulation library
- **Webpack** - Module bundler for React
- **Babel** - JavaScript transpiler for JSX

## Troubleshooting

### App won't start
- Make sure you've run `npm install`
- Build Tailwind CSS: `npm run build:css`
- Check for error messages in the terminal

### Merge fails
- Ensure all files are valid PDFs
- Check file permissions
- Try with smaller PDFs first
- Check the error message for details

### UI looks broken
- Run `npm run build:css` to rebuild styles
- Clear cache and restart: `rm -rf node_modules && npm install`

### Can't package app
- Ensure you're on macOS
- Run `npm run build` first
- Check that `build/icon.icns` exists

## Known Limitations

- macOS only (can be extended for Windows/Linux)
- Large PDFs (100+ MB each) may take time to process
- Encrypted/password-protected PDFs require decryption first

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
