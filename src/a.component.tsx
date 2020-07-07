import React from 'react';
import { globalCtx } from './data.provider';
import { useRenderCount } from './useRenderCount';
import { useFastContext } from './createFastContext';

export const AComponent: React.FunctionComponent<{}> = () => {
  const name = useFastContext(globalCtx, (state) => state.user.name);
  const renderCounter = useRenderCount();
  return (
    <div>
      name: {name} - {renderCounter}
    </div>
  );
};
