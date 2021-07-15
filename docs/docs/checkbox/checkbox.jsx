import React, { useRef, useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)
    const ref = useRef(null)

    return (
        <form>
            <oui-checkbox ref={ref} autofocus disabled={disabled}>
                <div slot></div>
                <p slot="label">OUI Checkbox Label</p>
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
        </form>
    )
}

export default Checkbox
