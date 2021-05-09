import { Interpreter, Machine, State } from 'xstate';
import { CheckboxProps } from './checkbox';

export interface Context {
  name: string;
}

export interface StateSchema {
  states: {
    active: {
      states: {
        disabled: {};
        enabled: {};
      };
    };

    check: {
      states: {
        checked: {};
        unchecked: {};
        indeterminate: {};
      };
    };
  };
}

export type Event =
  | {
      type: 'ENABLE';
    }
  | {
      type: 'DISABLE';
    }
  | {
      type: 'CHECK';
    };

export type CheckboxState = State<Context, Event, StateSchema>;

export type CheckboxInterpreter = Interpreter<Context, StateSchema, Event>;

export const createCheckboxMachine = (props: CheckboxProps) => {
  const { name, defaultChecked, disabled } = props;

  return Machine<Context, StateSchema, Event>({
    id: 'checkbox',
    type: 'parallel',
    context: {
      name,
    },
    states: {
      active: {
        initial: disabled ? 'disabled' : 'enabled',
        states: {
          disabled: {
            on: {
              ENABLE: 'enabled',
            },
          },
          enabled: {
            on: {
              DISABLE: 'disabled',
            },
          },
        },
      },
      check: {
        initial: defaultChecked ? 'checked' : 'unchecked',
        states: {
          checked: {
            on: {
              CHECK: { target: 'unchecked', in: '#checkbox.active.enabled' },
            },
          },
          unchecked: {
            on: {
              CHECK: { target: 'checked', in: '#checkbox.active.enabled' },
            },
          },
          indeterminate: {},
        },
      },
    },
  });
};
