import TimeCard from "@/components/header/cards/time";

export default function DataHarian() {
  return (
    <div>
      <p>Makanan terjual:</p>
      <div className="max-h-60 overflow-auto border">
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
      </div>
    </div>
  )
}
