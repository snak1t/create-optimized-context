import React, { useEffect } from 'react';
import PubSub from 'pubsub-js';
import { isEqual } from 'lodash';

interface FastContext<T extends object> {
  Provider: React.FC<{ value: T }>;
  topicKey: Symbol;
  value: () => T;
}

export function createFastContext<T extends object>(
  initialValue: T
): FastContext<T> {
  let valueRef: T = initialValue;
  const topicKey = Symbol('TOPIC_KEY');

  const Provider: React.FC<{ value: T }> = ({ children, value }) => {
    valueRef = value;
    useEffect(() => {
      // @ts-ignore
      PubSub.publish(topicKey);
    }, [value]);
    return <>{children}</>;
  };

  return {
    Provider,
    topicKey: topicKey,
    value() {
      return valueRef;
    },
  };
}

// @ts-ignore
function id<T>(x: T): G {
  return x;
}

export function useFastContext<T extends object, G>(
  ctx: FastContext<T>,
  selector: (state: T) => G = id
): G {
  const [, setCounter] = React.useState<number>(0);
  const ref = React.useRef<G>(selector(ctx.value()));

  useEffect(() => {
    //@ts-ignore
    const subscriptionToken = PubSub.subscribe(ctx.topicKey, () => {
      const upd = selector(ctx.value());
      if (!isEqual(upd, ref.current)) {
        setCounter((c) => c + 1);
        ref.current = upd;
      }
    });
    return () => {
      PubSub.unsubscribe(subscriptionToken);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.topicKey]);

  return ref.current;
}
