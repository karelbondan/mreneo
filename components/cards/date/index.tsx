'use client'
import { DateCardProps } from "@/types/card"
import { formatDate } from "@/utils/commonfunc"

export default function DateCard(props: DateCardProps) {
    return (
        <div className='p-3 bg-purple-200 rounded-lg'>
            <span>{props.children}</span>
            <span><strong>&nbsp;{formatDate(props.date)}</strong></span>
        </div>
    )
}
