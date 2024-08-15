import React, { forwardRef } from 'react'
import CustomPopup from '.'
import { GenericPopupProps, PopupHandle } from '@/types/popup';

const SimpanPerubahanPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <CustomPopup
            title='Simpan perubahan?'
            positiveButtonTitle='Simpan'
            onPositiveClick={() => { }}
            negativeButtonTitle='Tunggu dulu'
            ref={ref}
        >
            <p>Simpan perubahan data ke database?</p>
        </CustomPopup>
    )
})

export default SimpanPerubahanPopup;