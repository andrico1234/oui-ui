const fs = require('fs')
const { playwrightLauncher } = require('@web/test-runner-playwright')

module.exports = {
    nodeResolve: true,
    coverage: true,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        threshold: {
            statements: 90,
            branches: 65,
            functions: 80,
            lines: 90,
        },
    },
    browsers: [
        playwrightLauncher({ product: 'firefox' }),
        playwrightLauncher({ product: 'chromium' }),
        playwrightLauncher({ product: 'webkit' }),
    ],
    testFramework: {
        config: {
            timeout: '3000',
        },
    },
    files: 'packages/**/*.test.js',
}
