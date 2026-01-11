const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#F5F5F7',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('src/index.html');

    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle file selection dialog
ipcMain.handle('select-files', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    if (result.canceled) {
        return [];
    }

    // Get file info for each selected file
    const filesInfo = await Promise.all(
        result.filePaths.map(async (filePath) => {
            const stats = await fs.stat(filePath);
            return {
                path: filePath,
                name: path.basename(filePath),
                size: stats.size,
            };
        })
    );

    return filesInfo;
});

// Handle output location selection
ipcMain.handle('select-output-location', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
    });

    if (result.canceled) {
        return null;
    }

    return result.filePaths[0];
});

// Handle PDF merging
ipcMain.handle('merge-pdfs', async (event, { filePaths, outputPath, fileName }) => {
    try {
        // Create a new PDF document
        const mergedPdf = await PDFDocument.create();

        // Process each PDF file
        for (let i = 0; i < filePaths.length; i++) {
            const filePath = filePaths[i];

            // Send progress update
            const progress = Math.round(((i + 1) / filePaths.length) * 100);
            event.sender.send('merge-progress', { progress, current: i + 1, total: filePaths.length });

            try {
                // Read the PDF file
                const pdfBytes = await fs.readFile(filePath);

                // Load the PDF
                const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

                // Copy all pages from this PDF
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            } catch (error) {
                throw new Error(`Failed to process ${path.basename(filePath)}: ${error.message}`);
            }
        }

        // Save the merged PDF
        const mergedPdfBytes = await mergedPdf.save();
        const outputFilePath = path.join(outputPath, `${fileName}.pdf`);
        await fs.writeFile(outputFilePath, mergedPdfBytes);

        // Send completion event
        event.sender.send('merge-complete', { outputPath: outputFilePath });

        return { success: true, outputPath: outputFilePath };
    } catch (error) {
        // Send error event
        event.sender.send('merge-error', { message: error.message });
        throw error;
    }
});
