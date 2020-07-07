import React from 'react';
import { globalCtx } from './data.provider';
import { useFastContext } from './createFastContext';

export const CComponent: React.FunctionComponent<{}> = () => {
  const updater = useFastContext(globalCtx, (state) => state.updater);
  return (
    <button
      onClick={() => {
        updater((user) => {
          return {
            ...user,
            age: user.age + 1,
          };
        });
      }}
    >
      increase
    </button>
  );
};
