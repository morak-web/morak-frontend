import { createContext, useContext, useCallback, useState } from 'react';
import { loginMyInfo } from '../api/auth/socialLoginApi';
const MyInfoContext = createContext(null);

export function MyInfoProvider({ children }) {
  const [myInfo, setMyINfo] = useState(null);

  const fetchMyInfo = useCallback(async () => {
    try {
      const data = await loginMyInfo();
      setMyINfo(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  const value = {
    fetchMyInfo,
    myInfo,
  };
  return (
    <MyInfoContext.Provider value={value}>{children}</MyInfoContext.Provider>
  );
}

export function useMyInfo() {
  const ctx = useContext(MyInfoContext);
  if (!ctx) throw new Error('useMyInfo must be used within a ProjectProvider');
  return ctx;
}
