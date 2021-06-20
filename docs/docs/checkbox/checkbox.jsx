import React, { useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)

    return (
        <div>
            <oui-checkbox disabled={disabled} indeterminate={indeterminate}>
                <div slot="checked-indicator" className="indicator-wrapper">
                    <div className="indicator"></div>
                </div>
                <div
                    slot="indeterminate-indicator"
                    className="indeterminate-indicator-wrapper"
                >
                    <div className="indeterminate-indicator"></div>
                </div>
                <p slot="label">Hey there</p>
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
