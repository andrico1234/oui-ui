# Checkbox

## Description

The Checkbox component aims to align closely with the API outlined in the [OpenUI's proposal](https://open-ui.org/components/checkbox).

Implemented attributes
- [ ] checked
- [ ] indeterminate
- [ ] defaultChecked
- [ ] value
- [ ] autoFocus
- [x] disabled
- [ ] form
- [x] name
- [ ] required
- [ ] readonly

Implemented events
- [ ] change
- [ ] input

Keyboard
- [ ] document focus
- [ ] autofocus
- [ ] target of click, tap, or keyboard inputs

## Simple Example

```jsx
import { CheckboxGroup } from '@open-ui/react';

function CheckboxInputs() {
  return (
    <CheckboxGroup>
      <CheckboxGroup.Title title="test" />
      <CheckboxGroup.Option name="one">
        <CheckboxGroup.Icon disabled />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>

      <CheckboxGroup.Option name="two">
        <CheckboxGroup.Icon />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>

      <CheckboxGroup.Option name="three">
        <CheckboxGroup.Icon />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>
    </CheckboxGroup>
  ) 
}
```

