import React, { useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)

    return (
        <div>
            <oui-checkbox
                autofocus
                disabled={disabled}
                indeterminate={indeterminate}
            >
                <div slot="control">
                    <div slot="indicator"></div>
                </div>
                <p className="label" slot="label">
                    Hey there
                </p>
            </oui-checkbox>

            <button
                onClick={() => {
                    setDisabledState(!disabled)
                }}
            >
                Disable
            </button>
            <button
                onClick={() => {
                    setIndeterminate(!indeterminate)
                }}
            >
                Indeterminate
            </button>
        </div>
    )
}

export default Checkbox
