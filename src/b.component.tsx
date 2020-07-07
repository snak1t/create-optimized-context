import React from 'react';
import { globalCtx } from './data.provider';
import { useRenderCount } from './useRenderCount';
import { useFastContext } from './createFastContext';

export const BComponent: React.FunctionComponent<{}> = () => {
  const age = useFastContext(globalCtx, (state) => state.user.age);
  const renderCounter = useRenderCount();
  return (
    <div>
      age: {age} - {renderCounter}
    </div>
  );
};
