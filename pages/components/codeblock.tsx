import React, { useState } from 'react';

const CodeBlock = ({ code, label }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = () => {
        // Convert HTML entities back to characters
        const unescapedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(unescapedCode).then(
            () => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Reset the message after 2 seconds
            },
            () => {
                setCopySuccess('Failed to copy');
            }
        );
    };

    return (
        <div className="mb-5 rounded-lg">
            <label htmlFor="embedCode" className="mb-2 block text-lg font-bold ">
                {label}
            </label>
            <div className="relative flex flex-row items-center justify-between">
                <pre className="form-input whitespace-pre-wrap break-words rounded  p-3 text-xs text-gray-800  dark:text-gray-300">
                    <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
                {!copySuccess ? (
                    <button type="button" onClick={copyToClipboard} className="ml-2 text-sm text-blue-500 underline">
                        Copy
                    </button>
                ) : (
                    <span className="ml-2 text-sm text-green-500">{copySuccess}</span>
                )}
            </div>
        </div>
    );
};

export default CodeBlock;
