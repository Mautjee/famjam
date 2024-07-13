import { CirclesQuery, TransactionHistoryRow } from "@circles-sdk/data";
import { FC } from "react";

interface TransactionProps {
  transactions?: CirclesQuery<TransactionHistoryRow>;
}

export const PersonalTransactions: FC<TransactionProps> = ({
  transactions,
}) => {
  const getTransactions = (
    transactions: CirclesQuery<TransactionHistoryRow>,
  ) => {
    return transactions.currentPage?.results.map((t) => (
      <div className="border-2 border-gray-200 rounded-lg p-4 w-fit ml-10">
        <p>
          from: <a className="font-bold">{t.from}</a>
        </p>
        <p>
          to: <a className="font-bold">{t.to}</a>
        </p>
        <p>
          value: <a className="font-bold">{t.value}</a>
        </p>
        <p>
          tokenAddress: <a className="font-bold">{t.tokenAddress}</a>
        </p>
        <p>
          timestamp: <a className="font-bold">{t.timestamp}</a>
        </p>
      </div>
    ));
  };

  if (!transactions) {
    return <div>No transactions</div>;
  }

  return (
    <div>
      <div>{getTransactions(transactions)}</div>
    </div>
  );
};
