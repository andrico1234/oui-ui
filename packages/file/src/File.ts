import { IElementInternals } from 'element-internals-polyfill'
import {
    FileSystemHandle,
    ShowOpenFilePickerOptions,
} from '../typings/file-system-access'

// Ponyfill https://github.com/GoogleChromeLabs/browser-fs-access

const fileInputTemplate = document.createElement('template')

// const eventDetails: EventInit = {
//     bubbles: true,
//     composed: true,
//     cancelable: false,
// }

// when button is clicked, file selection prompt will display
// - user can choose single or multiple files
// - label updates to show the filename
// - unless multiple;
// - then number of files are displayed

// drag and drop

// The openui-file component should appear as a button (ARIA role)

// if I need to assign attributes to a child component, how do I do that with a custom element?

// on click trigger the hidden input

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

fileInputTemplate.innerHTML = `
    <style>

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
    // _input: HTMLInputElement

    handles?: FileSystemHandle[]

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
        console.log(val)

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

        console.log(this.shadowRoot)
    }

    connectedCallback() {
        if (this.hasAttribute('autofocus')) {
            this.focus()
        }

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

    async _click() {
        const options: ShowOpenFilePickerOptions = {
            multiple: this.multiple,
        }

        this.handles = await window.showOpenFilePicker(options)
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
