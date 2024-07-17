'use client'

import { DashboardData } from "@/types/common";
import Link from "next/link";
import { useState } from "react";

export default function DashboardCard() {
    const [dashboardData, setdashboardData] = useState<DashboardData>({
        pemasukan: 0,
        pengeluaran: 0,
        terjual: 0
    });

    return (
        <div className="rounded-lg bg-green-200 p-3">
            <div className="border border-green-600 rounded-lg flex flex-col items-center justify-center p-2 mb-3">
                <p className="font-bold">Porsi terjual</p>
                <p>{dashboardData.terjual}</p>
            </div>
            <div className="grid-cols-2 grid gap-3">
                <div className="border border-green-600 rounded-lg flex flex-col items-center justify-center p-2">
                    <p className="font-bold">Pengeluaran</p>
                    <p>Rp{dashboardData.pengeluaran}</p>
                </div>
                <div className="border border-green-600 rounded-lg flex flex-col items-center justify-center p-2">
                    <p className="font-bold">Pemasukan</p>
                    <p>Rp{dashboardData.pemasukan}</p>
                </div>
            </div>
            <div className="border border-green-600 rounded-lg flex flex-col items-center justify-center p-2 mt-3">
                <p className="font-bold">Pendapatan bersih</p>
                <p>Rp{dashboardData.pengeluaran - dashboardData.pemasukan}</p>
            </div>
            <Link href={'/data-harian'}>
                <button className="bg-green-600 active:scale-95 transition-all text-white p-2 rounded-lg mt-3 w-full">Lihat rincian</button>
            </Link>
        </div>
    )
}
