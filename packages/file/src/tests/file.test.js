import { html, fixture, expect } from '@open-wc/testing'
import sinon from 'sinon'
import 'element-internals-polyfill'
import '../../lib/index'

const wait = (amount = 0) =>
    new Promise((resolve) => setTimeout(resolve, amount))

describe('<oui-file>', () => {
    it('passes a11y test', async () => {
        const el = await fixture(html`
            <oui-file>
                <button slot="file-selector-button">Upload file</button>
                <p slot="label">Checkbox label</p>
            </oui-file>
        `)
        await expect(el).to.be.accessible()
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('File upload', () => {
        it('should correctly handle a single file upload', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    let fileString =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='
                    let file = new File([fileString], 'sample.jpg', {
                        type: 'image/png',
                    })

                    const inputEvent = new Event('input')
                    el.dispatchEvent(inputEvent)

                    const changeEvent = new Event('change')
                    el.dispatchEvent(changeEvent)

                    return res([file])
                })
            }

            sinon.replace(
                el,
                '_showOpenFilePicker',
                sinon.fake(replacedFunction)
            )

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode.innerText).to.equal('sample.jpg')
        })

        it('should correctly handle multiple file uploads', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    let fileString =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='
                    let file = new File([fileString], 'sample.jpg', {
                        type: 'image/png',
                    })
                    let file2 = new File([fileString], 'sample2.jpg', {
                        type: 'image/png',
                    })

                    const inputEvent = new Event('input')
                    el.dispatchEvent(inputEvent)

                    const changeEvent = new Event('change')
                    el.dispatchEvent(changeEvent)

                    return res([file, file2])
                })
            }

            sinon.replace(
                el,
                '_showOpenFilePicker',
                sinon.fake(replacedFunction)
            )

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode.innerText).to.equal('2 files selected')
        })

        it('should correctly handle no file uploads', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    const inputEvent = new Event('input')
                    el.dispatchEvent(inputEvent)

                    const changeEvent = new Event('change')
                    el.dispatchEvent(changeEvent)

                    return res([])
                })
            }

            sinon.replace(
                el,
                '_showOpenFilePicker',
                sinon.fake(replacedFunction)
            )

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode.innerText).to.equal('')
        })

        it('should handle key press', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    const inputEvent = new Event('input')
                    el.dispatchEvent(inputEvent)

                    const changeEvent = new Event('change')
                    el.dispatchEvent(changeEvent)

                    return res([])
                })
            }

            sinon.replace(
                el,
                '_showOpenFilePicker',
                sinon.fake(replacedFunction)
            )

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode.innerText).to.equal('')
        })
    })

    describe('disabled', () => {
        it('should not handle a file upload', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            el.setAttribute('disabled', 'true')

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode.innerText).to.equal('')
        })
    })

    describe('file attributes', () => {
        it('should be passed through as options to the filePicker function', async () => {
            const el = await fixture(html`
                <oui-file multiple>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    const inputEvent = new Event('input')
                    el.dispatchEvent(inputEvent)

                    const changeEvent = new Event('change')
                    el.dispatchEvent(changeEvent)

                    return res([])
                })
            }

            const fake = sinon.replace(
                el,
                '_showOpenFilePicker',
                sinon.fake(replacedFunction)
            )

            el.multiple = true
            el.accept = 'jpg'
            el.capture = 'front'
            el.files = []

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            expect(fake.lastCall.firstArg).to.eql({
                multiple: true,
                accept: 'jpg',
                capture: 'front',
            })

            el.multiple = false
            el.accept = null
            el.capture = null
            el.files = []

            setTimeout(() => {
                const clickEvent = new Event('mouseup')
                el.dispatchEvent(clickEvent)
            })

            await wait(0)

            expect(fake.lastCall.firstArg).to.eql({
                multiple: false,
                accept: null,
                capture: null,
            })
        })
    })
})
