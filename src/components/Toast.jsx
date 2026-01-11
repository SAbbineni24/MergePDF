import React from 'react';

function Toast({ type, message, onClose }) {
    const bgColor = type === 'success' ? 'bg-macos-success' : 'bg-macos-error';

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
            <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg max-w-md flex items-start gap-3`}>
                {/* Icon */}
                <div className="flex-shrink-0">
                    {type === 'success' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>

                {/* Message */}
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-white hover:opacity-75 smooth-transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Toast;
