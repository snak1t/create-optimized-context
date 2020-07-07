import React from 'react';
import { createFastContext } from './createFastContext';

interface User {
  name: string;
  age: number;
  isActive: boolean;
}

interface GlobalState {
  user: User;
  updater: (cb: (user: User) => User) => void;
}

const ctx = createFastContext<GlobalState>({
  user: {
    age: 29,
    name: 'John Doe',
    isActive: true,
  },
  updater: () => ({}),
});

export const Provider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = React.useState<User>({
    age: 29,
    name: 'John Doe',
    isActive: true,
  });
  const updater = (cb: (user: User) => User) => {
    setUser(cb);
  };
  const value: GlobalState = {
    user,
    updater,
  };
  return <ctx.Provider value={value}>{children}</ctx.Provider>;
};

export const globalCtx = ctx;
