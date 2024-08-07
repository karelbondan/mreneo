import { DropDownItem } from '@/types/common'
import React, { Dispatch, SetStateAction } from 'react'

function onClick(
    setVisible: Dispatch<SetStateAction<boolean>>,
    onSelect: Dispatch<SetStateAction<string>>,
    selectedValue: string
): void {
    setVisible(false);
    onSelect(selectedValue);
}

export default function DropdownItems(props: DropDownItem) {
    const { setVisible, onSelect, value } = props;
    return (
        <div className='border h-10 flex items-center p-2 active:bg-gray-200 transition-all select-none'
            onClick={() => { onClick(setVisible, onSelect, value); }}
        >
            {value}
        </div>
    )
}
