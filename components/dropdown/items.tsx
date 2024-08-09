import { DropDownItem } from '@/types/dropdown';
import React, { Dispatch, SetStateAction } from 'react'

function onClick(
    setVisible: Dispatch<SetStateAction<boolean>>,
    onSelect: (selectedValue: any, selectedTitle: string) => void,
    selectedValue: any,
    selectedTitle: string
): void {
    setVisible(false);
    onSelect(selectedValue, selectedTitle);
}

export default function DropdownItems(props: DropDownItem) {
    const { setVisible, onSelect, value, title } = props;
    return (
        <div className='border h-10 flex items-center p-2 active:bg-gray-200 transition-all select-none'
            onClick={() => { onClick(setVisible, onSelect, value, title); }}
        >
            {title}
        </div>
    )
}
