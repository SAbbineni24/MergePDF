import React, { useState } from 'react';

function DropZone({ onFilesAdded, onBrowse }) {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = Array.from(e.dataTransfer.files).map(file => ({
            path: file.path,
            name: file.name,
            size: file.size,
        }));

        onFilesAdded(files);
    };

    return (
        <div
            className={`card p-12 border-2 border-dashed cursor-pointer smooth-transition ${isDragActive ? 'drag-active' : 'hover:border-macos-blue hover:bg-gray-50'
                }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={onBrowse}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <svg
                    className={`w-16 h-16 ${isDragActive ? 'text-macos-blue' : 'text-macos-text-secondary'} smooth-transition`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <div>
                    <p className="text-lg font-medium text-macos-text mb-1">
                        {isDragActive ? 'Drop PDFs here' : 'Drag & drop PDF files here'}
                    </p>
                    <p className="text-sm text-macos-text-secondary">or click to browse</p>
                </div>
            </div>
        </div>
    );
}

export default DropZone;
