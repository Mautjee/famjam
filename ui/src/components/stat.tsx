import { FC } from "react";

interface StatProps {
  title: string;
  value: string;
  desc: string;
}

export const Stat: FC<StatProps> = ({ title, value, desc }) => {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc">{desc}</div>
      </div>
    </div>
  );
};
