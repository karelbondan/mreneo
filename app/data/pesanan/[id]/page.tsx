'use client'
import React, { useEffect, useRef, useState } from 'react'
import { DaftarPesanan, DataPesanan } from '@/types/common';
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import { FSDropdown } from '@/components/input/dropdown';
import { PopupHandle, setPesanan } from '@/types/popup';
import { useParams, useRouter } from 'next/navigation';
import { getCurrentDateISO } from '@/utils/commonfunc';
import { OrderData } from '@/utils/declarations';
import HapusPesananPopup from '@/components/popup/order/delete';
import TambahMakananPopup from '@/components/popup/food/add';
import MakananSudahAdaPopup from '@/components/popup/food/exists';
import BatalUbahPopup from '@/components/popup/changes/cancel';
import SimpanPerubahanPopup from '@/components/popup/changes/save';

export default function UbahPesanan() {
  const { id } = useParams();
  const orderIndex: { [key: string]: number } = {};
  const router = useRouter();
  const [orderData, setOrderData] = useState<DaftarPesanan>();
  const [foodExist, setFoodExist] = useState<DataPesanan>({ ... new OrderData() });

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
    if (data.harga < 1) { alert("Please enter a correct food amount"); return; }
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

  async function doSave() {
    // TODO
    /**
     * 1. loading start
     * 2. separate into utils
     */
    // FIXME date modified is supposed to be gotten from the frontend, 
    // passed from the previous page.
    await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pesanan/update/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...orderData, modified_date: getCurrentDateISO()
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
    // loading end
  }

  async function doDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pesanan/delete/${id}`, {
      method: "DELETE"
    }).then(async res => {
      let parsed = await res.json();
      if (!res.ok) {
        throw parsed;
      }
      return parsed;
    }).then(res => console.log(res));
    router.back();
  }

  const dialogCancel = useRef<PopupHandle>(null);
  const dialogDelete = useRef<PopupHandle>(null);
  const dialogConfirm = useRef<PopupHandle>(null);
  const dialogFoodAdd = useRef<PopupHandle>(null);
  const dialogFoodExt = useRef<PopupHandle>(null);

  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <SimpanPerubahanPopup
        onPositiveClick={() => doSave()}
        ref={dialogConfirm} />
      <BatalUbahPopup
        onPositiveClick={() => router.back()}
        ref={dialogCancel} />
      <HapusPesananPopup
        onPositiveClick={() => doDelete()}
        ref={dialogDelete} />
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
            <FSDropdown title='Pilih metode pembayaran'
              value={orderData.metode_pembayaran}
              labelLoc='left'
              selections={[{ title: "Cash" }, { title: "QRIS" }]}
              selectionKey='title'
              onValueChange={(v: { title: string }) => { setOrderData({ ...orderData, metode_pembayaran: v.title }) }}
            />
          </div>
        </div>
        <hr className='border-black/20' />
        {orderData.pesanan.map((makanan, idx) => {
          orderIndex[makanan.id] = idx;
          return <UbahPesananCard
            key={makanan.id + idx}
            data={makanan}
            foodNo={idx}
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
