import { useEffect, useState } from "react";
import { useCerclesSdk } from "../hooks";
import { Stat } from "../components/stat";
import { Profile } from "../types";
import { PersonalTransactions } from "../components/transactions";
import { Avatar } from "@circles-sdk/sdk";
import { CirclesQuery, TransactionHistoryRow } from "@circles-sdk/data";

export const HomePage = () => {
  const { getTransactions, getAvatar, getProfile, isLoading, error } =
    useCerclesSdk();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [avatar, setAvatar] = useState<Avatar | undefined>(undefined);
  const [transactions, setTransactions] = useState<
    CirclesQuery<TransactionHistoryRow> | undefined
  >(undefined);

  useEffect(() => {
    getAvatar().then((avatar) => {
      setAvatar(avatar);
    });
    getProfile().then((profile) => {
      setProfile(profile);
    });
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [avatar]);

  if (isLoading) {
    return <div>Loading avatar...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile</div>;
  }

  return (
    <div className="h-screen overflow-scroll flex flex-col gap-4 bg-gray-100">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">Your Profile</p>
        <Stat title="Address" value={profile.address} desc="Your address" />
        <Stat
          title="Balance"
          value={String(profile.balance)}
          desc="Your balance"
        />
        <Stat title="Type" value={profile.type} desc="Your type" />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">Your Transactions</p>
        <PersonalTransactions transactions={transactions} />
      </div>
    </div>
  );
};
