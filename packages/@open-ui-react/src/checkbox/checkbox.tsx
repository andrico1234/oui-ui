import React, {
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import camelCase from 'camelcase';
import { createUseStyles } from 'react-jss';
import { KEYS } from '../constants';
import {
  GroupContextProvider,
  useGroupContext,
  useCheckboxContext,
  CheckboxContextProvider,
} from './checkboxContext';
import { useIsomorphicEffect } from '../hooks/useIsomorphicEffect';

const useStyles = createUseStyles({
  group: {
    border: 0,
    padding: 0,
  },
  legend: {},
  icon: {
    cursor: 'pointer',
    width: '1.3em',
    height: '1.3em',
    '&:focus': {
      outline: '2px solid -webkit-focus-ring-color',
      outlineOffset: '2px',
    },
  },
  label: {
    userSelect: 'none',
    cursor: 'pointer',
    fontSize: '1.2em',
    padding: '0 0.25em',
  },
  option: {
    display: 'flex',
    width: 'fit-content',
    cursor: 'pointer',
    padding: '0.25em 0',
    alignItems: 'center',
  },
});

/**
 * Todo
 * - Changing the icons of the checkbox via SVGs
 * - Disable animations automatically
 * - Check on several browsers
 */

interface GroupProps extends HTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode;
}

interface OptionProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  children: React.ReactNode;
}

interface TitleProps extends HTMLAttributes<HTMLLegendElement> {
  title: string;
}

type IconProps = HTMLAttributes<HTMLInputElement> & {
  disabled?: boolean;
};

type LabelProps = HTMLAttributes<HTMLLabelElement>;

/**
 *
 * This is concerned with keeping track of its children as well as keyboard shortcuts to navigate via keyboard.
 */
export function CheckboxGroup(props: GroupProps) {
  return (
    <GroupContextProvider>
      <InnerCheckboxGroup {...props} />
    </GroupContextProvider>
  );
}

function InnerCheckboxGroup(props: GroupProps) {
  const { children, className, ...rest } = props;
  const classes = useStyles();
  const groupRef = useRef<HTMLFieldSetElement | null>(null);
  const { checkboxes } = useGroupContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLFieldSetElement>) => {
    const checkboxGroup = groupRef.current;
    if (!checkboxGroup) return;

    const filteredCheckboxes = checkboxes.filter(
      checkbox => !checkbox.disabled
    );

    const activeCheckbox = filteredCheckboxes.find(
      checkbox => checkbox === document.activeElement
    );

    if (!activeCheckbox) return;

    const currentIndex = checkboxes.indexOf(activeCheckbox);

    const { code } = e;
    if (code === KEYS.ArrowDown || code === KEYS.ArrowRight) {
      e.preventDefault();
      e.stopPropagation();
      const isLastIndex = currentIndex + 1 >= checkboxes.length;
      if (isLastIndex) return;

      return checkboxes[currentIndex + 1].focus();
    }

    if (code === KEYS.ArrowUp || code === KEYS.ArrowLeft) {
      e.preventDefault();
      e.stopPropagation();
      if (currentIndex === 0) return;

      return checkboxes[currentIndex - 1].focus();
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
  const { name, children, className: defaultClassName, ...rest } = props;
  const classes = useStyles();

  const className = `${classes.option} ${defaultClassName}`;

  return (
    <CheckboxContextProvider name={name}>
      <div className={className} {...rest}>
        {children}
      </div>
    </CheckboxContextProvider>
  );
}

function Icon(props: IconProps) {
  const { onChange: nativeOnChanged, disabled, ...rest } = props;
  const { current, send } = useCheckboxContext();
  const { addCheckbox } = useGroupContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const { name } = current.context;
  const id = camelCase(name);

  useIsomorphicEffect(() => {
    addCheckbox(inputRef.current!);
  }, []);

  useEffect(() => {
    if (disabled) {
      send('DISABLE');
      return;
    }
    send('ENABLE');
    return;
  }, [disabled, send]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const { target, code } = e;

      // @ts-ignore
      const checked = target.checked as boolean;

      if (code === KEYS.Enter || code === KEYS.Space) {
        e.preventDefault();
        inputRef.current!.focus();

        if (checked) {
          return send('UNSELECT');
        }
        return send('SELECT');
      }

      return;
    },
    [send]
  );

  return (
    <input
      type="checkbox"
      id={id}
      ref={inputRef}
      disabled={current.matches('enabled.disabled')}
      className={classes.icon}
      onKeyDown={handleKeyDown}
      checked={current.matches('selected.selected')}
      onChange={e => {
        const { checked } = e.target;

        if (nativeOnChanged) {
          nativeOnChanged(e);
        }

        if (checked) {
          return send('SELECT');
        }
        return send('UNSELECT');
      }}
      {...rest}
    />
  );
}

function Label(props: LabelProps) {
  const { className: defaultClassName, ...rest } = props;
  const { current } = useCheckboxContext();
  const classes = useStyles();
  const { name } = current.context;
  const id = camelCase(name);

  const className = `${classes.label} ${defaultClassName}`;

  return (
    <label className={className} htmlFor={id} {...rest}>
      {name}
    </label>
  );
}

CheckboxGroup.Title = Title;
CheckboxGroup.Option = Option;
CheckboxGroup.Icon = Icon;
CheckboxGroup.Label = Label;
