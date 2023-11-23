import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import { User } from '../../utils/interfaces';

interface UserProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be within a valid provider');
  }
  return context;
};
