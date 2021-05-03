import { useMachine } from '@xstate/react';
import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  CheckboxInterpreter,
  CheckboxState,
  createCheckboxMachine,
} from './checkboxMachine';

/**
 * Checkbox Context
 */
interface Props {
  children: React.ReactNode;
  name: string;
}

type CheckboxContextValue =
  | {
      current: CheckboxState;
      send: CheckboxInterpreter['send'];
    }
  | undefined;

export const CheckboxContext = createContext<CheckboxContextValue>(undefined);

export function useCheckboxContext() {
  const context = useContext(CheckboxContext)!;

  return context;
}

export function CheckboxContextProvider(props: Props) {
  const { children, name } = props;

  console.log('name', name);

  const checkboxMachine = useMemo(() => {
    return createCheckboxMachine(name);
  }, [name]);

  const [current, send] = useMachine(checkboxMachine);

  return (
    <CheckboxContext.Provider value={{ current, send }}>
      {children}
    </CheckboxContext.Provider>
  );
}

/**
 * Group Context
 */
interface GroupContext {
  checkboxes: HTMLInputElement[];
  addCheckbox: (checkbox: HTMLInputElement) => void;
}

const defaultGroupContext = {
  checkboxes: [],
  addCheckbox: () => null,
};

const GroupContext = createContext<GroupContext>(defaultGroupContext);

export function useGroupContext() {
  const context = useContext(GroupContext)!;

  return context;
}

interface GroupContextProps {
  children: React.ReactChild;
}

export function GroupContextProvider(props: GroupContextProps) {
  const { children } = props;
  const [checkboxes, setCheckboxes] = useState<HTMLInputElement[]>([]);

  const addCheckbox = (ref: HTMLInputElement) => {
    setCheckboxes(existingCheckboxes => {
      return [...existingCheckboxes, ref];
    });
  };

  return (
    <GroupContext.Provider value={{ checkboxes, addCheckbox }}>
      {children}
    </GroupContext.Provider>
  );
}
