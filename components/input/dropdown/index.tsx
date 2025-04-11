import React, { ComponentProps, PropsWithChildren, useEffect, useState } from 'react'
import DropdownItems from './items';
import { DropDownProps } from '@/types/input';
import GeneralInput from '../text';

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
                                    key={props.title + index}
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

interface SelectionProps {
    title: string;
    [key: string]: any
}

interface DropdownProps extends PropsWithChildren, ComponentProps<"input"> {
    // children is used for the description
    labelLoc: "top" | "left";
    title: string;
    selections: Array<SelectionProps>;
    selectionKey: string;
    value?: string;
    onValueChange: (value: any) => void
    required?: boolean;
}

const FSDropdownItems = (props: ComponentProps<"button"> & PropsWithChildren) => {
    return (
        <button
            {...props}
            className="px-4 py-2 w-full text-left hover:bg-gray-200 transition-all border-b disabled:opacity-40"
        >
            {props.children}
        </button>
    )
}


export const FSDropdown = (props: DropdownProps) => {
    const [visible, setVisible] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<Array<SelectionProps>>();
    const classFormat = `w-full relative space-y-1 flex ${props.labelLoc === "top" ? "flex-col" : "items-center justify-between space-x-5"}`

    function doSearch(q: React.ChangeEvent<HTMLInputElement>) {
        q.preventDefault();
        const qry = q.currentTarget.value;
        if (qry && props.selections) {
            const re = new RegExp(qry.split("").join(".*"), "i")
            const result = props.selections.filter(item => re.exec(item.title))
            setIsSearching(true);
            setSearchResult(result);
        } else {
            setIsSearching(false);
            setSearchResult([]);
        }
    }

    function doOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: SelectionProps) {
        e.preventDefault();
        setSelectedTitle(i.title);
        props.onValueChange(i);
        setVisible(false);
    }

    function renderItems(i: Array<SelectionProps>, d = false) {
        if (i.length < 1) {
            const inv: SelectionProps = { title: "No items found" }
            inv[props.selectionKey] = "No items found"
            i = [inv];
            d = true;
        }
        return i.map((item, idx) => (
            <FSDropdownItems
                key={props.title + idx}
                onClick={e => doOnClick(e, item)}
                // edge case when search result or selection is empty
                disabled={d}
            >
                {item[props.selectionKey]}
            </FSDropdownItems>
        ))
    }

    /* 
    * posisi fixed bakal kepengaruh kalo ada TRANSFORM apapun, di kasus ini translate-y-0. 
    * jadi di sini parent dari si dropdown, si popup, translate-y-0nya dihapus. apparently bisa
    * dan animasinya tetep ada. 30 minutes wasted for this holy shit.
    * 
    * artikel yang jelasin: 
    * https://n0rush.medium.com/css-position-fixed-is-not-always-relative-to-viewport-ac37d78e2f13 
    */
    return (
        <div className='w-full'>
            <div className={classFormat}>
                {props.children && <p className="min-w-fit">{[props.children]}</p>}
                <div className='w-full flex items-center border border-black/30 rounded-lg p-2 cursor-pointer active:scale-90 transition-all'
                    onClick={() => setVisible(true)}>
                    <input
                        type='text'
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        value={props.value ?? selectedTitle}
                        className='w-full text-ellipsis focus:outline-none'
                        readOnly
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div className={`fixed z-20 left-0 top-0 right-0 bottom-0 ${visible ? "visible opacity-100" : "invisible opacity-0"} bg-black/30 transition-all`}
                onClick={() => setVisible(false)}>
                <div className='flex items-center justify-center h-full'>
                    <div onClick={(e) => { e.stopPropagation() }} className={`bg-white ${visible ? "translate-y-0" : "-translate-y-2"} transition-all p-5 w-[90%] space-y-3 rounded-xl`}>
                        <div className='flex items-center justify-between space-x-2'>
                            <h2 className='text-lg font-semibold'>{props.title}</h2>
                            <button className='size-8 flex items-center justify-center bg-red-300 rounded-lg active:scale-95 transition-all'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <hr className='border-black/20' />
                        <search className='relative'>
                            <GeneralInput placeholder='Search' onChange={e => doSearch(e)} />
                            <div className='absolute top-1/2 -translate-y-1/2 right-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </search>
                        <div className='bg-white border border-gray-300 rounded-md h-[calc(100vh-350px)] overflow-auto'>
                            {isSearching ? renderItems(searchResult!) : renderItems(props.selections)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomDropdown;