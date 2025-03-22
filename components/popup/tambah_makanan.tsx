import React, { forwardRef, useEffect, useRef, useState } from 'react'
import CustomPopup from '.'
import CustomDropdown from '../input/dropdown'
import SpinnerInput from '../input/spinner'
import { formatHarga } from '@/utils/commonfunc'
import pilihanMakanan from "./dummy_data/pilihan_makanan"
import { dataMakananInit, dataPesananInit } from '@/utils/declarations'
import { PopupHandle, TambahMakananPopupProps } from '@/types/popup'
import { DataPesanan, MakananData } from '@/types/common'

const TambahMakananPopup = forwardRef<PopupHandle, TambahMakananPopupProps>((props, ref) => {
    const pilihan: MakananData[] = pilihanMakanan;
    const [jumlah, setjumlah] = useState(1);
    const [makananData, setmakananData] = useState<MakananData>(dataMakananInit);
    const [dataPesanan, setdataPesanan] = useState<DataPesanan>(dataPesananInit);

    useEffect(() => {
        const { _id } = makananData;
        setdataPesanan({ id: _id, jumlah: jumlah, ...makananData });
    }, [jumlah, makananData])

    function reset() {
        setmakananData(dataMakananInit);
        setdataPesanan(dataPesananInit);
        setjumlah(1);
    }

    return (
        <CustomPopup
            title='Tambah makanan'
            positiveButtonTitle='Tambah'
            negativeButtonTitle='Batal'
            onPositiveClick={() => { props.onPositiveClick?.(dataPesanan); reset(); }}
            onNegativeClick={props.onNegativeClick}
            ref={ref}
            dismissOnOptionClick={false}
        >
            <div className='grid grid-cols-2 items-center pt-1'>
                <p className='min-w-fit pr-1'>Pilih makanan</p>
                <CustomDropdown
                    pilihanString={pilihan.map(makanan => makanan.nama_makanan)}
                    pilihan={pilihan}
                    title='Pilih makanan'
                    value={makananData.nama_makanan}
                    onChange={(value: MakananData) => { setmakananData(value); }}
                />
            </div>
            <div className='grid grid-cols-2 items-center py-1'>
                <p className='min-w-fit pr-1'>Harga</p>
                <p>Rp{formatHarga(makananData.harga)}</p>
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
                <p>Rp{formatHarga(makananData.harga * jumlah)}</p>
            </div>
        </CustomPopup>
    )
})

export default TambahMakananPopup;