'use client'
import React, { useEffect, useRef, useState } from 'react'
import { DaftarPesanan, DataPesanan } from '@/types/common';
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import CustomDropdown from '@/components/input/dropdown';
import TambahMakananPopup from '@/components/popup/tambah_makanan';
import SimpanPerubahanPopup from '@/components/popup/simpan_perubahan';
import BatalUbahPopup from '@/components/popup/batal_ubah';
import HapusPesananPopup from '@/components/popup/hapus_pesanan';
import { PopupHandle, setPesanan } from '@/types/popup';
import { useParams } from 'next/navigation';
import MakananSudahAdaPopup from '@/components/popup/makanan_sudah_ada';
import { dataPesananInit } from '@/utils/declarations';

export default function UbahPesanan() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<DaftarPesanan>();
  const [foodExist, setFoodExist] = useState<DataPesanan>(dataPesananInit);
  const orderIndex: { [key: string]: number } = {};

  useEffect(() => {
    function getData() {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/pesanan/get/${id}`)
        .then(res => res.json())
        .then((res: DaftarPesanan) => {
          setOrderData(res);
        });
    }
    getData();
  }, [])

  function doAdd(data: DataPesanan) {
    const idx = orderIndex[data.id];
    if (idx) {
      setFoodExist(data);
      dialogFoodExt.current?.show();
    } else {
      doUpdate({ idx: idx, op: 'add', add: data }); // idx is not used here
    }
    dialogFoodAdd.current?.hide();
  }

  function doUpdate({ idx, op, put, add }: setPesanan) {
    let update = orderData!.pesanan;
    if (op === 'add') {
      update.push(add!);
    } else if (op === 'put') {
      update[idx].jumlah = put!;
    } else {
      update.splice(idx, 1);
    }
    setOrderData({ ...orderData!, pesanan: update });
  }

  const dialogCancel = useRef<PopupHandle>(null);
  const dialogDelete = useRef<PopupHandle>(null);
  const dialogConfirm = useRef<PopupHandle>(null);
  const dialogFoodAdd = useRef<PopupHandle>(null);
  const dialogFoodExt = useRef<PopupHandle>(null);

  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <SimpanPerubahanPopup ref={dialogConfirm} />
      <BatalUbahPopup ref={dialogCancel} />
      <HapusPesananPopup ref={dialogDelete} />
      <TambahMakananPopup
        onNegativeClick={() => dialogFoodAdd.current?.hide()}
        onPositiveClick={(val: DataPesanan) => doAdd(val)}
        ref={dialogFoodAdd} />
      <MakananSudahAdaPopup
        namaMakanan={foodExist!.nama_makanan}
        ref={dialogFoodExt} />
      {/* main page */}
      {orderData && <div className='h-full p-4 space-y-2 overflow-auto'>
        <h2 className='font-bold text-lg'>Pesanan no. 2</h2>
        <div className='flex items-center justify-between'>
          <p>Metode pembayaran</p>
          <div className='w-2/5'>
            <CustomDropdown title='Pilih metode pembayaran'
              pilihan={["Cash", "QRIS"]}
              pilihanString={["Cash", "QRIS"]}
              value={orderData.metode_pembayaran}
              onChange={(val: string) => setOrderData({ ...orderData, metode_pembayaran: val })}
            />
          </div>
        </div>
        <hr className='border-black/20' />
        {orderData.pesanan.map((makanan, idx) => {
          orderIndex[makanan.id] = idx;
          return <UbahPesananCard
            key={makanan.id + idx}
            data={makanan}
            makanan_no={idx}
            onDeleteClick={() => doUpdate({ idx: idx, op: 'del' })}
            onAmountChange={(amt) => doUpdate({ idx: idx, op: 'put', put: amt })}
          />
        })}
        <hr className='border-transparent h-2' />
        <button
          onClick={() => dialogFoodAdd.current?.show()}
          className='w-full bg-green-400 font-semibold rounded-lg active:scale-95 transition-all p-3'>
          Tambah makanan
        </button>
        <div className='flex gap-2'>
          <button
            onClick={() => dialogCancel.current?.show()}
            className='w-full bg-blue-200 p-3 rounded-lg active:scale-90 transition-all'>
            Batal
          </button>
          <button className='w-full bg-green-400 p-3 rounded-lg active:scale-90 transition-all font-bold'
            onClick={() => dialogConfirm.current?.show()}
          >
            Simpan
          </button>
        </div>
        <button
          onClick={() => dialogDelete.current?.show()}
          className='w-full bg-red-300 rounded-lg active:scale-95 transition-all p-3'>
          Hapus pesanan
        </button>
        <hr className='border-transparent' />
      </div>}
    </div>
  )
}
