import { useEffect } from 'react';

export function useContextWarning(val: unknown, parentName: string) {
  useEffect(() => {
    if (!val) {
      throw Error(
        `It looks like your component is not wrapped in ${parentName} component`
      );
    }
  }, []);
}
