'use client'
import TimeCard from '@/components/cards/time';
import CustomPopup from '@/components/popup';
import SimpanPerubahanPopup from '@/components/popup/simpan_perubahan';
import TambahBarangPopup from '@/components/popup/tambah_barang';
import { DataPengeluaran } from '@/types/common';
import { PopupHandle } from '@/types/popup';
import { formatHarga } from '@/utils/commonfunc';
import React, { useRef, useState } from 'react'

export default function PengeluaranPage() {
    const [dataPengeluaran, setdataPengeluaran] = useState<DataPengeluaran[]>([]);
    const [barangDihapus, setbarangDihapus] = useState({ nama_barang: "", index: 0 });

    const tambahBarangPopup = useRef<PopupHandle>(null);
    const hapusBelanjaanPopup = useRef<PopupHandle>(null);
    const simpanPopup = useRef<PopupHandle>(null);

    // null check has been done in the component, 
    // no need to do it again here
    function tambahBarang(value: DataPengeluaran) {
        tambahBarangPopup.current?.hide();
        setdataPengeluaran([...dataPengeluaran, value]);
    }

    function deleteConfirmation(index: number, nama_barang: string) {
        setbarangDihapus({ index: index, nama_barang: nama_barang });
        hapusBelanjaanPopup.current?.show();
    }

    function onDelete(index: number) {
        setdataPengeluaran(dataPengeluaran.filter((x, i) => i !== index));
    }

    const headerStyle = "px-3 py-4 whitespace-nowrap";
    const rowStyle = "px-3 py-3 text-center";

    return (
        <div className='p-4'>
            <TambahBarangPopup
                ref={tambahBarangPopup}
                onPositiveClick={tambahBarang}
                onNegativeClick={() => tambahBarangPopup.current?.hide()} />
            <CustomPopup
                title='Hapus belanjaan?'
                positiveButtonTitle='Hapus'
                negativeButtonTitle='Tunggu dulu'
                onPositiveClick={() => onDelete(barangDihapus.index)}
                ref={hapusBelanjaanPopup}
            >
                <p>Yakin ingin menghapus &apos;{barangDihapus.nama_barang}&apos; dari daftar belanja hari ini?</p>
            </CustomPopup>
            <SimpanPerubahanPopup
                ref={simpanPopup}
            />
            <div className='space-y-4'>
                <TimeCard />
                {dataPengeluaran.length > 0 && (
                    <p className='p-3 bg-purple-200 rounded-lg'>
                        <strong>Tip</strong>: Tabel bisa digeser ke kanan/kiri untuk melihat detail lebih banyak.
                    </p>
                )}
                {dataPengeluaran.length > 0 ? (
                    <div className='overflow-x-auto'>
                        <table className='w-full border-spacing-0 rounded-lg overflow-hidden'>
                            <tr className='bg-blue-200'>
                                <th className={headerStyle}>Aksi</th>
                                <th className={headerStyle}>Nama barang</th>
                                <th className={headerStyle}>Jumlah</th>
                                <th className={headerStyle}>Harga</th>
                                <th className={headerStyle}>Harga total</th>
                                <th className={headerStyle}>Keterangan</th>
                            </tr>
                            {dataPengeluaran.map((barang, index) =>
                                <tr className={`${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}`}>
                                    <td className={rowStyle}>
                                        <button className='p-2 bg-blue-300 rounded-lg'
                                            onClick={() => deleteConfirmation(index, barang.nama_barang)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className={rowStyle}>{barang.nama_barang}</td>
                                    <td className={rowStyle}>{barang.jumlah}</td>
                                    <td className={rowStyle}>Rp{formatHarga(barang.harga as number)}</td>
                                    <td className={rowStyle}>Rp{formatHarga(barang.jumlah * (barang.harga as number))}</td>
                                    <td className={rowStyle}>{barang.keterangan}</td>
                                </tr>
                            )}
                        </table>
                    </div>
                ) : (
                    <p className='text-center opacity-50 px-3 py-10'>
                        Belum ada barang yang ditambahkan untuk pengeluaran hari ini.
                        Tambahkan barang dengan menekan tombol di bawah.
                    </p>
                )}
                <div className={`grid ${dataPengeluaran.length > 0 ? "grid-cols-2 gap-3" : "gap-0"}`}>
                    <button
                        onClick={() => tambahBarangPopup.current?.show()}
                        className='w-full py-3 px-1 bg-green-400 font-bold rounded-lg active:scale-90 transition-all'>
                        Tambahkan barang
                    </button>
                    {dataPengeluaran.length > 0 && (
                        <button
                            onClick={() => simpanPopup.current?.show()}
                            className='w-full py-3 px-1 bg-blue-300 font-bold rounded-lg active:scale-90 transition-all'>
                            Simpan ke database
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
