const checkboxTemplate = document.createElement('template')

checkboxTemplate.innerHTML = `
    <style>
      :host {
       height: 24px;
       width: 24px;
       contain: content;
      }

      :host([disabled=true]) {
        opacity: 0.5;
      }
    </style>
    <label part="label">
        <slot name="label"></slot>
    </label>
    <div part="indicator">
        <slot name="indicator"></slot>
    </div>
  `

export class Checkbox extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'disabled']
    }

    get disabled() {
        return this.hasAttribute('disabled')
    }

    set disabled(val) {
        console.log('heyyyyy', val)
        // Reflect the value of `disabled` as an attribute.
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        return this.hasAttribute('checked')
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '')
        } else {
            this.removeAttribute('checked')
        }
    }

    get indeterminate() {
        return this.hasAttribute('indeterminate')
    }

    set indeterminate(val) {
        if (val) {
            this.setAttribute('indeterminate', '')
        } else {
            this.removeAttribute('indeterminate')
        }
    }

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot?.appendChild(checkboxTemplate.content.cloneNode(true))
    }

    click() {
        // Don't toggle the drawer if it's disabled.
        if (this.disabled) {
            return
        }
    }

    connectedCallback() {
        console.log('the component has loaded fam')

        this.addEventListener('click', this.click)
    }

    disconnectedCallback() {
        console.log('the component has been destroyed fam')

        this.removeEventListener('click', this.click)
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        console.log('heya', name)
        console.log(oldVal, newVal)
    }
}

window.customElements.define('oui-checkbox', Checkbox)
