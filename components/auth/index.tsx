'use client'
import { ProtectedProps } from '@/types/common';
import { checkAuth } from '@/utils/api/auth';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react'

export default function Protected(props: ProtectedProps) {
    const cookies = useCookies();
    const router = useRouter();

    // useEffect(() => {
    //     if (!props.disable_auth) {
    //         checkAuth(cookies).then(error => error && router.push(`/login?err=${error}`));
    //     }
    // }, []);

    return (
        <div>
            {props.children}
        </div>
    )
}
