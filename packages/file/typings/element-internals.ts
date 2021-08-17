export {}

import { IElementInternals } from 'element-internals-polyfill'

declare global {
    interface HTMLElement {
        attachInternals(): IElementInternals
    }
}
