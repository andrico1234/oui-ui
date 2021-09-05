import { html, fixture, expect } from '@open-wc/testing'

describe('<oui-file>', () => {
    it('passes a11y test', async () => {
        const el = await fixture(html`
            <oui-file>
                <div slot="file-selector-button">Upload file</div>
                <p slot="label">Checkbox label</p>
            </oui-file>
        `)
        await expect(el).to.be.accessible()
    })
})
