import { SpinnerInputProps } from '@/types/common'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';

export default function SpinnerInput(props: SpinnerInputProps) {
    const [spinnerVisible, setspinnerVisible] = useState(false);
    const { jumlah, setJumlah, onChange, className, spinnerClassName } = props;
    return (
        <div className='relative flex items-center space-x-2'>
            {/* ini overlay invisible untuk hide spinnernya pas mencet di luar div */}
            <div onClick={() => setspinnerVisible(false)}
                className={`${spinnerVisible ? "visible" : "invisible"} fixed top-0 left-0 w-full h-full z-10 transition-all`} />
            <div className={twMerge(`select-none ${spinnerVisible ? "visible opacity-100 translate-y-1" : "invisible opacity-0 translate-y-0"} absolute top-full right-0 w-fit flex p-2 bg-white rounded-lg z-20 transition-all`, spinnerClassName)}>
                {/* selama lebih dari 1 bisa dikurang, selain itu biarin aja */}
                <button onClick={() => { setJumlah(jumlah > 1 ? jumlah - 1 : jumlah) }} className='size-10 border bg-white active:bg-gray-200 transition-all'>-</button>
                {/* tambah jumlah makanan */}
                <button onClick={() => { setJumlah(jumlah + 1) }} className='size-10 border border-l-0 bg-white active:bg-gray-200 transition-all'>+</button>
            </div>
            <p className='text-xl'>×</p>
            <input
                type='number'
                min={1}
                value={jumlah}
                onChange={(e) => setJumlah(parseInt(e.target.value))}
                onClick={() => setspinnerVisible(true)}
                className={twMerge(`${spinnerVisible ? "z-30" : "z-0"} w-10 h-9 text-center rounded-lg`, className)}
            />
        </div>
    )
}
