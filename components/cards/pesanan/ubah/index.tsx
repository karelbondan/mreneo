import CustomPopup from '@/components/popup';
import { PopupHandle, UbahPesananCardProps } from '@/types/common'
import { formatHarga } from '@/utils/commonfunc';
import React, { useRef, useState } from 'react'

export default function UbahPesananCard(props: UbahPesananCardProps) {
    const { data } = props;
    const [jumlah, setjumlah] = useState(data.jumlah);
    const [spinnerVisible, setspinnerVisible] = useState(false);
    const deleteConfirmation = useRef<PopupHandle>(null);
    return (
        <div>
            <CustomPopup
                title='Hapus makanan?'
                positiveButtonTitle='Hapus'
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
                        <div className='relative flex items-center space-x-2'>
                            <div onClick={() => setspinnerVisible(false)}
                                className={`${spinnerVisible ? "visible" : "invisible"} fixed top-0 left-0 w-full h-full z-10 transition-all`} />
                            <div className={`${spinnerVisible ? "visible opacity-100 translate-y-1" : "invisible opacity-0 translate-y-0"} absolute top-full right-0 w-fit flex p-2 bg-white rounded-lg z-20 transition-all`}>
                                {/* selama lebih dari 1 bisa dikurang, selain itu biarin aja */}
                                <button onClick={() => { setjumlah(jumlah > 1 ? jumlah - 1 : jumlah) }} className='size-10 border bg-white active:bg-gray-200 transition-all'>-</button>
                                {/* tambah jumlah makanan */}
                                <button onClick={() => { setjumlah(jumlah + 1) }} className='size-10 border border-l-0 bg-white active:bg-gray-200 transition-all'>+</button>
                            </div>
                            <p className='text-xl'>×</p>
                            <input
                                type='number'
                                min={1}
                                value={jumlah}
                                onChange={(e) => setjumlah(parseInt(e.target.value))}
                                onClick={() => setspinnerVisible(true)}
                                className={`${spinnerVisible ? "z-30" : "z-0"} w-10 h-9 text-center rounded-lg`}
                            />
                        </div>
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
