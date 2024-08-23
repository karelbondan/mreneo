import React from 'react'
import PesananDummy from "./dummy_data/daftar_pesanan_customer.js"
import { DaftarPesanan } from '@/types/common';
import PesananCard from '@/components/cards/pesanan';
import Link from 'next/link.js';
import { headers } from 'next/headers.js';
import DateCard from '@/components/cards/date';

export default function Pesanan() {
    const orders: DaftarPesanan[] | undefined = PesananDummy;
    const header = headers();
    const pathname = header.get("x-current-params");
    const dateString = pathname!.split("=")[1]
    const date = new Date(dateString);
    return (
        <div className=' h-full flex flex-col'>
            <div className={`h-full overflow-auto p-5 space-y-5 ${orders ? "space-y-2" : "flex items-center justify-center"}`}>
                <DateCard date={date}>
                    Menampilkan daftar pesanan untuk hari
                </DateCard>
                {orders ? orders.map((pesanan, index) => {
                    return <PesananCard data={pesanan} pesanan_no={index + 1} />
                }) : (
                    <p className='opacity-50 text-center'>
                        Belum ada pesanan yang ditambahkan.
                        Tambah pesanan baru menggunakan tombol "Pesanan baru"
                        di bawah.
                    </p>
                )}
            </div>
            <div className='flex items-center justify-center p-5'>
                <Link href={{ pathname: "/data_harian/daftar_pesanan/pesanan_baru", query: { date: dateString } }} className='w-full'>
                    <button className='bg-green-400 p-3 w-full font-bold rounded-lg active:scale-90 transition-all'>
                        Pesanan baru
                    </button>
                </Link>
            </div>
        </div>
    )
}
