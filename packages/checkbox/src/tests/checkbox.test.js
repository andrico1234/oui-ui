import { html, fixture, expect } from '@open-wc/testing'

import '../../lib/index'

describe('<oui-checkbox>', () => {
    it('passes a11y test', async () => {
        const el = await fixture(html`
            <oui-checkbox>
                <div slot="indicator"></div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        await expect(el).to.be.accessible()
    })

    it('renders unchecked by default', async () => {
        const el = await fixture(html`
            <oui-checkbox>
                <div slot="control">
                    <div data-testid="checkbox" slot="indicator"></div>
                </div>
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
                <div slot="control">
                    <div slot="indicator"></div>
                </div>
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

    it('should not check box when disabled by default', async () => {
        const el = await fixture(html`
            <oui-checkbox disabled>
                <div slot="control">
                    <div slot="indicator"></div>
                </div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        expect(el.getAttribute('checked')).to.be.equal(null)
        expect(el.getAttribute('disabled')).to.be.equal('')

        const event = new Event('mouseup')
        el.dispatchEvent(event)

        expect(el.getAttribute('checked')).to.be.equal(null)
        expect(el.getAttribute('aria-checked')).to.be.equal('false')
    })

    it('should display the correct element when in indeterminate state', async () => {
        const el = await fixture(html`
            <oui-checkbox>
                <div slot="control">
                    <div data-testid="checkbox" slot="indicator"></div>
                </div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        expect(el.getAttribute('indeterminate')).to.be.equal(null)
        expect(el.getAttribute('aria-checked')).to.be.equal('false')

        el.indeterminate = true

        expect(el.getAttribute('indeterminate')).to.be.equal('true')
        expect(el.getAttribute('aria-checked')).to.be.equal('mixed')

        const event = new Event('mouseup')
        el.dispatchEvent(event)

        expect(el.getAttribute('indeterminate')).to.be.equal('false')
        expect(el.getAttribute('checked')).to.be.equal('')
        expect(el.getAttribute('aria-checked')).to.be.equal('true')
    })

    it('should set the checked value to true if defaultChecked is true', async () => {
        const el = await fixture(html`
            <oui-checkbox defaultChecked>
                <div slot="control">
                    <div data-testid="checkbox" slot="indicator"></div>
                </div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        expect(el.getAttribute('aria-checked')).to.be.equal('true')
        expect(el.getAttribute('checked')).to.be.equal('true')
    })

    it('should set the checked value to false if defaultChecked is true and checked is false', async () => {
        const el = await fixture(html`
            <oui-checkbox defaultChecked checked="false">
                <div slot="control">
                    <div data-testid="checkbox" slot="indicator"></div>
                </div>
                <p slot="label">Checkbox label</p>
            </oui-checkbox>
        `)

        expect(el.getAttribute('aria-checked')).to.be.equal('false')
        expect(el.getAttribute('checked')).to.be.equal('false')
    })
})
