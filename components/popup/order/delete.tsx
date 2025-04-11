import React, { forwardRef } from 'react'
import { GenericPopupProps, PopupHandle } from '@/types/popup';
import Popup from '..';

const HapusPesananPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <Popup
            title='Hapus pesanan ini?'
            positiveButtonTitle='Ya, hapus'
            onPositiveClick={props.onPositiveClick}
            positiveButtonColor='bg-red-300'
            negativeButtonTitle='Tunggu dulu'
            ref={ref}
        >
            <p className='pr-10'>Pesanan ini beserta datanya akan dihapus dari database dan tidak akan bisa dikembalikan lagi. Yakin ingin melanjutkan?</p>
        </Popup>
    )
})

export default HapusPesananPopup;