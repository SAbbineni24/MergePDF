import React from 'react';

function ProgressIndicator({ progress }) {
    return (
        <div className="card p-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-macos-text">Merging PDFs...</span>
                        <span className="text-sm font-medium text-macos-blue">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-macos-blue h-full rounded-full smooth-transition"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressIndicator;
