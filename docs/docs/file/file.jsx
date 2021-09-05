import React from 'react'

if (global.window) {
    import('@oui-ui/file')
}

function File() {
    return (
        <div>
            <oui-file>
                <button slot="file-selector-button">Upload</button>
                <p slot="label">Upload a file</p>
            </oui-file>
        </div>
    )
}

export default File
