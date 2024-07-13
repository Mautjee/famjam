import { create } from "zustand";
import { ConnectedWallet } from "../types";
import { Sdk } from "@circles-sdk/sdk";

interface AppState {
  ready: boolean;
  connected: boolean;
  wallet?: ConnectedWallet; // Matcha Creatine ect.
  sdk?: Sdk;

  setReady: (ready: boolean) => void;
  setConnected: (connected: boolean) => void;
  setWallet: (wallet: ConnectedWallet) => void;
  setSdk: (sdk: Sdk) => void;
}
export const useAppStore = create<AppState>((set) => ({
  ready: false,
  connected: false,
  wallet: undefined,
  sdk: undefined,

  setReady: (ready) => set({ ready }),
  setConnected: (connected) => set({ connected }),
  setWallet: (wallet) => set({ wallet }),
  setSdk: (sdk) => set({ sdk }),
}));
