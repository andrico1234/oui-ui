import { Interpreter, Machine, State } from 'xstate';
import { CheckboxProps } from './checkbox';

export interface Context {
  name: string;
}

export interface StateSchema {
  states: {
    disabled: {};
    active: {
      states: {
        check: {
          states: {
            checked: {};
            unchecked: {};
            indeterminate: {};
          };
        };
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
    }
  | {
      type: 'UNCHECK';
    };

export type CheckboxState = State<Context, Event, StateSchema>;

export type CheckboxInterpreter = Interpreter<Context, StateSchema, Event>;

export const createCheckboxMachine = (props: CheckboxProps) => {
  const { name, defaultChecked, disabled } = props;

  return Machine<Context, StateSchema, Event>({
    id: 'checkbox',
    initial: disabled ? 'disabled' : 'active',
    type: 'parallel',
    context: {
      name,
    },
    states: {
      disabled: {
        on: {
          ENABLE: 'active',
        },
      },
      active: {
        type: 'parallel',
        on: {
          DISABLE: 'disable',
        },
        states: {
          check: {
            initial: defaultChecked ? 'checked' : 'unchecked',
            states: {
              checked: {
                on: {
                  CHECK: 'unchecked',
                },
              },
              unchecked: {
                on: {
                  CHECK: 'checked',
                },
              },
              indeterminate: {},
            },
          },
        },
      },
    },
  });
};
