'use client'
import TambahBarangPopup from '@/components/popup/tambah_barang';
import { DataPengeluaran } from '@/types/common';
import { PopupHandle } from '@/types/popup';
import React, { useRef, useState } from 'react'

export default function PengeluaranPage() {
    const [dataPengeluaran, setdataPengeluaran] = useState<DataPengeluaran[]>([]);
    const tambahBarangPopup = useRef<PopupHandle>(null);

    // null check has been done in the component, 
    // no need to do it again here
    function onPositiveClick(value: DataPengeluaran) {
        tambahBarangPopup.current?.hide();
        setdataPengeluaran([...dataPengeluaran, value]);
    }

    function onDelete(index: number) {
        setdataPengeluaran(dataPengeluaran.filter((x, i) => i !== index));
    }

    return (
        <div className='p-4 space-y-3'>
            <TambahBarangPopup
                ref={tambahBarangPopup}
                onPositiveClick={onPositiveClick}
                onNegativeClick={() => tambahBarangPopup.current?.hide()} />
            <input type='text' className='border w-full' placeholder='search' />
            <div>
                {dataPengeluaran.length > 0 ?
                    dataPengeluaran.map((barang, index) =>
                        <div className='flex'>
                            {barang.nama_barang}
                            <button
                                onClick={() => onDelete(index)}
                                className='bg-gray-200 px-2'>delete</button>
                        </div>
                    ) :
                    <p className='text-center opacity-50 px-3 py-10'>
                        Belum ada barang yang ditambahkan untuk pengeluaran hari ini.
                        Tambahkan barang dengan menekan tombol di bawah.
                    </p>}
            </div>
            <button
                onClick={() => tambahBarangPopup.current?.show()}
                className='w-full p-3 bg-green-400 font-bold rounded-lg active:scale-90 transition-all'>
                Tambahkan barang
            </button>
        </div>
    )
}
