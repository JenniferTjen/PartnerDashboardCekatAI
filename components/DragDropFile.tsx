import React, { useState, useRef } from 'react';
import IconDownload from './Icon/IconDownload';

function DragDropFile(props: any) {
    const { handleSelectFile } = props;
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef<HTMLInputElement>(null);

    // handle drag events
    const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files) {
            const filesArray = Array.from(e.target.files);
            handleSelectFile(filesArray);
        }
    };

    // triggers when a file is selected with a click
    const handleChange = function (e: any) {
        e.preventDefault();

        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            handleSelectFile(filesArray);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef?.current?.click();
    };

    return (
        <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
            className="relative h-48 w-full max-w-full text-center"
        >
            <input ref={inputRef} type="file" name="files" id="input-file-upload" accept=".pdf" multiple={true} onChange={handleChange} className="hidden" />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={`flex h-full items-center justify-center rounded-lg border-2 border-dashed ${dragActive ? 'bg-gray-300' : 'bg-white'}`}
            >
                <div>
                    <button className="upload-button font-oswald cursor-pointer border-none bg-transparent px-2 py-1  hover:underline" onClick={onButtonClick}>
                        Drag & drop your files here or click to select files
                    </button>
                    <p className="text-gray-400">Supported File Type: .pdf</p>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
    );
}

export default DragDropFile;
