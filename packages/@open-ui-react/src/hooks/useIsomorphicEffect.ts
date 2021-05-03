import { useLayoutEffect, useEffect } from 'react';

export const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
