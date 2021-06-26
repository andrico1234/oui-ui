import React, { useRef, useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)
    const ref = useRef(null)

    return (
        <div>
            <oui-checkbox ref={ref} autofocus disabled={disabled}>
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
                    ref.current.indeterminate = true
                }}
            >
                Make Indeterminate
            </button>
        </div>
    )
}

export default Checkbox
