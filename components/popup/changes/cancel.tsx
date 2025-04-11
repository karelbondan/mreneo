import React, { forwardRef } from 'react'
import { GenericPopupProps, PopupHandle } from '@/types/popup';
import Popup from '..';

const BatalUbahPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <Popup
            title='Batalkan perubahan?'
            positiveButtonTitle='OK'
            onPositiveClick={props.onPositiveClick}
            negativeButtonTitle='Tunggu dulu'
            onNegativeClick={props.onNegativeClick}
            ref={ref}
        >
            <p>Yakin ingin membatalkan? Data-data yang telah diubah pada pesanan ini tidak akan disimpan ke database.</p>
        </Popup>
    )
})

export default BatalUbahPopup;