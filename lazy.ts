export const lazy = <T>(fn: () => T) => {
  let value: T;
  let computed = false;
  return () => {
    if (!computed) {
      value = fn();
      computed = true;
    }
    return value;
  };
};
