import React, { forwardRef, useEffect, useState } from 'react'
import { formatHarga } from '@/utils/commonfunc'
import { PopupHandle, TambahMakananPopupProps } from '@/types/popup'
import { DataPesanan, MenuAttributes, MenuSelectionAttributes } from '@/types/common'
import { FSDropdown } from '@/components/input/dropdown'
import SpinnerInput from '@/components/input/spinner'
import Popup from '..'
import { TextAreaInput } from '@/components/input/text'
import Checkbox from '@/components/input/checkbox'
import Border from '@/components/border'
import { OrderData } from '@/utils/declarations'

const TambahMakananPopup = forwardRef<PopupHandle, TambahMakananPopupProps>((props, ref) => {
    const [jumlah, setjumlah] = useState(1);
    const [dataPesanan, setdataPesanan] = useState<DataPesanan>({ ... new OrderData() });
    const [foodSelection, setFoodSelection] = useState<MenuSelectionAttributes[]>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URI}/menu/get`)
            .then(res => {
                // TODO: handle error
                if (!res.ok) { }
                return res.json();
            })
            .then((res: MenuSelectionAttributes[]) => {
                const selection = res.map((menu, idx) => {
                    return {
                        ...menu,
                        title: menu.nama,
                        item: (
                            <p className='w-full text-left'>
                                <span>{menu.nama}</span>
                                <br />
                                <span className='text-sm opacity-50'>{menu.deskripsi}</span>
                            </p>
                        )
                    }
                });
                setFoodSelection(selection);
            })
    }, [])

    function reset() {
        setdataPesanan({ ... new OrderData() });
        setjumlah(1);
    }

    return (
        <Popup
            title='Tambah makanan'
            positiveButtonTitle='Tambah'
            negativeButtonTitle='Batal'
            onPositiveClick={() => { props.onPositiveClick?.(dataPesanan); reset(); }}
            onNegativeClick={props.onNegativeClick}
            ref={ref}
            dismissOnOptionClick={false}
        >
            <div className='space-y-3'>
                <FSDropdown
                    labelLoc='top'
                    value={dataPesanan.nama_makanan}
                    onValueChange={(v: MenuAttributes) => {
                        setdataPesanan({ ...dataPesanan, ...v, nama_makanan: v.nama, jumlah: jumlah });
                    }}
                    selectionKey='item'
                    placeholder='Pilih makanan'
                    selections={foodSelection ?? [{ title: "Loading...", item: "Loading..." }]}
                    title='Pilih makanan'
                >
                    Pilih Makanan
                </FSDropdown>
                <Checkbox
                    onValueChange={c => setdataPesanan({ ...dataPesanan, is_karyawan: c })}
                    checked={dataPesanan.is_karyawan}
                >
                    Pemesan adalah karyawan
                </Checkbox>
                <Border />
                <div className='grid grid-cols-2 items-center py-1'>
                    <p className='min-w-fit pr-1'>Harga</p>
                    <p>Rp{formatHarga(dataPesanan.harga)}</p>
                </div>
                <div className='grid grid-cols-2 items-center'>
                    <p>Jumlah</p>
                    <div className='w-full'>
                        <SpinnerInput
                            jumlah={jumlah}
                            setJumlah={setjumlah}
                            onChange={v => setdataPesanan({ ...dataPesanan, jumlah: v })}
                            className='border border-black/30 rounded-lg w-full py-5'
                            spinnerClassName='border border-black/30' />
                    </div>
                </div>
                <div className='grid grid-cols-2 items-center py-1'>
                    <p className='min-w-fit pr-1'>Harga total</p>
                    <p>Rp{formatHarga(dataPesanan.harga * jumlah)}</p>
                </div>
                <Border />
                <TextAreaInput
                    labelLoc='top'
                    placeholder='Tulis catatan (jika ada)'
                    value={dataPesanan.description}
                    onChange={v => setdataPesanan({ ...dataPesanan, description: v.currentTarget.value })}
                >
                    Catatan
                </TextAreaInput>
            </div>
        </Popup>
    )
})

export default TambahMakananPopup;