import { useEffect } from 'react';
export function useContextWarning(val, parentName) {
    useEffect(() => {
        if (!val) {
            throw Error(`It looks like your component is not wrapped in ${parentName} component`);
        }
    }, [val, parentName]);
}
