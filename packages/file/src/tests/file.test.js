import { html, fixture, expect } from '@open-wc/testing'
import sinon from 'sinon'
import 'element-internals-polyfill'
import '../../lib/index'

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

    describe('Test stubs', () => {
        it('should fire off a change event', async () => {
            const el = await fixture(html`
                <oui-file>
                    <button slot="file-selector-button">Upload file</button>
                    <p slot="label">Checkbox label</p>
                </oui-file>
            `)

            const replacedFunction = () => {
                return new Promise((res) => {
                    console.log('heytooio')
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

            const clickEvent = new Event('mouseup')
            el.dispatchEvent(clickEvent)

            const textNode = el.shadowRoot.querySelector('[role=status]')

            expect(textNode).to.equal('sample.jpg')
        })
    })
})
