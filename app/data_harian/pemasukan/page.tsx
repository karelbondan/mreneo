import { DaftarPesanan, PemasukanData } from '@/types/common';
import React from 'react'
import daftar_pesanan_customer from '../daftar_pesanan/dummy_data/daftar_pesanan_customer';
import Link from 'next/link';
import { formatHarga } from '@/utils/commonfunc';

export default function PemasukanPage() {
  const pemasukan: DaftarPesanan[] = daftar_pesanan_customer;
  const data: PemasukanData = {};
  const dataTotal = {
    total_harga: 0,
    total_porsi_terjual: 0
  }
  pemasukan.map(pesanan => {
    pesanan.pesanan.map(makanan => {
      data[makanan.identifier] = {
        nama_makanan: makanan.nama_makanan,
        harga: makanan.harga,
        jumlah: (data[makanan.identifier]?.jumlah ?? 0) + makanan.jumlah
      };
      dataTotal.total_porsi_terjual += makanan.jumlah;
      dataTotal.total_harga += makanan.harga * makanan.jumlah;
    })
  })

  const headerStyle = 'border-black/20 border-l-0 py-3 font-semibold flex items-center justify-center text-center bg-blue-200';

  return (
    <div>
      <p className='m-4 p-3 bg-purple-200 rounded-lg'>
        Semua data (termasuk harga) tertera berdasarkan input tanggal <strong>{
          new Date(pemasukan[0].date).toLocaleString("id-ID").replaceAll(".", ":")
        }</strong>
      </p>
      <div className='mx-4 border-black/20 overflow-auto'>
        <div className='grid grid-cols-[40%_20%_30%_30%] phone:grid-cols-[40%_20%_20%_20%] sticky top-0 bg-blue-200 rounded-t-lg'>
          <p className='border-black/20 p-1 font-semibold flex items-center justify-center text-center'>Makanan</p>
          <p className={headerStyle}>Jumlah</p>
          <p className={headerStyle}>Harga</p>
          <p className={`${headerStyle} rounded-tr-lg`}>Harga total</p>
        </div>
        {Object.keys(data).map((id, index) => {
          const current = data[id];
          const length = Object.keys(data).length - 1;
          const style = `border-l border-b border-black/0 p-2 h-full ${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}`;
          return <div className={`grid grid-cols-[40%_20%_30%_30%] phone:grid-cols-[40%_20%_20%_20%] items-center`}>
            <p className={`${style} ${index === length ? "rounded-bl-lg" : ""}`}>{current.nama_makanan}</p>
            <p className={style}>{current.jumlah}</p>
            <p className={style}>Rp{formatHarga(current.harga)}</p>
            <p className={`${style} ${index === length ? "rounded-br-lg" : ""}`}>Rp{formatHarga(current.harga * current.jumlah)}</p>
          </div>
        })}
      </div>
      <div className='bg-green-200 rounded-lg m-4 p-3 space-y-2'>
        <div className='font-semibold flex justify-between items-center gap-10'>
          <p>Total porsi terjual (semua makanan)</p>
          <p className='min-w-fit'>{dataTotal.total_porsi_terjual} porsi</p>
        </div>
        <hr className='border-black/20' />
        <div className='font-semibold flex justify-between'>
          <p>Total pemasukan (kotor)</p>
          <p>Rp{formatHarga(dataTotal.total_harga)}</p>
        </div>
      </div>
      <div className='flex p-3 mx-4 bg-purple-200 rounded-lg mb-5'>
        <p>Ingin melihat detail untuk setiap makanan yang terjual? Silakan buka halaman{" "}
          <Link href={{
            pathname: "/data_harian/daftar_pesanan/",
            query: {
              redirect: "/data_harian/daftar_pesanan/pemasukan"
            }
          }}><button className='underline'>daftar pesanan.</button>
          </Link>
        </p>
      </div>
    </div>
  )
}
