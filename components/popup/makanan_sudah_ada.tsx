import React, { forwardRef } from 'react'
import CustomPopup from '.'
import { MakananSudahAdaProps, PopupHandle } from '@/types/common'

const MakananSudahAdaPopup = forwardRef<PopupHandle, MakananSudahAdaProps>((props, ref) => {
    return (
        <CustomPopup
            title='Makanan sudah ditambahkan'
            positiveButtonTitle='OK'
            ref={ref}
        >
            <p>{props.namaMakanan} sudah ada dalam pesanan ini. Silakan pilih makanan lain.</p>

        </CustomPopup>
    )
})

export default MakananSudahAdaPopup;