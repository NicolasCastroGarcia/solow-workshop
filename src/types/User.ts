import { Provider, Signer } from "ethers";

export type User = {
  address: string;
  balance: string;
  chainId: string;
  provider: Provider;
  signer: Signer;
};
