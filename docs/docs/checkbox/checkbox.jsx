import React, { useLayoutEffect, useRef, useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [disabled, setDisabledState] = useState(false)
    const ref = useRef(null)

    useLayoutEffect(() => {
        ref.current.addEventListener('change', (e) => {
            console.log(e)
        })
    })

    return (
        <div>
            <oui-checkbox ref={ref} autofocus disabled={disabled || undefined}>
                <p slot="label">OUI Checkbox Label</p>
                <div slot="indicator" className="indicator" />
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
