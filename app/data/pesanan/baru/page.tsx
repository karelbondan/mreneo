'use client'
import DateCard from '@/components/cards/date';
import UbahPesananCard from '@/components/cards/pesanan/ubah';
import { FSDropdown } from '@/components/input/dropdown';
import BatalUbahPopup from '@/components/popup/changes/cancel';
import SimpanPerubahanPopup from '@/components/popup/changes/save';
import TambahMakananPopup from '@/components/popup/food/add';
import MakananSudahAdaPopup from '@/components/popup/food/exists';
import { DaftarPesanan, DataPesanan } from '@/types/common';
import { PopupHandle, setPesanan } from '@/types/popup';
import { Order, OrderData } from '@/utils/declarations';
import { useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react'

export default function PesananBaru() {
  const dialogSave = useRef<PopupHandle>(null);
  const dialogCancel = useRef<PopupHandle>(null);
  const dialogFoodAdd = useRef<PopupHandle>(null);
  const dialogFoodExt = useRef<PopupHandle>(null);
  const orderIndex: { [key: string]: number } = {};
  const params = useSearchParams();
  const [foodExists, setFoodExists] = useState<DataPesanan>({ ...new OrderData() });
  const [order, setOrder] = useState<DaftarPesanan>({ ...new Order("yulia", params.get("date")!) });

  function doAdd(v: DataPesanan) {
    // && !parent -> for compliments 
    if (v.harga < 1) { alert("Please enter a correct food amount"); return; }
    const idx = orderIndex[v.id];
    if (idx) {
      setFoodExists(v);
      dialogFoodExt.current?.show();
    } else {
      doUpdate({ idx, op: "add", add: v });
      dialogFoodAdd.current?.hide();
    }
  }

  function doUpdate({ idx, op, add }: setPesanan) {
    let upd = order.pesanan;
    if (op === "add") {
      upd.push(add!);
    } else {
      upd.splice(idx, 1);
    }
    setOrder({ ...order, pesanan: upd });
  }

  function doSave() {
    if (order.pesanan.length < 1) { alert("You need to add at least 1 food to the order."); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/pesanan/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(res => { console.log(res); alert(JSON.stringify(res)); })
      .catch(err => console.log(err));
  }

  return (
    <div className='flex flex-col h-full'>
      {/* popup declarations */}
      <SimpanPerubahanPopup onPositiveClick={doSave} ref={dialogSave} />
      <BatalUbahPopup ref={dialogCancel} />
      <TambahMakananPopup
        onPositiveClick={(v: DataPesanan) => doAdd(v)}
        onNegativeClick={() => dialogFoodAdd.current?.hide()}
        ref={dialogFoodAdd} />
      {/* from here i learned that the rendering system of HTML is similar to Unity.
      The HTML elements in the lower hierarchy will be rendered on top of the upper ones. */}
      <MakananSudahAdaPopup
        namaMakanan={foodExists.nama_makanan}
        ref={dialogFoodExt} />
      {/* main page */}
      <div className='h-full p-4 space-y-2 overflow-auto'>
        <div className='mb-4'>
          <DateCard date={new Date(params.get("date")!)}>
            Memasukkan dan menampilkan data untuk hari
          </DateCard>
        </div>
        <hr className='border-black/20' />
        <p className='font-bold text-lg'>Pesanan baru</p>
        <div className='flex items-center justify-between'>
          <p>Metode pembayaran</p>
          <div className='w-2/5'>
            <FSDropdown title='Pilih metode pembayaran'
              value={order.metode_pembayaran}
              labelLoc='left'
              selections={[{ title: "Cash" }, { title: "QRIS" }]}
              selectionKey='title'
              onValueChange={(v: { title: string }) => { setOrder({ ...order, metode_pembayaran: v.title }) }}
            />
          </div>
        </div>
        <hr className='border-black/20' />
        {order.pesanan.length > 0 ?
          order.pesanan.map((makanan, index) => {
            orderIndex[makanan.id] = index;
            return <UbahPesananCard
              key={makanan.id + index}
              data={makanan}
              foodNo={index + 1}
              onDeleteClick={() => doUpdate({ idx: index, op: "del" })}
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
            onClick={() => dialogSave.current?.show()}
          >
            Simpan
          </button>
        </div>
        <hr className='border-transparent' />
      </div>
    </div>
  )
}
