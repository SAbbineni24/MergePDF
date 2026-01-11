import React, { useState } from 'react';
import PDFListItem from './PDFListItem';

function PDFList({ files, onRemove, onReorder }) {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === index) return;

        onReorder(draggedIndex, index);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="card p-6">
            <h2 className="text-lg font-semibold text-macos-text mb-4">
                Selected PDFs ({files.length})
            </h2>
            <div className="space-y-2">
                {files.map((file, index) => (
                    <PDFListItem
                        key={`${file.path}-${index}`}
                        file={file}
                        index={index}
                        formatFileSize={formatFileSize}
                        onRemove={() => onRemove(index)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedIndex === index}
                    />
                ))}
            </div>
        </div>
    );
}

export default PDFList;
