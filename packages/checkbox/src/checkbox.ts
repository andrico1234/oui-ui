const checkboxTemplate = document.createElement('template')

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

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
        
        :host([disabled=true]) #indicator {
            opacity: 0.5;
        }

        :host([disabled=false]) slot[name="label"]::slotted(*) {
            cursor: pointer;
        }

        :host([aria-checked=false]) slot[name="checked-indicator"] {
            display: none;
        }

        :host([indeterminate=false]) slot[name="indeterminate-indicator"] {
            display: none;
        }

        #indicator {
            border: 1px solid red;
            border-radius: 2px;
            height: 24px;
            width: 24px;
            margin-right: 8px;
            position: relative;
        }

        #indicator > div {
            width: 100%;
            height: 100%;
        }

        #indicator > div[part="indeterminate-indicator"] {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>

    <div tabindex="0" id="indicator">
        <div part="checked-indicator">
            <slot name="checked-indicator"></slot>
        </div>
        <div part="indeterminate-indicator">
            <slot name="indeterminate-indicator"></slot>
        </div>
    </div>
    <label id="label" part="label">
        <slot name="label"></slot>
    </label>
`

export class Checkbox extends HTMLElement {
    static get observedAttributes() {
        return ['disabled', 'checked', 'intermediate']
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
        console.log(this.hasAttribute('checked'))
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
            this.setAttribute('indeterminate', '')
        } else {
            this.removeAttribute('indeterminate')
        }
    }

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot?.appendChild(checkboxTemplate.content.cloneNode(true))
        this.addEventListener('mouseup', this._click)
        this.addEventListener('keydown', this._keyDown)
    }

    connectedCallback() {
        this.setAttribute('role', 'checkbox')
        this.setAttribute('aria-checked', 'false')
        this._upgradeProperty('checked')
        this._upgradeProperty('disabled')
    }

    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        const hasVal = newVal !== null

        switch (name) {
            case 'checked':
                this.setAttribute('aria-checked', `${hasVal}`)
                break
            case 'indeterminate':
                this.setAttribute('aria-checked', hasVal ? 'mixed' : 'false')
                break
            default:
                return
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
