import React from 'react';
import { CheckboxGroup } from '../../src';

function CheckboxPage() {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div>
      <button onClick={() => setDisabled(!disabled)}>Disable</button>
      <CheckboxGroup>
        <CheckboxGroup.Title title="test" />
        <CheckboxGroup.Option name="one">
          <CheckboxGroup.Icon disabled={disabled} />
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
    </div>
  );
}

export default CheckboxPage;
