'use client'
import React, { useRef, useState } from 'react'
import EditPesananData from '../dummy_data/edit_pesanan'
import { DaftarPesanan, DataPesanan, PopupHandle, setPesanan } from '@/types/common';
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import CustomDropdown from '@/components/dropdown';
import TambahMakananPopup from '@/components/popup/tambah_makanan';
import SimpanPerubahanPopup from '@/components/popup/simpan_perubahan';
import BatalUbahPopup from '@/components/popup/batal_ubah';
import HapusPesananPopup from '@/components/popup/hapus_pesanan';

export default function UbahPesanan() {
  // TODO: ubah ini jadi get data dari database (pake usestate sama useeffect)
  const data: DaftarPesanan = EditPesananData;
  // const [pesanan, setpesanan] = useState<DataPesanan[]>(data.pesanan);
  const [dataPesanan, setdataPesanan] = useState<DaftarPesanan>(data);

  function setPesanan({ index, data, action }: setPesanan) {
    let updatedData: DataPesanan[];
    if (action == "update")
      updatedData = dataPesanan.pesanan.map((m, i) => i === index ? data! : m);
    else
      updatedData = dataPesanan.pesanan.filter((m, i) => i !== index);
    setdataPesanan({ ...dataPesanan, pesanan: updatedData })
  }

  const confirmationDialog = useRef<PopupHandle>(null);
  const cancellationDialog = useRef<PopupHandle>(null);
  const deletionDialog = useRef<PopupHandle>(null);
  const tambahMakananDialog = useRef<PopupHandle>(null);

  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <SimpanPerubahanPopup ref={confirmationDialog} />
      <BatalUbahPopup ref={cancellationDialog} />
      <HapusPesananPopup ref={deletionDialog} />
      <TambahMakananPopup setPesanan={setPesanan} ref={tambahMakananDialog} />
      {/* main page */}
      <div className='h-full p-4 space-y-2 overflow-auto'>
        <h2 className='font-bold text-lg'>Pesanan no. 2</h2>
        <div className='flex items-center justify-between'>
          <p>Metode pembayaran</p>
          <div className='w-2/5'>
            <CustomDropdown title='Pilih metode pembayaran'
              pilihan={["Cash", "QRIS"]}
              onChange={(val) => setdataPesanan({ ...dataPesanan, metode_pembayaran: val })}
            />
          </div>
        </div>
        <hr className='border-black/20' />
        {dataPesanan.pesanan.map((makanan, nomor) => {
          return <UbahPesananCard
            data={makanan}
            makanan_no={nomor + 1} />
        })}
        <hr className='border-transparent h-2' />
        <button
          onClick={() => tambahMakananDialog.current?.show()}
          className='w-full bg-green-400 font-semibold rounded-lg active:scale-95 transition-all p-3'>
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
