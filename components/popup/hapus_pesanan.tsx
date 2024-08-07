import { GenericPopupProps, PopupHandle } from '@/types/common'
import React, { forwardRef } from 'react'
import CustomPopup from '.'

const HapusPesananPopup = forwardRef<PopupHandle, GenericPopupProps>((props, ref) => {
    return (
        <CustomPopup
            title='Hapus pesanan ini?'
            positiveButtonTitle='Ya, hapus'
            positiveButtonColor='bg-red-300'
            negativeButtonTitle='Tunggu dulu'
            ref={ref}
        >
            <p className='pr-10'>Pesanan ini beserta datanya akan dihapus dari database dan tidak akan bisa dikembalikan lagi. Yakin ingin melanjutkan?</p>
        </CustomPopup>
    )
})

export default HapusPesananPopup;