// MyContext.tsx

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type MyContextType = {
  resultVideosrccontext: string;
  setResultVideosrccontext: Dispatch<SetStateAction<string>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [resultVideosrccontext, setResultVideosrccontext] =
    useState<string>("");

  return (
    <MyContext.Provider
      value={{ resultVideosrccontext, setResultVideosrccontext }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
