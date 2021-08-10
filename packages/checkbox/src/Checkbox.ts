import { IElementInternals } from 'element-internals-polyfill'

const checkboxTemplate = document.createElement('template')

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

// required	bool	false	Indicates that the checkbox is invalid unless checked.
// readonly	bool	readonly	Indicates that the checkbox is not interactive but its value should still be submitted with the form.

// change to :disabled on PR fix
checkboxTemplate.innerHTML = `
    <style>
        :host {
            display: flex;
            contain: content;
            cursor: pointer;
            width: fit-content;
        }
        :host([disabled]) {
            cursor: default;
            opacity: 0.5;
        }

        :host(:not([disabled])) slot[name="label"]::slotted(*) {
            cursor: pointer;
        }
    </style>

    <label part="label">
        <slot name="label"></slot>
    </label>

    <div part="indicator">
        <slot name="indicator"></slot>
    </div>
`
// Note: disabled, readonly, form, and name are managed by browser as it's a FACE

/**
 * @csspart control - Sets the structure of the control
 * @csspart indicator - Displays the appropriate indicator based on the checkbox's current state
 * @csspart label - Styles the label and associates it to the control
 *
 * @slot - The default/unnamed slot to create the HTML within the
 * @slot label - Sets the structure of the element within `<label>`
 *
 */
export class Checkbox extends HTMLElement {
    _internals: IElementInternals

    static get formAssociated() {
        return true
    }

    static get observedAttributes() {
        return ['checked', 'indeterminate', 'required']
    }

    get disabled() {
        return this.hasAttribute('disabled')
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        if (this.getAttribute('checked') === 'false') return false

        return this.hasAttribute('checked')
    }

    set checked(val) {
        const isChecked = Boolean(val)

        if (isChecked) {
            this.setAttribute('checked', '')
        } else {
            this.removeAttribute('checked')
        }
    }

    get indeterminate() {
        if (this.getAttribute('indeterminate') === 'false') return false

        return this.hasAttribute('indeterminate')
    }

    set indeterminate(val) {
        const isIndeterminate = Boolean(val)

        if (isIndeterminate) {
            this.setAttribute('indeterminate', 'true')
        } else {
            this.setAttribute('indeterminate', 'false')
        }
    }

    get value() {
        return this.getAttribute('value')
    }

    set value(val) {
        if (val === null) {
            this.removeAttribute('value')
        } else {
            this.setAttribute('value', val)
        }
    }

    get form() {
        return this._internals.form
    }

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this._internals = this.attachInternals()
        this.shadowRoot?.appendChild(checkboxTemplate.content.cloneNode(true))
        this.addEventListener('mouseup', this._click)
        this.addEventListener('keydown', this._keyDown)
    }

    connectedCallback() {
        this.setAttribute('role', 'checkbox')
        this.setAttribute('aria-checked', 'false')

        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0')
        }

        if (
            this.hasAttribute('defaultChecked') &&
            !this.hasAttribute('checked')
        ) {
            this.setAttribute('aria-checked', 'true')
            this.setAttribute('checked', 'true')
        }

        if (!this.hasAttribute('value')) {
            this.setAttribute('value', 'on')
        }

        if (this.hasAttribute('autofocus')) {
            this.focus()
        }

        this._updateValidation()

        this._upgradeProperty('checked')
        this._upgradeProperty('disabled')
        this._upgradeProperty('value')
    }

    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        const hasVal = newVal !== null

        switch (name) {
            case 'checked':
                this.indeterminate = false
                this.setAttribute('aria-checked', `${hasVal}`)
                this._internals.setFormValue(this.checked ? this.value : null)
                this._updateValidation()
                break
            case 'indeterminate':
                this.setAttribute('aria-checked', hasVal ? 'mixed' : 'false')
                break
        }
    }

    _keyDown(e: KeyboardEvent) {
        if (e.code === 'Enter') {
            this._click()
        }
    }

    _click() {
        const isDisabled = this.disabled

        if (isDisabled) {
            return
        }

        this.checked = !this.checked
    }

    _updateValidation() {
        const isChecked = this.hasAttribute('checked')
        // const isDisabled = this.matches(':disabled')
        const isDisabled = this.hasAttribute('disabled')
        const isRequired = this.hasAttribute('required')

        if (!isDisabled && isRequired && !isChecked) {
            this.setAttribute('aria-invalid', 'true')
            this._internals.setValidity(
                {
                    customError: true,
                },
                'Please check this box if you want to proceed'
            )
        } else {
            this.setAttribute('aria-invalid', 'false')
            this._internals.setValidity({})
        }
    }

    _upgradeProperty(prop: string) {
        if (hasOwnProperty(this, prop)) {
            const value = this[prop]
            delete this[prop]
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this[prop] = value
        }
    }
}
