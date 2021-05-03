import React, {
  HTMLAttributes,
  useMemo,
  KeyboardEvent,
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import {
  createCheckboxMachine,
  CheckboxState,
  CheckboxInterpreter,
} from './checkboxMachine';
import { useMachine } from '@xstate/react';
import camelCase from 'camelcase';
import { createUseStyles } from 'react-jss';
import { KEYS } from '../constants';

const useStyles = createUseStyles({
  group: {
    border: 0,
  },
  legend: {},
  icon: {
    cursor: 'pointer',
  },
  label: {
    userSelect: 'none',
    cursor: 'pointer',
  },
  option: {
    cursor: 'pointer',
  },
});

// What kind of of customisation am I going to allow outside of css
//

/**
 * Default styles
 *
 * - remove user select on label click
 * - remove border around fieldset
 */

// focus, get a list of
//

/**
 * Todo
 * - Warning if label/checkboxes are outside of a group
 * - Changing the icons of the checkbox via SVGs
 * - Disable animations automatically
 * - Update focus on keypress
 * - Check on several browsers
 */

type CheckboxContextValue =
  | {
      current: CheckboxState;
      send: CheckboxInterpreter['send'];
    }
  | undefined;

const CheckboxContext = createContext<CheckboxContextValue>(undefined);

function useCheckboxContext() {
  const context = useContext(CheckboxContext)!;

  return context;
}

interface GroupContext {
  checkboxes: HTMLInputElement[];
  addCheckbox: (checkbox: HTMLInputElement) => void;
}

const defaultGroupContext = {
  checkboxes: [],
  addCheckbox: () => null,
};

const RefContext = createContext<GroupContext>(defaultGroupContext);

function useRefContext() {
  const context = useContext(RefContext)!;

  return context;
}

interface GroupContextProps {
  children: React.ReactChild;
}

function RefContextProvider(props: GroupContextProps) {
  const { children } = props;
  const [checkboxes, setCheckboxes] = useState<HTMLInputElement[]>([]);

  const addCheckbox = (ref: HTMLInputElement) => {
    setCheckboxes(existingCheckboxes => {
      return [...existingCheckboxes, ref];
    });
  };

  return (
    <RefContext.Provider value={{ checkboxes, addCheckbox }}>
      {children}
    </RefContext.Provider>
  );
}

// First version is just one level deep
// if people like this, then I can look into having it n-levels deep
// people to ask, openUI crew, xstate group.

// question do I want to use the default input element, or use my own?

interface GroupProps extends HTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode;
}

interface OptionProps {
  name: string;
  children: React.ReactNode;
}

interface TitleProps extends HTMLAttributes<HTMLLegendElement> {
  title: string;
}

/**
 *
 * This is concerned with keeping track of its children one level below.
 * This will have access to the context of which boxes are selected
 * This will also only be concerned with the styles
 * Top level disabled property.
 *
 */

// filter out disabled items

export function CheckboxGroup(props: GroupProps) {
  // does it make sense to handle the key stuff from here?
  // how do I get the currently selected focus on item?

  return (
    <RefContextProvider>
      <InnerCheckboxGroup {...props} />
    </RefContextProvider>
  );
}

function InnerCheckboxGroup(props: GroupProps) {
  const { children, className, ...rest } = props;
  const classes = useStyles();
  const groupRef = useRef<HTMLFieldSetElement | null>(null);
  const { checkboxes } = useRefContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLFieldSetElement>) => {
    const checkboxGroup = groupRef.current;
    if (!checkboxGroup) return;

    const currentIndex: number = 1;

    const { code } = e;
    if (code === KEYS.ArrowDown || code === KEYS.ArrowRight) {
      const isLastIndex = currentIndex + 1 >= checkboxes.length;
      if (isLastIndex) return;
      // move to next item in the

      checkboxes[currentIndex + 1].focus();

      return;
    }

    if (code === KEYS.ArrowUp || code === KEYS.ArrowLeft) {
      if (currentIndex === 0) return;

      checkboxes[currentIndex - 1].focus();
      return;
    }
  };

  return (
    <fieldset
      {...rest}
      className={`${classes.group} ${className}`}
      ref={groupRef}
      onKeyDown={handleKeyDown}
    >
      {children}
    </fieldset>
  );
}

function Title(props: TitleProps) {
  const { title, ...rest } = props;
  return <legend {...rest}>{title}</legend>;
}

/**
 *
 * This is concerned with keeping track of all the props and state of a single checkbox
 * Name, container styling, checkboxMachine
 * Pass through indeterminate prop
 */
function Option(props: OptionProps) {
  const { name } = props;
  const classes = useStyles();
  const checkboxMachine = useMemo(() => {
    return createCheckboxMachine(name);
  }, [name]);

  const [current, send] = useMachine(checkboxMachine);

  // how do I pass down the label through the components? avoid using the clone object. should I create a store for each checkbox group?
  // see how React Admin does this
  // I don't want to have to pass

  // the checkbox option should be concerned with that

  return (
    <CheckboxContext.Provider value={{ current, send }}>
      <div className={classes.option}>{props.children}</div>
    </CheckboxContext.Provider>
  );
}

function Icon() {
  const { current, send } = useCheckboxContext();
  const { addCheckbox } = useRefContext();
  const { name } = current.context;
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const id = camelCase(name);

  useLayoutEffect(() => {
    addCheckbox(inputRef.current!);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const { target, code } = e;

    // @ts-ignore
    const checked = target.checked as boolean;

    if (code === KEYS.Enter || code === KEYS.Space) {
      e.preventDefault();

      if (checked) {
        return send('SELECT');
      }
      return send('UNSELECT');
    }

    return;
  }, []);

  return (
    <input
      type="checkbox"
      id={id}
      ref={inputRef}
      disabled={current.matches('disabled')}
      className={classes.icon}
      onKeyDown={handleKeyDown}
      onChange={e => {
        const { checked } = e.target;

        if (checked) {
          return send('SELECT');
        }
        return send('UNSELECT');
      }}
      defaultChecked={current.matches('enabled.selected')}
    />
  );
}

function Label() {
  const { current } = useCheckboxContext();
  const classes = useStyles();
  const { name } = current.context;
  const id = camelCase(name);

  return (
    <label className={classes.label} htmlFor={id}>
      {name}
    </label>
  );
}

CheckboxGroup.Title = Title;
CheckboxGroup.Option = Option;
CheckboxGroup.Icon = Icon;
CheckboxGroup.Label = Label;

// API ideas. If I'm going to be using xState and passing the values down through context
// do I need to use the ugly render props pattern?
// instead is there a way I can pass through the context in a sensible way?

// properly understand the difference between zustand and jotai

// where does XState live at this point?

// create the machine in the checkbox group
// how can I tell if it has a parent?
// if it can broadcast event upwards then do it
