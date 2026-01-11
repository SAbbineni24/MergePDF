import React from 'react';

function PDFListItem({
    file,
    index,
    formatFileSize,
    onRemove,
    onDragStart,
    onDragOver,
    onDragEnd,
    isDragging
}) {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            className={`flex items-center gap-3 p-4 bg-white rounded-lg border border-macos-border hover:border-macos-blue smooth-transition cursor-move ${isDragging ? 'opacity-50' : ''
                }`}
        >
            {/* Drag Handle */}
            <div className="text-macos-text-secondary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                </svg>
            </div>

            {/* File Icon */}
            <div className="flex-shrink-0">
                <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-macos-text truncate">{file.name}</p>
                <p className="text-xs text-macos-text-secondary">{formatFileSize(file.size)}</p>
            </div>

            {/* Order Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-macos-blue text-white flex items-center justify-center text-sm font-medium">
                {index + 1}
            </div>

            {/* Remove Button */}
            <button
                onClick={onRemove}
                className="flex-shrink-0 text-macos-text-secondary hover:text-macos-error smooth-transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default PDFListItem;
