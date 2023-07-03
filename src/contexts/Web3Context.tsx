import { ReactNode, createContext } from "react";

interface Props {
  children: ReactNode;
}

type ContextValues = {
  connect: () => void;
  disconnect: () => void;
};

const defaultValues: ContextValues = {
  connect: () => {
    return null;
  },
  disconnect: () => {
    return null;
  }
};

export const Web3Context = createContext(defaultValues);

export const Web3ContextProvider = ({ children }: Props) => {
  const connect = async () => {
    console.log("Hello web3");
  };

  const disconnect = async () => {
    console.log("Goodbye web3");
  };

  return (
    <Web3Context.Provider value={{ connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};
