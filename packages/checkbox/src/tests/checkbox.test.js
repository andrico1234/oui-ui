import { html, fixture, expect } from '@open-wc/testing'
import 'element-internals-polyfill'
import '../../lib/index'

describe('<oui-checkbox>', () => {
    it('passes a11y test', async () => {
        const el = await fixture(html`
            <oui-checkbox>
                <div slot></div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        await expect(el).to.be.accessible()
    })

    describe('checked property', () => {
        it('renders unchecked by default', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('disabled')).to.be.equal(null)
            expect(el.getAttribute('aria-checked')).to.be.equal('false')
        })

        it('should check box on click', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('disabled')).to.be.equal(null)

            const event = new Event('mouseup')
            el.dispatchEvent(event)

            expect(el.getAttribute('checked')).to.be.equal('')
            expect(el.getAttribute('aria-checked')).to.be.equal('true')

            el.dispatchEvent(event)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('disabled')).to.be.equal(null)
        })
    })

    describe('disabled property', () => {
        it('should not check box when disabled by default', async () => {
            const el = await fixture(html`
                <oui-checkbox disabled>
                    <div slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.disabled).to.be.equal(true)

            const event = new Event('mouseup')
            el.dispatchEvent(event)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('aria-checked')).to.be.equal('false')
        })

        it('should not check box when disabled programmatically', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('disabled')).to.be.equal(null)
            expect(el.disabled).to.be.equal(false)
            expect(el.getAttribute('aria-checked')).to.be.equal('false')

            const event = new Event('mouseup')
            el.dispatchEvent(event)

            expect(el.getAttribute('checked')).to.be.equal('')

            el.disabled = true
            el.dispatchEvent(event)

            expect(el.getAttribute('disabled')).to.be.equal('')
            expect(el.getAttribute('checked')).to.be.equal('')
            expect(el.getAttribute('aria-checked')).to.be.equal('true')

            el.disabled = false
            el.dispatchEvent(event)

            expect(el.getAttribute('disabled')).to.be.equal(null)
            expect(el.disabled).to.be.equal(false)
            expect(el.getAttribute('checked')).to.be.equal(null)
            expect(el.getAttribute('aria-checked')).to.be.equal('false')
        })
    })

    describe('indeterminate attribute', () => {
        it('should display the correct element when in indeterminate state', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('indeterminate')).to.be.equal(null)
            expect(el.getAttribute('aria-checked')).to.be.equal('false')

            el.indeterminate = true

            expect(el.getAttribute('indeterminate')).to.be.equal('true')
            expect(el.getAttribute('aria-checked')).to.be.equal('mixed')
            expect(el.indeterminate).to.be.equal(true)

            const event = new KeyboardEvent('keydown', { code: 'Enter' })
            el.dispatchEvent(event)

            expect(el.getAttribute('indeterminate')).to.be.equal('false')
            expect(el.indeterminate).to.be.equal(false)
            expect(el.getAttribute('checked')).to.be.equal('')
            expect(el.getAttribute('aria-checked')).to.be.equal('true')
        })
    })

    describe('defaultChecked property', () => {
        it('should set the checked value to true if defaultChecked is true', async () => {
            const el = await fixture(html`
                <oui-checkbox defaultChecked>
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('aria-checked')).to.be.equal('true')
            expect(el.getAttribute('checked')).to.be.equal('true')
        })
    })

    it('should set checked to false if defaultChecked is true and checked is false', async () => {
        const el = await fixture(html`
            <oui-checkbox defaultChecked checked="false">
                <div data-testid="checkbox" slot></div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        expect(el.getAttribute('aria-checked')).to.be.equal('false')
        expect(el.getAttribute('checked')).to.be.equal('false')
    })

    describe('value property', () => {
        it('should set the value to on if none is provided', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('value')).to.be.equal('on')
        })

        it('should set the value to the correct value', async () => {
            const el = await fixture(html`
                <oui-checkbox value="oui-ui">
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('value')).to.be.equal('oui-ui')

            el.value = 'ui-oui'

            expect(el.value).to.be.equal('ui-oui')
            expect(el.getAttribute('value')).to.be.equal('ui-oui')

            el.value = null

            expect(el.value).to.be.equal(null)
            expect(el.getAttribute('value')).to.be.equal(null)
        })
    })

    describe('tabindex', () => {
        it('should add default tabindex if the client does not set one', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('tabindex')).to.be.equal('0')
        })

        it("should not override client's tabindex", async () => {
            const el = await fixture(html`
                <oui-checkbox tabindex="-1">
                    <div data-testid="checkbox" slot></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('tabindex')).to.be.equal('-1')
        })
    })

    describe('autofocus', () => {
        it('should not autofocus the checkbox if the property is set', async () => {
            const el = await fixture(html`
                <div>
                    <button>focusable</button>
                    <oui-checkbox>
                        <div data-testid="checkbox" slot></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                </div>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')

            expect(document.activeElement).not.to.be.equal(checkboxEl)
        })

        it('should autofocus the checkbox if the property is set', async () => {
            const el = await fixture(html`
                <div>
                    <button>focusable</button>
                    <oui-checkbox autofocus>
                        <div data-testid="checkbox" slot></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                </div>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')

            expect(document.activeElement).to.be.equal(checkboxEl)
        })
    })

    describe('validation', () => {
        it('should not submit the form if checkbox is required and checked', () => {
            //
        })

        it('should submit the form if checkbox is required and checked', () => {
            //
        })

        it('should ignore validation if the checkbox is disabled', () => {
            //
        })
    })
})
