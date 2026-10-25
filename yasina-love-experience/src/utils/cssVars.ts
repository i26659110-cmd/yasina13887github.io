import type { CSSProperties } from 'react';

/**
 * React's CSSProperties type does not include custom properties (--name).
 * This helper keeps the cast in one place.
 */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as unknown as CSSProperties;
}
