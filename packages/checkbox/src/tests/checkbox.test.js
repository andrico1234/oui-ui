import { html, fixture, expect } from '@open-wc/testing'

import '../../lib/index'

describe('MyElement', () => {
    it('has a default title "Hey there"', async () => {
        const el = await fixture(html` <ou-checkbox></ou-checkbox> `)

        expect(el.innerHTML).to.equal('Hey there')
    })
})
