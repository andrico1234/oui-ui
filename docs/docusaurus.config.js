/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'OpenUI UI',
    tagline: 'The unofficial OpenUI UI (oui-ui) library',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'andrico1234',
    projectName: 'oui-ui',
    clientModules: [require.resolve('./modules/loadPolyfill')],
    themeConfig: {
        navbar: {
            title: 'OpenUI UI',
            logo: {
                alt: 'OpenUI UI Logo',
                src: 'img/yui.png',
            },
            items: [
                {
                    href: 'https://github.com/andrico1234/oui-ui',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Links',
                    items: [
                        {
                            label: 'Official OpenUI Website',
                            href: 'https://open-ui.org/',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/AndricoKaroulla',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/',
                    editUrl:
                        'https://github.com/andrico1234/oui-ui/blob/main/docs',
                },

                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
}
