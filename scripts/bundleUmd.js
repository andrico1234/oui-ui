const path = require('path')
const { build } = require('vite')
const glob = require('glob')

;(async () => {
    glob('../packages/*/index.ts', async function (er, files) {
        for (const file of files) {
            const root = file.split('/index.ts')[0]

            await build({
                root: path.resolve(__dirname, root),
                build: {
                    outDir: 'lib-umd',
                    lib: {
                        entry: './lib',
                        name: 'checkbox',
                        formats: ['umd'],
                    },
                },
            })
        }
    })
})()
