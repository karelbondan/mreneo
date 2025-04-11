import { ComponentProps, PropsWithChildren } from "react";

export interface GeneralInputProps extends ComponentProps<"input">, PropsWithChildren {
    labelLoc?: "top" | "left";
    textArea?: boolean;
}

export interface TextAreaInputProps extends ComponentProps<"textarea">, PropsWithChildren {
    labelLoc?: "top" | "left";
}

export interface CheckboxProps extends ComponentProps<"input">, PropsWithChildren {
    onValueChange?: (checked: boolean) => void;
    checked?: boolean;
}