import { create } from "zustand";
import { ConnectedWallet } from "../types";
import { Sdk } from "@circles-sdk/sdk";

interface AppState {
  connected: boolean; // Supliments or Health or Bussiness
  wallet?: ConnectedWallet; // Matcha Creatine ect.
  sdk?: Sdk;

  setConnected: (connected?: boolean) => void;
  setWallet: (wallet?: ConnectedWallet) => void;
  setSdk: (sdk?: Sdk) => void;
}
export const useAppStore = create<AppState>((set) => ({
  connected: false,
  wallet: undefined,
  sdk: undefined,

  setConnected: (connected) => set({ connected }),
  setWallet: (wallet) => set({ wallet }),
  setSdk: (sdk) => set({ sdk }),
}));
