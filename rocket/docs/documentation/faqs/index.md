# FAQs || 20

## Why am I having trouble with disabled states in React?

Because `Checkbox` is a [form-associated custom element](https://docs.google.com/document/d/1JO8puctCSpW-ZYGU8lF-h4FWRIDQNDVexzHoOQ2iQmY/edit), the browser recognises it as having a `disabled` state even if the value is set to `false`. You can use a tool like `@lit-labs/react` as a wrapper around this WC to manage attributes a little better.

## Why are form components not working in Firefox/Webkit?

The form-associated custom elements spec isn't implemented on these browsers yet. Fortunately there's a [polyfill](https://github.com/calebdwilliams/element-internals-polyfill) that you can use to implement most of this behaviour. We run our tests against Chrome, Firefox, and Webkit, and for the latter two we test using the polyfill. This means the core functionality should work when using the polyfill.
