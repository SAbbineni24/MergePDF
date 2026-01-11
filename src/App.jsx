import React, { useState, useEffect } from 'react';
import DropZone from './components/DropZone';
import PDFList from './components/PDFList';
import MergeButton from './components/MergeButton';
import ProgressIndicator from './components/ProgressIndicator';
import Toast from './components/Toast';

function App() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [outputLocation, setOutputLocation] = useState(null);
    const [fileName, setFileName] = useState('merged');
    const [isMerging, setIsMerging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        // Set up IPC listeners
        window.electronAPI.onMergeProgress((data) => {
            setProgress(data.progress);
        });

        window.electronAPI.onMergeComplete((data) => {
            setIsMerging(false);
            setProgress(0);
            showToast('success', `PDF merged successfully! Saved to ${data.outputPath}`);
            // Reset state
            setPdfFiles([]);
            setFileName('merged');
        });

        window.electronAPI.onMergeError((data) => {
            setIsMerging(false);
            setProgress(0);
            showToast('error', `Merge failed: ${data.message}`);
        });
    }, []);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 5000);
    };

    const handleFilesAdded = async (files) => {
        // Validate PDF files
        const validFiles = files.filter(file =>
            file.name.toLowerCase().endsWith('.pdf')
        );

        if (validFiles.length !== files.length) {
            showToast('error', 'Some files were not PDFs and were ignored');
        }

        // Add files that don't already exist in the list
        const newFiles = validFiles.filter(file =>
            !pdfFiles.some(existing => existing.path === file.path)
        );

        setPdfFiles([...pdfFiles, ...newFiles]);
    };

    const handleBrowseFiles = async () => {
        const files = await window.electronAPI.selectFiles();
        if (files.length > 0) {
            handleFilesAdded(files);
        }
    };

    const handleFileRemove = (index) => {
        setPdfFiles(pdfFiles.filter((_, i) => i !== index));
    };

    const handleReorder = (fromIndex, toIndex) => {
        const newFiles = [...pdfFiles];
        const [removed] = newFiles.splice(fromIndex, 1);
        newFiles.splice(toIndex, 0, removed);
        setPdfFiles(newFiles);
    };

    const handleLocationSelect = async () => {
        const location = await window.electronAPI.selectOutputLocation();
        if (location) {
            setOutputLocation(location);
        }
    };

    const handleMerge = async () => {
        if (pdfFiles.length < 2) {
            showToast('error', 'Please select at least 2 PDF files to merge');
            return;
        }

        if (!fileName.trim()) {
            showToast('error', 'Please enter a filename');
            return;
        }

        let outputPath = outputLocation;
        if (!outputPath) {
            // Default to Downloads folder
            outputPath = await window.electronAPI.selectOutputLocation();
            if (!outputPath) {
                showToast('error', 'Please select an output location');
                return;
            }
            setOutputLocation(outputPath);
        }

        setIsMerging(true);
        setProgress(0);

        try {
            const filePaths = pdfFiles.map(file => file.path);
            await window.electronAPI.mergePDFs(filePaths, outputPath, fileName);
        } catch (error) {
            setIsMerging(false);
            setProgress(0);
            showToast('error', `Merge failed: ${error.message}`);
        }
    };

    const formatPath = (path) => {
        if (!path) return 'Not selected';
        const parts = path.split('/');
        return parts.slice(-2).join('/');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Draggable Title Bar */}
            <div className="draggable-region h-12" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full px-8 pb-8">
                {/* Drop Zone */}
                <DropZone onFilesAdded={handleFilesAdded} onBrowse={handleBrowseFiles} />

                {/* PDF List */}
                {pdfFiles.length > 0 && (
                    <PDFList
                        files={pdfFiles}
                        onRemove={handleFileRemove}
                        onReorder={handleReorder}
                    />
                )}

                {/* Controls */}
                {pdfFiles.length > 0 && (
                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-macos-text mb-2">
                                Output Filename
                            </label>
                            <input
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="input-field"
                                placeholder="Enter filename (without .pdf)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-macos-text mb-2">
                                Output Location
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formatPath(outputLocation)}
                                    readOnly
                                    className="input-field flex-1 bg-gray-50"
                                    placeholder="Select output location"
                                />
                                <button onClick={handleLocationSelect} className="btn-secondary">
                                    Browse
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Merge Button */}
                {pdfFiles.length > 0 && (
                    <MergeButton
                        onClick={handleMerge}
                        disabled={isMerging || pdfFiles.length < 2 || !fileName.trim()}
                        isLoading={isMerging}
                    />
                )}

                {/* Progress Indicator */}
                {isMerging && <ProgressIndicator progress={progress} />}
            </div>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default App;
