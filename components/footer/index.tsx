'use client'
import { useRouter } from "next/navigation";

export default function NavigationBar() {
    const router = useRouter();
    return (
        <div className="border grid grid-cols-3">
            <button onClick={() => router.push('/')} className="flex items-center justify-center border p-5 active:scale-95 active:bg-black/15 transition-all">
                Dashboard
            </button>
            <button onClick={() => router.push('/data-harian')} className="flex items-center justify-center border p-5 active:scale-95 active:bg-black/15 transition-all">
                Data harian
            </button>
            <button onClick={() => router.push('/grafik')} className="flex items-center justify-center border p-5 active:scale-95 active:bg-black/15 transition-all">
                Grafik
            </button>
        </div>
    )
}
