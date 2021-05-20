const checkboxTemplate = document.createElement('template');
checkboxTemplate.innerHTML = `
    <style>
      :host {
       height: 24px;
       width: 24px;
      }
    </style>
    <h1>Hey there</h1>
  `;

export class Checkbox extends HTMLElement {
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    // Reflect the value of `disabled` as an attribute.
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  constructor() {
    super();

    console.log('hiiio');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(checkboxTemplate.content.cloneNode(true));
  }

  click() {
    // Don't toggle the drawer if it's disabled.
    if (this.disabled) {
      return;
    }

    console.log('clicky');
  }

  connectedCallback() {
    console.log('the component has loaded fam');

    this.addEventListener('click', this.click);
  }

  disconnectedCallback() {
    console.log('the component has been destroyed fam');

    this.removeEventListener('click', this.click);
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    console.log('heya', name);
    console.log(oldVal, newVal);
  }
}

console.log('boo');

window.customElements.define('ou-checkbox', Checkbox);
