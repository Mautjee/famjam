import { BrowserProvider } from "ethers";

export const getBrowserProvider = () => {
  const w: any = window;
  if (!w.ethereum) {
    throw new Error("No browser wallet found (window.ethereum is undefined)");
  }
  return new BrowserProvider(w.ethereum);
};
