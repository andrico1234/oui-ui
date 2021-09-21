import React, { useState } from 'react'

if (global.window) {
    import('@oui-ui/file')
}

function File() {
    const [submittedState, setSubmittedState] = useState({})
    const [disabled, setDisabled] = useState(false)

    return (
        <div>
            <form
                id="file-form"
                onSubmit={(e) => {
                    e.preventDefault()

                    const data = new FormData(e.target)

                    const vals = {}

                    for (let [key, val] of data.entries()) {
                        vals[key] = val
                    }

                    setSubmittedState(vals)
                }}
            >
                <oui-file disabled={disabled || undefined}>
                    <button slot="file-selector-button">Upload</button>
                    <p slot="label">Upload a file</p>
                </oui-file>

                <button
                    style={{ marginRight: '8px' }}
                    onClick={() => setDisabled(!disabled)}
                    type="button"
                >
                    Toggle disabled
                </button>
                <button type="submit">Submit</button>
            </form>
            <h3>Submitted values</h3>
            <div>
                {Object.entries(submittedState).map(([key, value]) => {
                    return (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default File
