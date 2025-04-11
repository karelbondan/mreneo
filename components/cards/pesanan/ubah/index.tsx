import SpinnerInput from '@/components/input/spinner';
import CustomPopup from '@/components/popup';
import { UbahPesananCardProps } from '@/types/card';
import { PopupHandle } from '@/types/popup';
import { formatHarga } from '@/utils/commonfunc';
import React, { useEffect, useRef, useState } from 'react'

export default function UbahPesananCard(props: UbahPesananCardProps) {
    const { data } = props;
    const [jumlah, setjumlah] = useState(data.jumlah);
    const deleteConfirmation = useRef<PopupHandle>(null);

    useEffect(() => {
        props.onAmountChange?.(jumlah);
    }, [jumlah]);

    return (
        <div>
            <CustomPopup
                title='Hapus makanan?'
                positiveButtonTitle='Hapus'
                onPositiveClick={props.onDeleteClick}
                negativeButtonTitle='Tunggu dulu'
                ref={deleteConfirmation}
            >
                <p>Yakin ingin menghapus {jumlah} × {data.nama_makanan} dari pesanan ini?</p>
            </CustomPopup>
            <div className='bg-blue-200 p-4 rounded-lg flex items-center space-x-5'>
                <button className='bg-blue-100 rounded-lg px-3 py-2 my-1 flex flex-col items-center justify-center active:scale-90 transition-all'
                    onClick={() => deleteConfirmation.current?.show()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <p className='text-xs'>Hapus</p>
                </button>
                <div className='w-full space-y-1'>
                    <div className='flex items-center justify-between space-x-3'>
                        <h2 className='font-semibold text-lg'>{data.nama_makanan}</h2>
                        <SpinnerInput jumlah={jumlah} setJumlah={setjumlah} />
                    </div>
                    <hr className='border-black/20' />
                    <div className='flex justify-between'>
                        <p>Harga satuan</p>
                        <p>Rp{formatHarga(data.harga)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Harga total (×{jumlah})</p>
                        <p>Rp{formatHarga(data.harga * jumlah)}</p>
                    </div>
                </div>
            </div>
        </ div>

    )
}
