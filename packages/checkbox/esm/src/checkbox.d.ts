export declare class Checkbox extends HTMLElement {
    static get observedAttributes(): string[]
    get disabled(): boolean
    set disabled(val: boolean)
    get checked(): boolean
    set checked(val: boolean)
    get indeterminate(): boolean
    set indeterminate(val: boolean)
    constructor()
    click(): void
    connectedCallback(): void
    disconnectedCallback(): void
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void
}
//# sourceMappingURL=checkbox.d.ts.map
