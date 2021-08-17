import { IElementInternals } from 'element-internals-polyfill'

// Ponyfill https://github.com/GoogleChromeLabs/browser-fs-access

const fileInputTemplate = document.createElement('template')

// const eventDetails: EventInit = {
//     bubbles: true,
//     composed: true,
//     cancelable: false,
// }

// drag and drop
// focusable via keyboard navigation
// integrates with forms

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

// readonly	bool	readonly	Indicates that the checkbox is not interactive but its value should still be submitted with the form.
fileInputTemplate.innerHTML = `
    <style>

    </style>

    <div part="file-selector-button">
        <slot name="file-selector-button"></slot>
    </div>

    <div part="label">
        <slot name="label"></slot>
    </div>
`
// Note: disabled, readonly, form, and name are managed by browser as it's a FACE

/**
 * @csspart file-selector-button - An outer wrapper around the indicator
 * @csspart label - An outer wrapper around the label
 *
 * @slot file-selector-button - Creates the indicator, and can be styles based on the checkbox's current state
 * @slot label - Creates the label and associates it to the control
 *
 * @event change - Fires on check
 * @event input - Fires on check
 */
export class File extends HTMLElement {
    _internals: IElementInternals

    static get formAssociated() {
        return true
    }

    static get observedAttributes() {
        return []
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
        this.shadowRoot?.appendChild(fileInputTemplate.content.cloneNode(true))
        this.addEventListener('mouseup', this._click)
    }

    connectedCallback() {
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0')
        }

        if (this.hasAttribute('autofocus')) {
            this.focus()
        }

        // this._updateValidation()

        this._upgradeProperty('checked')
        this._upgradeProperty('disabled')
        this._upgradeProperty('value')
    }

    // attributeChangedCallback(name: string, _oldVal: string, newVal: string) {}

    _keyDown(e: KeyboardEvent) {
        if (e.code === 'Enter') {
            this._click()
        }
    }

    _click() {
        console.log('hshshshs')
    }

    // _updateValidation() {}

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
