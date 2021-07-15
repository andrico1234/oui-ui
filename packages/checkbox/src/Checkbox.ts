const checkboxTemplate = document.createElement('template')

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

//
// form	string	null	Associates the element with a form in the document whose id is this value.
// required	bool	false	Indicates that the checkbox is invalid unless checked.
// readonly	bool	readonly	Indicates that the checkbox is not interactive but its value should still be submitted with the form.

// do I want to use form-associated controls, or do I want to use a hidden element?

// Refactor to ElementInternals API when browser compat increases
// https://caniuse.com/mdn-api_elementinternalsyarn add element-internals-polyfill

// use a polyfill instead, and ensure that it's documented

// polyfill here: https://github.com/calebdwilliams/element-internals-polyfill

checkboxTemplate.innerHTML = `
    <style>
        :host {
            display: flex;
            contain: content;
            cursor: pointer;
            width: fit-content;
        }
        
        :host([disabled=true]) {
            cursor: default;
        }
        
        :host([disabled=true]) {
            opacity: 0.5;
        }

        :host([disabled=false]) slot[name="label"]::slotted(*) {
            cursor: pointer;
        }
    </style>

    <div part="control">
        <div part="indicator">
            <slot></slot>
        </div>
    </div>
    
    <label id="label" part="label">
        <slot name="label"></slot>
    </label>
`

export class Checkbox extends HTMLElement {
    _internals: ElementInternals

    static get formAssociated() {
        return true
    }

    static get observedAttributes() {
        return ['checked', 'indeterminate']
    }

    get disabled() {
        if (this.getAttribute('disabled') === 'false') return false

        return this.hasAttribute('disabled')
    }

    set disabled(val) {
        const isDisabled = Boolean(val)

        if (isDisabled) {
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

    get name() {
        return this.getAttribute('name')
    }

    set name(val) {
        if (val === null) {
            this.removeAttribute('name')
        } else {
            this.setAttribute('name', val)
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

        if (!this.hasAttribute('name')) {
            this.setAttribute('name', '')
        }

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

        console.log('cliiick')

        if (isDisabled) {
            return
        }

        this.checked = !this.checked
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
