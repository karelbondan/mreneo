import { PopupHandle, TambahBarangPopupProps } from '@/types/popup'
import React, { forwardRef, useEffect, useState } from 'react'
import CustomPopup from '.'
import { dataBarangInit } from '@/utils/declarations';
import SpinnerInput from '../input/spinner';
import { formatHarga } from '@/utils/commonfunc';

const TambahBarangPopup = forwardRef<PopupHandle, TambahBarangPopupProps>((props, ref) => {
    const [dataBarang, setdataBarang] = useState(dataBarangInit);
    const [hargaTotal, sethargaTotal] = useState("0");

    function onSubmit() {
        const anyEmpty = Object.values(dataBarang).some(val => val === "" || val === 0);
        if (anyEmpty) {
            return;
        } else {
            props.onPositiveClick?.(dataBarang);
            setdataBarang(dataBarangInit);
        }
    }

    useEffect(() => {
        console.log(Number.isNaN(dataBarang.jumlah));
        if (!Number.isNaN(dataBarang.harga) && !Number.isNaN(dataBarang.jumlah)) {
            sethargaTotal(formatHarga(dataBarang.jumlah * (dataBarang.harga as number)));
        } else {
            sethargaTotal("0");
        }
    }, [dataBarang.harga, dataBarang.jumlah])


    const inputStyle = 'w-full border border-black/20 rounded-lg p-2 mt-1';
    const spacerStyle = 'border-black/0 h-3';
    const innerContainerStyle = 'grid grid-cols-[40%_60%] items-center';

    return (
        <CustomPopup
            title='Tambahkan barang'
            positiveButtonTitle='Tambahkan'
            negativeButtonTitle='Batal'
            onPositiveClick={onSubmit}
            onNegativeClick={props.onNegativeClick}
            ref={ref}
            dismissOnOptionClick={false}
        >
            <div className='py-3'>
                <div className={innerContainerStyle}>
                    <p>Nama barang</p>
                    <input
                        type='text'
                        placeholder='Tulis nama barang'
                        className={inputStyle}
                        value={dataBarang.nama_barang}
                        onChange={(e) => setdataBarang({ ...dataBarang, nama_barang: e.target.value })} />
                </div>
                <hr className={spacerStyle} />
                <div className={innerContainerStyle}>
                    <p>Harga satuan</p>
                    <div className='flex items-center gap-2'>
                        <p>Rp</p>
                        <input
                            type='number'
                            min={1}
                            placeholder='Masukkan harga'
                            className={inputStyle}
                            value={dataBarang.harga}
                            onChange={(e) => setdataBarang({ ...dataBarang, harga: parseInt(e.target.value) })} />
                    </div>
                </div>
                <hr className={spacerStyle} />
                <div className={innerContainerStyle}>
                    <p>Jumlah</p>
                    <SpinnerInput
                        jumlah={dataBarang.jumlah}
                        className='border border-black/20 w-full py-5'
                        spinnerClassName='border border-black/20'
                        onChange={(value: number) => setdataBarang({ ...dataBarang, jumlah: value })}
                    />
                </div>
                <hr className={spacerStyle} />
                <div className={`${innerContainerStyle} mt-1`}>
                    <p>Harga total</p>
                    <p>Rp{hargaTotal}</p>
                </div>
                <hr className={spacerStyle} />
                <div className={innerContainerStyle}>
                    <p>Keterangan</p>
                    <textarea
                        className={inputStyle}
                        value={dataBarang.keterangan}
                        onChange={(e) => setdataBarang({ ...dataBarang, keterangan: e.target.value })}
                        placeholder='5 kg, 2 karung, 1 buah, dll'
                    />
                </div>
            </div>
        </CustomPopup>
    )
})

export default TambahBarangPopup