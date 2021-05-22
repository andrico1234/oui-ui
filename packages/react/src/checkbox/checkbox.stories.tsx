import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CheckboxGroup } from './checkbox';

const meta: Meta = {
  title: 'Welcome',
  component: CheckboxGroup,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

interface Props {
  disabled: boolean;
}

const Template: Story<Props> = (props) => {
  return (
    <CheckboxGroup>
      <CheckboxGroup.Title title="Test Checkbox" />
      <CheckboxGroup.Option name="first">
        <CheckboxGroup.Icon disabled={props.disabled} />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>

      <CheckboxGroup.Option name="second">
        <CheckboxGroup.Icon />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>

      <CheckboxGroup.Option name="third">
        <CheckboxGroup.Icon />
        <CheckboxGroup.Label />
      </CheckboxGroup.Option>
    </CheckboxGroup>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  disabled: true,
};
