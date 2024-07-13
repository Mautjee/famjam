import { Avatar, ChainConfig, Sdk } from "@circles-sdk/sdk";
import { BrowserProvider } from "ethers";
import { useState } from "react";

const chainConfig: ChainConfig = {
  circlesRpcUrl: "https://chiado-rpc.aboutcircles.com",
  v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
  v2HubAddress: "0x2066CDA98F98397185483aaB26A89445addD6740",
  migrationAddress: "0x2A545B54bb456A0189EbC53ed7090BfFc4a6Af94",
};

function getBrowserProvider() {
  const w: any = window;
  if (!w.ethereum) {
    throw new Error("No browser wallet found (window.ethereum is undefined)");
  }
  return new BrowserProvider(w.ethereum);
}

async function initializeSdk(walllet: { runner: any; address: string }) {
  // The circles sdk must be initialized with the
  // contract addresses and endpoints for the chain.
  // It takes a signer as the second argument.
  return new Sdk(chainConfig, walllet);
}

export const Send = () => {
  const [wallet, setWallet] = useState<{ runner: any; address: string } | null>(
    null,
  );
  const [sdk, setSdk] = useState<Sdk | null>(null);
  const [avatar, setAvatar] = useState<Avatar | null>(null);

  const connectWallet = async () => {
    const provider = getBrowserProvider();
    const signer = await provider.getSigner();

    const wallet = {
      runner: signer,
      address: await signer.getAddress(),
    };

    if (!wallet) {
      throw new Error("No wallet found");
    }
    setWallet(wallet);
  };

  const inializeSdk = async (wallet: { runner: any; address: string }) => {
    const theSdk = await initializeSdk(wallet);
    setSdk(theSdk);
  };

  const initializeAvatar = async (
    sdk: Sdk,
    wallet: { runner: any; address: string },
  ) => {
    const avatar = await sdk.getAvatar(wallet.address);
    setAvatar(avatar);
  };

  const testFunc = async (sdk: Sdk) => {
    if (avatar?.address) {
      const res = sdk.v2Hub?.safeTransferFrom(
        avatar?.address,
        "0x0xF83091FAa3AF253d4f3037f8b91456315AB93319",
        "0x73299F44aE7997e5676481369Ac6086B2d3A9b94",
        1,
        "0x",
      );
      console.log(res);
    }
  };

  const lastUpdated = avatar?.avatarInfo?.timestamp || 0;
  const lastUpdatedDaysOrHoursOrMinutesAgo: string =
    Date.now() - lastUpdated * 1000 > 86400000
      ? `${Math.floor((Date.now() - lastUpdated * 1000) / 86400000)} days ago`
      : Date.now() - lastUpdated * 1000 > 3600000
        ? `${Math.floor((Date.now() - lastUpdated * 1000) / 3600000)} hours ago`
        : `${Math.floor((Date.now() - lastUpdated * 1000) / 60000)} minutes ago`;

  const avatarData = (
    <div>
      <p>Avatar address: {avatar?.address}</p>
      <p>Avatar (info) address: {avatar?.avatarInfo?.avatar}</p>
      <p>Avatar (info) V1: {JSON.stringify(avatar?.avatarInfo?.hasV1)}</p>
      <p>Avatar v1 stopped: {JSON.stringify(avatar?.avatarInfo?.v1Stopped)}</p>
      <p>last updated human readable: {lastUpdatedDaysOrHoursOrMinutesAgo}</p>
      <p>v1 token address: {avatar?.avatarInfo?.v1Token}</p>
      <p>token address: {avatar?.avatarInfo?.tokenId}</p>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {!wallet ? (
        <button className="text-3xl font-bold" onClick={connectWallet}>
          Connect wallet
        </button>
      ) : (
        <p>Wallet connected: {wallet.address}</p>
      )}
      {wallet && !sdk ? (
        <button
          className="text-3xl font-bold"
          onClick={() => inializeSdk(wallet)}
        >
          Initialize SDK
        </button>
      ) : (
        sdk && <p>SDK initialized</p>
      )}
      {sdk && !avatar && wallet ? (
        <button
          className="text-3xl font-bold"
          onClick={() => initializeAvatar(sdk, wallet)}
        >
          Initialize Avatar
        </button>
      ) : (
        avatar && <p>Avatar initialized</p>
      )}
      {avatar && sdk ? (
        <>
          {avatarData}
          {
            // TODO: input element for address to check if can transfer
          }
          <button className="text-3xl font-bold" onClick={() => testFunc(sdk)}>
            Test
          </button>
        </>
      ) : (
        <p>No avatar :(</p>
      )}
    </div>
  );
};
