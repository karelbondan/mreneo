'use client'
import React, { useRef } from 'react'
import EditPesananData from '../dummy_data/edit_pesanan'
import { DaftarPesanan, PopupHandle } from '@/types/common';
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import CustomDropdown from '@/components/dropdown';
import CustomPopup from '@/components/popup';

export default function UbahPesanan() {
  // TODO: ubah ini jadi get data dari database (pake usestate sama useeffect)
  const data: DaftarPesanan = EditPesananData;
  // let pesanan = data.pesanan;
  const confirmationDialog = useRef<PopupHandle>(null);
  const cancellationDialog = useRef<PopupHandle>(null);
  const deletionDialog = useRef<PopupHandle>(null);
  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <CustomPopup
        title='Simpan perubahan?'
        positiveButtonTitle='Simpan'
        onPositiveClick={() => { }}
        negativeButtonTitle='Tunggu dulu'
        ref={confirmationDialog}
      >
        <p>Simpan perubahan data pada pesanan ini ke database?</p>
      </CustomPopup>
      <CustomPopup
        title='Batalkan perubahan?'
        positiveButtonTitle='OK'
        negativeButtonTitle='Tunggu dulu'
        ref={cancellationDialog}
      >
        <p>Yakin ingin membatalkan? Data-data yang telah diubah pada pesanan ini tidak akan disimpan ke database.</p>
      </CustomPopup>
      <CustomPopup
        title='Hapus pesanan ini?'
        positiveButtonTitle='Ya, hapus'
        negativeButtonTitle='Tunggu dulu'
        ref={deletionDialog}
      >
        <p className='pr-10'>Pesanan ini beserta datanya akan dihapus dari database dan tidak akan bisa dikembalikan lagi. Yakin ingin melanjutkan?</p>
      </CustomPopup>
      {/* main page */}
      <div className='h-full p-4 space-y-2 overflow-auto'>
        <h2 className='font-bold text-lg'>Pesanan no. 2</h2>
        <div className='flex items-center justify-between'>
          <p>Metode pembayaran</p>
          <div className='w-2/5'>
            <CustomDropdown title='Pilih metode pembayaran'
              pilihan={["1", "2"]} />
          </div>
        </div>
        <hr className='border-black/20' />
        {data.pesanan.map((makanan, nomor) => {
          return <UbahPesananCard
            data={makanan}
            makanan_no={nomor + 1} />
        })}
        <hr className='border-transparent h-2' />
        <button className='w-full bg-green-400 font-semibold rounded-lg active:scale-95 transition-all p-3'>
          Tambah makanan
        </button>
        <div className='flex gap-2'>
          <button
            onClick={() => cancellationDialog.current?.show()}
            className='w-full bg-blue-200 p-3 rounded-lg active:scale-90 transition-all'>
            Batal
          </button>
          <button className='w-full bg-green-400 p-3 rounded-lg active:scale-90 transition-all font-bold'
            onClick={() => confirmationDialog.current?.show()}
          >
            Simpan
          </button>
        </div>
        <button
          onClick={() => deletionDialog.current?.show()}
          className='w-full bg-red-300 rounded-lg active:scale-95 transition-all p-3'>
          Hapus pesanan
        </button>
        <hr className='border-transparent' />
      </div>
    </div>
  )
}
