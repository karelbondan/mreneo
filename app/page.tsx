import DashboardCard from "@/components/cards/dashboard";
import TimeCard from "@/components/cards/time";

export default function Home() {
  return (
    <main className="m-6 space-y-5">
      <TimeCard />
      <DashboardCard />
      <div className="bg-purple-200 rounded-lg p-3 space-y-3">
        <button className="flex items-center justify-center space-x-1 bg-purple-300 w-full active:scale-95 transition-all p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>
          <span>Lihat grafik keuangan</span>
        </button>
        <button className="flex items-center justify-center space-x-1 bg-purple-300 w-full active:scale-95 transition-all p-2 rounded-lg">
          <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="size-6"><rect width="512" height="512" x="0" y="0" rx="0" fill="transparent" stroke="transparent" strokeWidth="0" strokeOpacity="0%" paintOrder="stroke"></rect><svg width="512px" height="512px" viewBox="0 0 16 16" fill="#000000" x="0" y="0" role="img" xmlns="http://www.w3.org/2000/svg"><g fill="black"><path fill="currentColor" d="M4 1.5a.5.5 0 0 0-1 0v3a2.5 2.5 0 0 0 2 2.45v7.55a.5.5 0 0 0 1 0V6.95A2.5 2.5 0 0 0 8 4.5v-3a.5.5 0 0 0-1 0v3a1.5 1.5 0 0 1-1 1.415V1.5a.5.5 0 0 0-1 0v4.415A1.5 1.5 0 0 1 4 4.5v-3Zm7 13V8H9.5a.5.5 0 0 1-.5-.5v-4c0-.663.326-1.283.771-1.729C10.217 1.326 10.837 1 11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0Z" /></g></svg></svg>
          <span>Edit menu makanan</span>
        </button>
      </div>
    </main>
  );
}
