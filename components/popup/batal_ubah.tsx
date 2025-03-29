import React, { forwardRef } from 'react'
import CustomPopup from '.'
import { GenericPopupProps, PopupHandle } from '@/types/popup';

const BatalUbahPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <CustomPopup
            title='Batalkan perubahan?'
            positiveButtonTitle='OK'
            onPositiveClick={props.onPositiveClick}
            negativeButtonTitle='Tunggu dulu'
            onNegativeClick={props.onNegativeClick}
            ref={ref}
        >
            <p>Yakin ingin membatalkan? Data-data yang telah diubah pada pesanan ini tidak akan disimpan ke database.</p>
        </CustomPopup>
    )
})

export default BatalUbahPopup;