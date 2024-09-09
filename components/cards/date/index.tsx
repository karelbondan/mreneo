'use client'
import { DateCardProps } from "@/types/card"
import { checkAuth } from "@/utils/api/auth"
import { formatDate } from "@/utils/commonfunc"
import { useCookies } from "next-client-cookies"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DateCard(props: DateCardProps) {
    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        async function init() {
            const resHasErr = await checkAuth(cookies);
            if (resHasErr) {
                router.push(`/login?err=${resHasErr}`);
            }
        }
        init();
    }, [])

    return (
        <div className='p-3 bg-purple-200 rounded-lg'>
            <span>{props.children}</span>
            <span><strong>&nbsp;{formatDate(props.date)}</strong></span>
        </div>
    )
}
