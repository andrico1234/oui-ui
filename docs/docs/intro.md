---
sidebar_position: 1
id: intro
slug: /
---

# OpenUI UI (oui-ui)

<div align="center">
<img width="300" src="/img/yui-speech.png" alt="image of Yui, the OpenUI UI mascot" ></img>
</div>

Welcome to the unofficial OpenUI UI library, or oui-ui for short.

Why the ridiculous name? oui-ui is a set of web components that adheres to the researcxh and proposals conducted by the OpenUI working group, hence the name **OpenUI UI**.

For those unfamiliar with the OpenUI project, according to the [OpenUI site](https://open-ui.org/):

> The purpose of Open UI to the web platform is to allow web developers to style and extend built-in web UI controls, such as `<select>` dropdowns, checkboxes, radio buttons, and date/color pickers.
>
> Long term, we hope that Open UI will establish a standard process for developing high-quality UI controls suitable for addition to the web platform.

oui-ui is designed to be used anywhere on the web, regardless of whether you choose to use a framework like React or Vue.

## Quick start

Each web component lives in its own package. Here's how you'd get started with a checkbox.

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
