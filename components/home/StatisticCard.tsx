import { LucideIcon } from "lucide-react";
interface StatisticCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
}
export default function StatisticCard({
  title,
  value,
  Icon,
}: StatisticCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center card-shadow py-10
         bg-primary-500 shadow-md rounded-lg p-6 w-full max-w-xs md:w-64 lg:w-72"
    >
      <div className="flex flex-row space-x-5">
        <div className="text-4xl mb-4">
          <Icon className="h-6 w-6 text-secondary-800" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      </div>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  );
}
