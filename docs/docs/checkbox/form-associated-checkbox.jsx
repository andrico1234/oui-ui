import React, { useState } from 'react'

if (global.window) {
    import('@oui-ui/checkbox')
}

function Checkbox() {
    const [submittedState, setSubmittedState] = useState({})
    const [disabled, setDisabled] = useState(false)

    return (
        <div>
            <form
                id="checkbox-form"
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
                <oui-checkbox
                    name="inside-form"
                    value="enabled"
                    required
                    disabled={disabled || undefined}
                >
                    <p slot="label">Inside form</p>
                </oui-checkbox>

                <button
                    style={{ marginRight: '8px' }}
                    onClick={() => setDisabled(!disabled)}
                    type="button"
                >
                    Toggle disabled
                </button>
                <button type="submit">Submit</button>
            </form>
            <oui-checkbox
                name="outside-form"
                form="checkbox-form"
                value="enabled"
            >
                <p slot="label">Outside form</p>
            </oui-checkbox>
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

export default Checkbox
