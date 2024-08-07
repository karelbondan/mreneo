import { GenericPopupProps, PopupHandle } from '@/types/common'
import React, { forwardRef } from 'react'
import CustomPopup from '.'

const SimpanPerubahanPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <CustomPopup
            title='Simpan perubahan?'
            positiveButtonTitle='Simpan'
            onPositiveClick={() => { }}
            negativeButtonTitle='Tunggu dulu'
            ref={ref}
        >
            <p>Simpan perubahan data pada pesanan ini ke database?</p>
        </CustomPopup>
    )
})

export default SimpanPerubahanPopup;