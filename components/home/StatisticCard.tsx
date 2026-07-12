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
      className="flex flex-col items-center justify-center card-shadow shadow-lg py-10 hover:scale-105
         bg-emerald-600 rounded-lg p-6 w-full max-w-xs md:w-64 lg:w-72 border border-emerald-500"
    >
      <div className="flex flex-row space-x-5">
        <div className="text-4xl mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      </div>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  );
}
