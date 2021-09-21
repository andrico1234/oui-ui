import { IElementInternals } from 'element-internals-polyfill'
const fileInputTemplate = document.createElement('template')

// TODO:
// drag and drop
// manage required attribute, since it's associated with forms
// clicking label open picker

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

interface FileParams {
    accept: string | null
    capture: string | null
    multiple: boolean
}

fileInputTemplate.innerHTML = `
    <style>
        :host([disabled]) {
            cursor: default;
            opacity: 0.5;
        }
    </style>

    <div part="file-selector-button">
        <slot name="file-selector-button"></slot>
    </div>

    <label part="label">
        <slot name="label"></slot>
    </label>

    <p aria-live="polite" role="status"></p>
`

// Note: disabled, readonly, form, and name are managed by browser as it's a FACE

/**
 * @csspart file-selector-button - An outer wrapper around the button
 * @csspart label - An outer wrapper around the label
 *
 * @slot file-selector-button - Creates the indicator, and can be styles based on the checkbox's current state
 * @slot label - Creates the label and associates it to the control
 *
 * @event change - Fires when the input's value is commited by the user
 * @event input - Fires when the input's value changes
 */
export class File extends HTMLElement {
    _internals: IElementInternals
    handles?: FileList | null
    isFSAccessSupported: boolean

    static get formAssociated() {
        return true
    }

    static get observedAttributes() {
        return []
    }

    get multiple() {
        return this.hasAttribute('multiple')
    }

    set multiple(val) {
        if (val) {
            this.setAttribute('multiple', '')
        } else {
            this.removeAttribute('multiple')
        }
    }

    get accept() {
        return this.getAttribute('multiple')
    }

    set accept(val) {
        if (val) {
            this.setAttribute('accept', val)
        } else {
            this.removeAttribute('accept')
        }
    }

    get capture() {
        return this.getAttribute('capture')
    }

    set capture(val) {
        // How should we manage an invalid value?
        // do nothing
        // log a warning to the console
        // throw an error?
        if (val) {
            this.setAttribute('capture', val)
        } else {
            this.removeAttribute('capture')
        }
    }

    get files() {
        return this.getAttribute('files')
    }

    set files(val) {
        if (val) {
            this.setAttribute('files', val)
        } else {
            this.removeAttribute('files')
        }
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
        this.addEventListener('keydown', this._keyDown)

        this.isFSAccessSupported = 'showOpenFilePicker' in self
    }

    connectedCallback() {
        if (this.hasAttribute('autofocus')) {
            this.focus()
        }

        this._hasButtonRole()

        this._upgradeProperty('multiple')
        this._upgradeProperty('disabled')
        this._upgradeProperty('value')
    }

    // attributeChangedCallback(name: string, _oldVal: string, newVal: string) {}

    _keyDown(e: KeyboardEvent) {
        if (e.code === 'Enter') {
            this._click()
        }
    }

    _hasButtonRole() {
        const node = this.querySelector('[slot="file-selector-button"]')!

        const role = node.getAttribute('role')

        if (node.tagName.toLowerCase() !== 'button' && role !== 'button') {
            console.warn(
                'Please ensure that the element provided in the `file-selector-button` slot is a <button> element'
            )
        }
    }

    async _showOpenFilePicker(options: FileParams): Promise<FileList | null> {
        return new Promise((res) => {
            // can I add an element to the shadow DOM?
            const { multiple, capture, accept } = options
            const tempFileInput = document.createElement('input')
            tempFileInput.setAttribute('type', 'file')
            this.shadowRoot?.appendChild(tempFileInput)

            if (multiple) {
                tempFileInput.setAttribute('multiple', `${multiple}`)
            }

            if (capture) {
                tempFileInput.setAttribute('capture', `${capture}`)
            }

            if (accept) {
                tempFileInput.setAttribute('accept', `${accept}`)
            }

            if (this.files) {
                tempFileInput.setAttribute('files', `${this.files}`)
            }

            tempFileInput.addEventListener('change', (e) => {
                const inputEvent = new Event('input', e)
                this.dispatchEvent(inputEvent)

                const changeEvent = new Event('change', e)
                this.dispatchEvent(changeEvent)

                return res(tempFileInput.files)
            })

            tempFileInput.click()

            this.shadowRoot?.removeChild(tempFileInput)
        })
    }

    async _click() {
        const options: FileParams = {
            multiple: this.multiple,
            accept: this.accept,
            capture: this.capture,
        }

        // https://wicg.github.io/file-system-access/#api-filesystemhandle
        this.handles = await this._showOpenFilePicker(options)
        const status = this.shadowRoot?.querySelector('[role=status]')

        if (!this.handles) {
            const textNode = document.createTextNode('')
            return status?.appendChild(textNode)
        }

        if (this.handles.length === 1) {
            const fileName = this.handles[0].name
            const textNode = document.createTextNode(fileName)
            return status?.appendChild(textNode)
        }

        const fileCount = this.handles.length
        const textNode = document.createTextNode(`${fileCount} files selected`)
        return status?.appendChild(textNode)
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
