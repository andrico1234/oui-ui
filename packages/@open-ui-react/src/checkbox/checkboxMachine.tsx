import { Interpreter, Machine, State } from 'xstate';

export interface Context {
  name: string;
}

export interface StateSchema {
  states: {
    disabled: {};
    enabled: {
      states: {
        selected: {};
        unselected: {};
        indeterminate: {};
        hist: {};
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
    context: {
      name,
    },
    states: {
      disabled: {
        on: {
          ENABLE: 'enabled.hist',
        },
      },
      enabled: {
        initial: 'unselected',
        on: {
          DISABLE: 'disabled',
        },
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
          hist: {
            type: 'history',
            history: 'shallow',
          },
        },
      },
    },
  });
