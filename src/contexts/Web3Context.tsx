import { ReactNode, createContext, useEffect, useState } from "react";
import { formatEther } from "ethers";
import { User } from "../types/User";
import { BrowserProvider } from "ethers";

interface Props {
  children: ReactNode;
}

type ContextValues = {
  connect: () => void;
  disconnect: () => void;
  user: User | undefined;
};

const defaultValues: ContextValues = {
  connect: () => {
    return null;
  },
  disconnect: () => {
    return null;
  },
  user: undefined
};

export const Web3Context = createContext(defaultValues);

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Web3ContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  const connect = async () => {
    //Maneja la lógica de conexión

    //Tiene que haber wallet instalada
    if (window.ethereum) {
      //Solicitamos el listado de cuentas (addresses)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      //Obtenemos la dirección de la primera cuenta (que es la que el usuario tiene seleccionada en metamask)
      const address = accounts[0];

      //Obtenemos el balance de la cuenta seleccionada
      const balance = await getBalance(address);

      //Obtenemos el chainId de la red a la que está conectada la wallet
      const chainId = await getChainId();

      //Obtenemos el provider y el signer
      const { provider, signer } = await getProviderAndSigner();

      setUser({
        address,
        balance: balance,
        chainId,
        provider,
        signer
      });
    }
  };

  const disconnect = async () => {
    //Cuando desconectamos la wallet, eliminamos el estado con la información del usuario
    setUser(undefined);
  };

  useEffect(() => {
    if (window.ethereum) {
      //cuando se cambie de cuenta, se va a ejecutar el evento "accountsChanged", que va a ejecutar la función handleAccountsChanged
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      //cuando se cambie de red, se va a ejecutar el evento "chainChanged", que va a ejecutar la función handleChainsChanged
      window.ethereum.on("chainChanged", handleChainsChanged);

      //cuando se desconecte la wallet, se va a ejecutar el evento "disconnect", que va a ejecutar la función disconnect
      window.ethereum.on("disconnect", () => {
        disconnect();
      });
    }

    return () => {
      //Cuando se desmonte el componente, eliminamos los listeners
      window?.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      window?.ethereum?.removeListener("chainChanged", handleChainsChanged);
    };
  }, []);

  const handleAccountsChanged = async (accounts: string[]) => {
    //Si no hay cuentas, eliminamos el estado con la información del usuario
    if (accounts.length === 0) {
      setUser(undefined);
    } else {
      //Si hay cuentas, actualizamos el estado con la información del usuario
      const balance = await getBalance(accounts[0]);
      const chainId = await getChainId();
      const { provider, signer } = await getProviderAndSigner();

      setUser((user) => {
        return {
          ...user,
          address: accounts[0],
          balance,
          chainId,
          provider,
          signer
        };
      });
    }
  };

  const handleChainsChanged = () => {
    //Cuando se cambie de red, recargamos la página. Esto es lo recomendado por Metamask
    window.location.reload();
  };

  const getBalance = async (address: string) => {
    // Obtenemos el balance de la cuenta seleccionada
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    // Convertimos el balance a ETH, ya que previamente viene en WEI
    return formatEther(balance);
  };

  const getChainId = async () => {
    // Obtenemos el chainId de la red a la que está conectada la wallet
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    return chainId;
  };

  const getProviderAndSigner = async () => {
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return {
      provider,
      signer
    };
  };

  return (
    <Web3Context.Provider value={{ connect, disconnect, user }}>
      {children}
    </Web3Context.Provider>
  );
};
