import React, { forwardRef } from 'react'
import { GenericPopupProps, PopupHandle } from '@/types/popup';
import Popup from '..';

const SimpanPerubahanPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <Popup
            title='Simpan perubahan?'
            positiveButtonTitle='Simpan'
            onPositiveClick={props.onPositiveClick}
            negativeButtonTitle='Tunggu dulu'
            ref={ref}
        >
            <p>Simpan perubahan data ke database?</p>
        </Popup>
    )
})

export default SimpanPerubahanPopup;