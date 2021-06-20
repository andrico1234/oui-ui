# Checkbox

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
            <div slot="control">
                <div slot="indicator"></div>
            </div>
            <p slot="label">Hey there</p>
        </oui-checkbox>

        <!-- oui-ui web components use standard JavaScript modules. -->
        <script type="module">
            import '@oui-ui/checkbox'
        </script>
    </body>
</html>
```

## API

| Name           | Type    | Default | Description                                                                                                                         |
| -------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| checked        | boolean | false   | Whether or not the checkbox's value is checked, if set to `true` the checkbox displays the contents of the `checked-indicator` slot |
| defaultChecked | boolean | false   | Whether the checkbox is checked by default when added to the DOM. Does nothing if checked is explicitly set                         |
| disabled       | boolean | false   | When set to `true` the checkbox cannot be interacted                                                                                |
| indeterminate  | boolean | false   | When set to `true` the checkbox displays the contents of the `intermediate-indicator` slot                                          |
