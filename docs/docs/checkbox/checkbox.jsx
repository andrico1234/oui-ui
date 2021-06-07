import React, { useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)

    return (
        <div>
            <oui-checkbox disabled={disabled}>
                <div slot="indicator" className="indicator" />
                <p slot="label">Hey there</p>
            </oui-checkbox>
            <button
                onClick={() => {
                    setDisabledState(!disabled)
                }}
            >
                Disable
            </button>
        </div>
    )
}

export default Checkbox
