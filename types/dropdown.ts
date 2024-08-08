import { Dispatch, SetStateAction } from "react";

export type DropDownHandle = {
    reset: () => void;
}

export type DropDownProps = {
    title: string;
    description?: string;
    pilihan: any[];
    // should be the same size as 'pilihan' with the same
    // item order
    pilihanString: string[];
    defaultValue: string;
    onChange?: (value: any) => void
}

export type DropDownItem = {
    // onSelect: Dispatch<SetStateAction<string>>;
    onSelect: (selectedValue: any, selectedTitle: string) => void;
    setVisible: Dispatch<SetStateAction<boolean>>;
    identifier?: string;
    title: string;
    value: any
}