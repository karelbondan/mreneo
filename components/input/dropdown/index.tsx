import React, { useState } from 'react'
import DropdownItems from './items';
import { DropDownProps } from '@/types/input';

const CustomDropdown = (props: DropDownProps) => {
    const [visible, setvisible] = useState(false);
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between gap-2 w-full border border-black/30 rounded-lg p-2 cursor-pointer active:scale-90 transition-all'
                onClick={() => setvisible(true)}>
                <p className='select-none'>{props.value}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {/* posisi fixed bakal kepengaruh kalo ada TRANSFORM apapun, di kasus ini translate-y-0. 
            jadi di sini parent dari si dropdown, si popup, translate-y-0nya dihapus. apparently bisa
            dan animasinya tetep ada. 30 minutes wasted for this holy shit.
            
            artikel yang jelasin: 
            https://n0rush.medium.com/css-position-fixed-is-not-always-relative-to-viewport-ac37d78e2f13 */}
            <div className={`fixed z-20 left-0 top-0 right-0 bottom-0 ${visible ? "visible opacity-100" : "invisible opacity-0"} bg-black/30 transition-all`}
                onClick={() => setvisible(false)}>
                <div className='flex items-center justify-center h-full'>
                    <div onClick={(e) => { e.stopPropagation() }} className={`bg-blue-300 ${visible ? "translate-y-0" : "-translate-y-2"} transition-all p-5 w-[90%] space-y-3 rounded-xl`}>
                        <div className='flex items-center justify-between space-x-2'>
                            <h2 className='text-lg font-semibold'>{props.title}</h2>
                            <button className='size-8 flex items-center justify-center bg-red-300 rounded-lg active:scale-95 transition-all'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <hr className='border-black/20' />
                        <input type='text' className='h-10 w-full' />
                        <div className='h-full bg-white'>
                            {props.pilihan.map((opsi, index) => {
                                return <DropdownItems
                                    title={props.pilihanString[index]}
                                    value={opsi}
                                    setVisible={setvisible}
                                    onSelect={(val: any, title: string) => { props.onChange?.(val); }}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomDropdown;