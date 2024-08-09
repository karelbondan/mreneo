import { PopupHandle, PopUpProps } from '@/types/popup';
import React, { forwardRef, useImperativeHandle, useState } from 'react'

// using forwardRef & imperativeHandler in child and useRef in parent
// to allow method access from parent
const CustomPopup = forwardRef<PopupHandle, PopUpProps>((props, ref) => {
    const [visible, setvisible] = useState(false);
    // destructuring and assigning a default value
    const { dismissOnOptionClick = true } = props;

    useImperativeHandle(ref, () => ({
        show: () => show(),
        hide: () => hide(),
        visible: visible
    }));

    const show = () => setvisible(true);
    const hide = () => setvisible(false);

    return (
        <div className={`${visible ? "visible opacity-100" : "invisible opacity-0"} fixed w-full h-full top-0 left-0 bg-black/30 z-10 transition-all`}
            onClick={() => setvisible(false)}
        >
            <div className='flex items-center justify-center h-full w-full'>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`${visible ? "visible opacity-100" : "invisible opacity-0 -translate-y-2"} bg-white p-5 w-[90%] space-y-2 rounded-xl transition-all`}
                >
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold text-lg'>{props.title}</p>
                        <button className='size-8 flex items-center justify-center bg-blue-200 rounded-lg active:scale-90 transition-all'
                            onClick={() => setvisible(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <hr className='border-black/20' />
                    <p>{props.description}</p>
                    {props.children}
                    <div className={`${props.negativeButtonTitle ? "space-x-2" : ""} flex items-center justify-center pt-2`}>
                        {/* xxx?.() => optional chaining to invoke optional prop method */}
                        <button className={`${props.negativeButtonTitle ? "block" : "hidden"} px-5 py-2 ${props.negativeButtonColor ? props.negativeButtonColor : "bg-blue-200"} rounded-lg active:scale-90 transition-all`}
                            onClick={() => { props.onNegativeClick?.(); dismissOnOptionClick && setvisible(false); }}
                        >
                            {props.negativeButtonTitle}
                        </button>
                        <button className={`px-5 py-2 ${props.positiveButtonColor ? props.positiveButtonColor : "bg-green-300"} rounded-lg active:scale-90 transition-all font-semibold`}
                            onClick={() => { props.onPositiveClick?.(); dismissOnOptionClick && setvisible(false); }}
                        >
                            {props.positiveButtonTitle}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CustomPopup;