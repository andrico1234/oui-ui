import { html, fixture, expect } from '@open-wc/testing'
import 'element-internals-polyfill'
// import '../../lib/index'

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

    // afterEach(() => {
    //     sinon.restore()
    // })

    // describe('should add a single file to the file picker', async () => {
    //     const el = await fixture(html`
    //         <oui-file>
    //             <button slot="file-selector-button">Upload file</button>
    //             <p slot="label">Checkbox label</p>
    //         </oui-file>
    //     `)

    //     let fileString =
    //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='

    //     let file = new File([fileString], 'sample.jpg', { type: 'image/png' })
    //     const fileList = new DataTransfer()
    //     fileList.items.add(file)
    //     el.files = fileList

    //     let changeEvent = new Event('change')
    //     el.dispatchEvent(changeEvent)
    // })
})
