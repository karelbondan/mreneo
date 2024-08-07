import React from 'react'
import PesananDummy from "./dummy_data/daftar_pesanan_customer.js"
import { DaftarPesanan } from '@/types/common';
import PesananCard from '@/components/cards/pesanan';
import Link from 'next/link.js';

export default function Pesanan() {
    const orders: DaftarPesanan[] | undefined = PesananDummy;
    return (
        <div className=' h-full flex flex-col'>
            <div className={`h-full border overflow-auto p-5 space-y-5 ${orders ? "space-y-2" : "flex items-center justify-center"}`}>
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
                <Link href={"/data_harian/daftar_pesanan/pesanan_baru"} className='w-full'>
                    <button className='bg-green-400 p-3 w-full font-bold rounded-lg active:scale-90 transition-all'>
                        Pesanan baru
                    </button>
                </Link>
            </div>
        </div>
    )
}
