import { PopupHandle, TambahMakananPopupProps } from '@/types/common'
import React, { forwardRef, useState } from 'react'
import CustomPopup from '.'
import CustomDropdown from '../dropdown'
import SpinnerInput from '../input/spinner'
import { formatHarga } from '@/utils/commonfunc'

const TambahMakananPopup = forwardRef<PopupHandle, TambahMakananPopupProps>((props, ref) => {
    const pilihan = [
        "makanan 1",
        "makanan 2",
        "makanan 3",
        "makanan 4",
        "makanan 5",
        "makanan 6",
        "makanan 7",
        "makanan 8",
        "makanan 9",
        "makanan 10",
        "makanan 11",
    ]
    const [jumlah, setjumlah] = useState(1);
    const harga = 18000
    return (
        <CustomPopup
            title='Tambah makanan'
            positiveButtonTitle='Tambah'
            negativeButtonTitle='Batal'
            ref={ref}
        >
            <div className='grid grid-cols-2 items-center pt-1'>
                <p className='min-w-fit pr-1'>Pilih makanan</p>
                <CustomDropdown pilihan={pilihan} title='Pilih makanan' />
            </div>
            <div className='grid grid-cols-2 items-center py-1'>
                <p className='min-w-fit pr-1'>Harga</p>
                <p>Rp{formatHarga(harga)}</p>
            </div>
            <div className='grid grid-cols-2 items-center'>
                <p>Jumlah</p>
                <div className='w-full'>
                    <SpinnerInput
                        jumlah={jumlah}
                        setJumlah={setjumlah}
                        className='border border-black/30 rounded-lg w-full py-5'
                        spinnerClassName='border border-black/30' />
                </div>
            </div>
            <div className='grid grid-cols-2 items-center py-1'>
                <p className='min-w-fit pr-1'>Harga total</p>
                <p>Rp{formatHarga(harga * jumlah)}</p>
            </div>
        </CustomPopup>
    )
})

export default TambahMakananPopup;