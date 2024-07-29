import DashboardCard from "@/components/cards/dashboard";
import TimeCard from "@/components/cards/time";

export default function Home() {
  return (
    <main className="m-6 space-y-5">
      <TimeCard />
      <DashboardCard />
      <div className="bg-purple-200 rounded-lg p-3">
        <button className="bg-purple-300 w-full active:scale-95 transition-all p-2 rounded-lg">Lihat grafik keuangan</button>
      </div>
    </main>
  );
}
