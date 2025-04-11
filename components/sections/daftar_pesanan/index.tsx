'use client'
import PesananCard from '@/components/cards/pesanan';
import { DaftarPesanan } from '@/types/common';
import { checkAuth } from '@/utils/api/auth';
import { getPesanan } from '@/utils/api/pesanan';
import { strings } from '@/utils/strings';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function DaftarPesananSection() {
    const [daftarPesanan, setdaftarPesanan] = useState<DaftarPesanan[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(true);

    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        getPesanan(cookies)
            .then(res => { setdaftarPesanan(res); setisLoading(false); })
            // .then(_ => checkAuth(cookies))
            // .then(authErr => authErr && router.push(`/login?err=${authErr}`))
            .catch(err => { console.log(error); seterror(err); setisLoading(false); });
    }, [])

    return (
        <div>
            {/* when loading */}
            {isLoading && (
                <div className='flex flex-col items-center justify-center mt-40 opacity-50'>
                    <div className='size-5 border-2 border-black rounded-full border-t-transparent animate-spin' />
                    <span>{strings.gui.PESANAN_LOADING}</span>
                </div>
            )}

            {/* if daftar pesanan is empty */}
            {(!isLoading && !error && daftarPesanan.length === 0) && (
                <p className='opacity-50 text-center mt-40'>
                    {strings.gui.PESANAN_EMPTY}
                </p>
            )}

            {/* displaying the daftar pesanan if there is no error */}
            {(!error && daftarPesanan.length > 0) && daftarPesanan.map((pesanan, index) => {
                return <PesananCard key={pesanan.id + index} data={pesanan} pesanan_no={index + 1} />
            })}

            {/* if an error exists */}
            {error && (
                <p className='text-red-600 text-center'>
                    {`${strings.error.ERR_OFF}`}
                </p>
            )}
        </div>
    )
}
