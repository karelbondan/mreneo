import { PesananCardProps } from '@/types/card';
import { formatHarga } from '@/utils/commonfunc';
import Link from 'next/link';
import React from 'react'

export default function PesananCard(props: PesananCardProps) {
    const { data, pesanan_no } = props;
    return (
        <div className="h-fit bg-blue-200 p-4 rounded-lg space-y-2">
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Pesanan no. {pesanan_no}</h2>
                <Link href={{
                    pathname: "/data_harian/daftar_pesanan/ubah_pesanan",
                    query: {
                        _id: data._id
                    }
                }}>
                    <button className='bg-blue-100 px-4 py-2 flex items-center space-x-2 rounded-lg active:scale-90 transition-all mb-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <p>Edit</p>
                    </button>
                </Link>
            </div>
            <hr className='border-black/20' />
            <div className='flex justify-between font-semibold'>
                <p>Metode pembayaran</p>
                <p>{data.metode_pembayaran}</p>
            </div>
            <hr className='border-black/20' />
            {data.pesanan.map(makanan => {
                return (
                    <div className='flex justify-between space-x-2'>
                        <div className='flex space-x-1 px-1'>
                            <p className='min-w-fit'>- {makanan.jumlah} ×</p>
                            <p>{makanan.nama_makanan}</p>
                        </div>
                        <p>Rp{formatHarga(makanan.harga)}</p>
                    </div>
                )
            })}
            <hr className='border-black/20' />
            <div>
                <div className='flex justify-between font-bold'>
                    <p>Total</p>
                    <p>Rp{formatHarga(data.total_harga)}</p>
                </div>
            </div>
        </div>
    )
}
