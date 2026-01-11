const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    selectFiles: () => ipcRenderer.invoke('select-files'),

    selectOutputLocation: () => ipcRenderer.invoke('select-output-location'),

    mergePDFs: (filePaths, outputPath, fileName) =>
        ipcRenderer.invoke('merge-pdfs', { filePaths, outputPath, fileName }),

    onMergeProgress: (callback) => {
        ipcRenderer.on('merge-progress', (event, data) => callback(data));
    },

    onMergeComplete: (callback) => {
        ipcRenderer.on('merge-complete', (event, data) => callback(data));
    },

    onMergeError: (callback) => {
        ipcRenderer.on('merge-error', (event, data) => callback(data));
    },
});
