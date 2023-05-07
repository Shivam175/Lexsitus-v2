/* eslint-disable @typescript-eslint/no-unsafe-call */
export const stopPropagation = (event?: any, callback?: () => void) => {
    event?.preventDefault();
    event?.stopPropagation();
    callback?.();
};