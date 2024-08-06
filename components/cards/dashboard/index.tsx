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
            <Link href={'/data_harian'}>
                <button className="flex items-center space-x-1 justify-center bg-green-600 active:scale-95 transition-all text-white p-2 rounded-lg mt-3 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    <p>Lihat rincian</p>
                </button>
            </Link>
        </div>
    )
}
