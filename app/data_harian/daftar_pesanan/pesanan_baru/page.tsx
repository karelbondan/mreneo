'use client'
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import TimeCard from '@/components/cards/time';
import CustomDropdown from '@/components/input/dropdown';
import CustomPopup from '@/components/popup';
import BatalUbahPopup from '@/components/popup/batal_ubah';
import MakananSudahAdaPopup from '@/components/popup/makanan_sudah_ada';
import SimpanPerubahanPopup from '@/components/popup/simpan_perubahan';
import TambahMakananPopup from '@/components/popup/tambah_makanan';
import { DaftarPesanan, DataPesanan } from '@/types/common';
import { PopupHandle } from '@/types/popup';
import { daftarPesananInit, dataPesananInit } from '@/utils/declarations';
import React, { useRef, useState } from 'react'

export default function PesananBaru() {
  const simpanDialog = useRef<PopupHandle>(null);
  const batalDialog = useRef<PopupHandle>(null);
  const tambahMakananDialog = useRef<PopupHandle>(null);
  const sudahAdaDialog = useRef<PopupHandle>(null);

  const timeNow = new Date();

  const [makananSudahAda, setmakananSudahAda] = useState<DataPesanan>(dataPesananInit);
  const [dataPesanan, setdataPesanan] = useState<DaftarPesanan>({
    ...daftarPesananInit,
    date: timeNow.toISOString(),
  });

  function onPositiveClick(value: DataPesanan) {
    if (value.harga < 1) return;
    const makananSudahAda = dataPesanan.pesanan.some(
      makanan => makanan.id_makanan === value.id_makanan
    );
    if (makananSudahAda) {
      setmakananSudahAda(value);
      sudahAdaDialog.current?.show();
    } else {
      setdataPesanan({
        ...dataPesanan,
        pesanan: [...dataPesanan.pesanan, value]
      })
      tambahMakananDialog.current?.hide();
    }
  }

  function hapusMakanan(yangDihapus: DataPesanan) {
    const updatedPesanan = dataPesanan.pesanan.filter(
      (makanan) => yangDihapus.id_makanan !== makanan.id_makanan
    );
    setdataPesanan({ ...dataPesanan, pesanan: updatedPesanan });
  }

  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <SimpanPerubahanPopup ref={simpanDialog} />
      <BatalUbahPopup ref={batalDialog} />
      <TambahMakananPopup
        onPositiveClick={onPositiveClick}
        onNegativeClick={() => tambahMakananDialog.current?.hide()}
        ref={tambahMakananDialog} />
      {/* from here i learnt that the rendering system of HTML is similar to Unity.
      The HTML elements in the lower hierarchy will be rendered on top of the upper ones. */}
      <MakananSudahAdaPopup
        namaMakanan={makananSudahAda.nama_makanan}
        ref={sudahAdaDialog} />
      {/* main page */}
      <div className='h-full p-4 space-y-2 overflow-auto'>
        <div className='mb-4'>
          <TimeCard />
        </div>
        <hr className='border-black/20' />
        <p className='font-bold text-lg'>Pesanan baru</p>
        <div className='flex items-center justify-between'>
          <p>Metode pembayaran</p>
          <div className='w-2/5'>
            <CustomDropdown
              title='Pilih metode pembayaran'
              pilihan={["Cash", "QRIS"]}
              pilihanString={["Cash", "QRIS"]}
              defaultValue='Cash'
              onChange={(val: string) => setdataPesanan({ ...dataPesanan, metode_pembayaran: val })}
            />
          </div>
        </div>
        <hr className='border-black/20' />
        {dataPesanan.pesanan.length > 0 ?
          dataPesanan.pesanan.map((makanan, index) => {
            return <UbahPesananCard
              data={makanan}
              makanan_no={index + 1}
              onHapusClick={() => hapusMakanan(makanan)}
            />
          }) :
          <p className='text-center py-10 opacity-50'>
            Belum ada makanan yang ditambahkan. Tekan tombol
            <strong>"Tambah makanan"</strong>
            di bawah untuk menambahkan makanan.
          </p>
        }
        <hr className='border-transparent h-2' />
        <button
          onClick={() => tambahMakananDialog.current?.show()}
          className='w-full bg-green-400 font-semibold rounded-lg active:scale-95 transition-all p-3'>
          Tambah makanan
        </button>
        <div className='flex gap-2'>
          <button
            onClick={() => batalDialog.current?.show()}
            className='w-full bg-blue-200 p-3 rounded-lg active:scale-90 transition-all'>
            Batal
          </button>
          <button className='w-full bg-green-400 p-3 rounded-lg active:scale-90 transition-all font-bold'
            onClick={() => simpanDialog.current?.show()}
          >
            Simpan
          </button>
        </div>
        <hr className='border-transparent' />
      </div>
    </div>
  )
}
