/* tslint:disable: prefer-type-cast */

export function supressError<R, E extends Error>(
  fn: (...args: unknown[]) => R,
  errClses: (new(...args: unknown[]) => E)[],
) {
  return ((...args: unknown[]) => {
    try {
      return fn(...args);
    } catch (err) {
      if (errClses.some(errCls => err instanceof errCls)) {
        return void 0;
      }
      throw err;
    }
  }) as (...args: Parameters<typeof fn>) => R | undefined;
}