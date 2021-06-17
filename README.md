# OpenUI UI (oui-ui)

<div align="center">
<img width="300" src="./images/yui-speech.png" alt="image of Yui, the OpenUI UI mascot" ></img>
</div>

Welcome to the unofficial OpenUI UI library, or oui-ui for short.

What's OpenUI? According to the [OpenUI site](https://open-ui.org/):

> The purpose of Open UI to the web platform is to allow web developers to style and extend built-in web UI controls, such as `<select>` dropdowns, checkboxes, radio buttons, and date/color pickers.
>
> Long term, we hope that Open UI will establish a standard process for developing high-quality UI controls suitable for addition to the web platform.

oui-ui is the implementation of these proposed UI controls as web component library, and so can be used with HTML, or with a framework like React or Vue.

## Quick start

Each web component lives in its own package. Here's how you can get started with a checkbox.

1. Begin by installing via your favourite package manager

`npm install @oui-ui/checkbox`

2. Use in your HTML, JSX, or whatever:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Quick Start</title>
        <meta charset="UTF-8" />
    </head>

    <body>
        <!-- Use web components in your HTML like regular built-in elements. -->
        <oui-checkbox>
            <div slot="indicator" class="indicator"></div>
            <p slot="label">Hey there</p>
        </oui-checkbox>

        <!-- oui-ui web components use standard JavaScript modules. -->
        <script type="module">
            import '@oui-ui/checkbox'
        </script>
    </body>
</html>
```

## Components

Currently, oui-ui only exports a single checkbox component.

| Component                                                                             |
| ------------------------------------------------------------------------------------- |
| [`<oui-checkbox>`](https://github.com/andrico1234/oui-ui/tree/main/packages/checkbox) |

## Development

### Running oui-ui locally

Being by forking the repo. Whilst in the root directory:

-   run `nvm use`, or ensure you're the node version specified in the `.nvmrc` file.
-   install dependencies using `yarn`.
-   ensure the tests are passing by running `yarn test`.
-   kick off the dev server by running `yarn develop`.
-   run the docs site locally using `yarn docs:start`.
-   jump into whichever you package you want to change
-   view your changes in your locally running docs

### Tech stack

oui-ui uses:

-   💪🏾 [TypeScript](https://www.typescriptlang.org/) as the primary language to keep things strong(ly typed).
-   📝 [Changesets](https://github.com/atlassian/changesets) to manage changelogs, versioning, and publishing.
-   🛠 [Web Test Runner](https://github.com/modernweb-dev/web) for testing
-   🧼 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for keeping code clean like a money machine.
-   🗂 [Docusaurus](https://docusaurus.io/) for handling our documentation.
-   🤖 [Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/) for consistent commits.
-   🙋🏽‍♂️ [Andrico](https://twitter.com/AndricoKaroulla) for keeping things ticking along.
