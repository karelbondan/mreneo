import React, { forwardRef } from 'react'
import { MakananSudahAdaProps, PopupHandle } from '@/types/popup';
import Popup from '..';

const MakananSudahAdaPopup = forwardRef<PopupHandle, MakananSudahAdaProps>((props, ref) => {
    return (
        <Popup
            title='Makanan sudah ditambahkan'
            positiveButtonTitle='OK'
            ref={ref}
        >
            <p>{props.namaMakanan} sudah ada dalam pesanan ini. Silakan pilih makanan lain.</p>

        </Popup>
    )
})

export default MakananSudahAdaPopup;