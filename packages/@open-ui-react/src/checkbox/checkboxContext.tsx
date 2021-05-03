import React, { createContext, useContext, useState } from 'react';
import { CheckboxInterpreter, CheckboxState } from './checkboxMachine';

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

interface GroupContext {
  checkboxes: HTMLInputElement[];
  addCheckbox: (checkbox: HTMLInputElement) => void;
}

const defaultGroupContext = {
  checkboxes: [],
  addCheckbox: () => null,
};

const RefContext = createContext<GroupContext>(defaultGroupContext);

export function useRefContext() {
  const context = useContext(RefContext)!;

  return context;
}

interface GroupContextProps {
  children: React.ReactChild;
}

export function RefContextProvider(props: GroupContextProps) {
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
