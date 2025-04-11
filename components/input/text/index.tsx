import { GeneralInputProps, TextAreaInputProps } from "@/types/components/input";

function GeneralInput(props: GeneralInputProps) {
    const { children, labelLoc, textArea, ...rest } = props;
    const className =
        "w-full border border-gray-300 rounded-md py-3 px-4 focus:ring focus:ring-gray-300 outline-none transition-all";
    return (
        <div
            className={`flex ${labelLoc === "top"
                ? "flex-col"
                : "items-center justify-between space-x-5"
                } space-y-1`}
        >
            {children && <p className="min-w-fit">{[children]}</p>}
            <input {...rest} className={className} />
        </div>
    );
}

export function TextAreaInput(props: TextAreaInputProps) {
    const { children, labelLoc, ...rest } = props;
    const className =
        "border border-gray-300 rounded-md py-3 px-4 focus:ring focus:ring-gray-300 outline-none transition-all";
    return (
        <div
            className={`flex ${labelLoc === "top"
                ? "flex-col"
                : "items-center justify-between space-x-5"
                } space-y-1`}
        >
            {children && <p className="min-w-fit">{[children]}</p>}
            <textarea
                {...rest}
                placeholder={props.placeholder}
                className={className}
            />
        </div>
    );
}

export default GeneralInput;