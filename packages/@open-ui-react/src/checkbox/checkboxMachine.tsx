import { Interpreter, Machine, State } from 'xstate';

export interface Context {
  name: string;
}

export interface StateSchema {
  states: {
    enabled: {
      states: {
        disabled: {};
        enabled: {};
      };
    };
    selected: {
      states: {
        selected: {};
        unselected: {};
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
      type: 'SELECT';
    }
  | {
      type: 'UNSELECT';
    };

export type CheckboxState = State<Context, Event, StateSchema>;

export type CheckboxInterpreter = Interpreter<Context, StateSchema, Event>;

export const createCheckboxMachine = (name: string) =>
  Machine<Context, StateSchema, Event>({
    id: 'checkbox',
    initial: 'enabled',
    type: 'parallel',
    context: {
      name,
    },
    states: {
      enabled: {
        initial: 'enabled',
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

      selected: {
        initial: 'unselected',
        states: {
          selected: {
            on: {
              UNSELECT: 'unselected',
            },
          },
          unselected: {
            on: {
              SELECT: 'selected',
            },
          },
          indeterminate: {
            on: {
              UNSELECT: 'unselected',
            },
          },
        },
      },
    },
  });
