// single checkbox, is on or is off
// checkbox group that is then responsible for its children?
// so how about the checkboxgroup doesn't have a machine, but instead only the checkbox does
// the checkbox group manages it's state via jotai/zustand

// the group doesn't have any state, just context. a list of children that are active and inactive

import { Interpreter, Machine, State } from 'xstate';

// things to try
// 1. use the react children helps to see how many children are created. do the children get unique ids? does the parent have access to these unique ids?
// they need to have unique ids incase items are added or remove. is this a premature optimisation?

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
