import { html, fixture, expect } from '@open-wc/testing'
import sinon from 'sinon'
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

    afterEach(() => {
        sinon.restore()
    })

    describe('checked property', () => {
        it('renders unchecked by default', async () => {
            const el = await fixture(html`
                <oui-checkbox>
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
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
                <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('value')).to.be.equal('on')
        })

        it('should set the value to the correct value', async () => {
            const el = await fixture(html`
                <oui-checkbox value="oui-ui">
                    <div slot="indicator"></div>
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
                    <div slot="indicator"></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            expect(el.getAttribute('tabindex')).to.be.equal('0')
        })

        it("should not override client's tabindex", async () => {
            const el = await fixture(html`
                <oui-checkbox tabindex="-1">
                    <div slot="indicator"></div>
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
                        <div slot="indicator"></div>
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
                        <div slot="indicator"></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                </div>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')

            expect(document.activeElement).to.be.equal(checkboxEl)
        })
    })

    describe('validation', () => {
        it('should not submit the form if checkbox is required and not checked', async () => {
            const fake = sinon.fake()
            const onSubmitMock = (e) => {
                e.preventDefault()
                fake()
            }

            const el = await fixture(html`
                <form @submit=${onSubmitMock}>
                    <oui-checkbox required>
                        <div slot="indicator"></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                    <button>Click</button>
                </form>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')

            const buttonEl = el.querySelector('button')

            buttonEl.click()

            expect(checkboxEl.getAttribute('aria-invalid')).to.be.equal('true')
            expect(fake.callCount).to.be.equal(0)
        })

        it('should submit the form if checkbox is required and checked', async () => {
            const fake = sinon.fake()
            const onSubmitMock = (e) => {
                e.preventDefault()
                fake()
            }

            const el = await fixture(html`
                <form @submit=${onSubmitMock}>
                    <oui-checkbox>
                        <div slot="indicator"></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                    <button type="submit">Click</button>
                </form>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')
            const buttonEl = el.querySelector('button')

            expect(fake.callCount).to.be.equal(0)

            const event = new Event('mouseup')
            checkboxEl.dispatchEvent(event)

            buttonEl.click()

            expect(checkboxEl.getAttribute('aria-checked')).to.be.equal('true')
            expect(checkboxEl.getAttribute('aria-invalid')).to.be.equal('false')
            expect(fake.callCount).to.be.equal(1)
        })

        it('should submit the form if checkbox is not required and not checked', async () => {
            const fake = sinon.fake()
            const onSubmitMock = (e) => {
                e.preventDefault()
                fake()
            }

            const el = await fixture(html`
                <form @submit=${onSubmitMock}>
                    <oui-checkbox>
                        <div slot="indicator"></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                </form>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')

            const event = new Event('submit', { cancelable: true })
            el.dispatchEvent(event)

            expect(checkboxEl.getAttribute('aria-invalid')).to.be.equal('false')
            expect(fake.callCount).to.be.equal(1)
        })

        it('should ignore validation if the checkbox is disabled', async () => {
            const fake = sinon.fake()
            const onSubmitMock = (e) => {
                e.preventDefault()
                fake()
            }

            const el = await fixture(html`
                <form @submit=${onSubmitMock}>
                    <oui-checkbox required disabled>
                        <div slot="indicator"></div>
                        <p slot="label">Checkbox label</p>
                    </oui-checkbox>
                    <button>Click</button>
                </form>
            `)

            const checkboxEl = el.querySelector('oui-checkbox')
            const buttonEl = el.querySelector('button')
            checkboxEl.removeAttribute('disabled')
            checkboxEl.setAttribute('disabled', '')

            buttonEl.click()

            expect(checkboxEl.getAttribute('disabled')).to.be.equal('')
            // expect(checkboxEl.getAttribute('aria-invalid')).to.be.equal('false')
            expect(fake.callCount).to.be.equal(1)
        })
    })

    describe('events', () => {
        it('should correctly fire the change event on check', async () => {
            const onChangeMock = sinon.fake()

            const el = await fixture(html`
                <oui-checkbox @change=${onChangeMock}>
                    <div slot="indicator"></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            const event = new Event('mouseup')
            el.dispatchEvent(event)

            expect(onChangeMock.callCount).to.be.equal(1)
        })

        it('should correctly fire the input event on check', async () => {
            const onInputMock = sinon.fake()

            const el = await fixture(html`
                <oui-checkbox @input=${onInputMock}>
                    <div slot="indicator"></div>
                    <p slot="label">Checkbox label</p>
                </oui-checkbox>
            `)

            const event = new Event('mouseup')
            el.dispatchEvent(event)

            expect(onInputMock.callCount).to.be.equal(1)
        })
    })
})
