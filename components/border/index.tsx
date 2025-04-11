import { BorderProps } from "@/types/common"

function Border(props: BorderProps) {
    const className = props.className ?? "h-1 w-full border-b border-black/20";
    return (
        <div className={className} />
    )
}

export default Border