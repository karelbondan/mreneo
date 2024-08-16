import DashboardCard from '@/components/cards/dashboard'
import DatePicker from '@/components/input/date_picker';
import { DataHarianInteractiveProps } from '@/types/card'
import { formatDate } from '@/utils/commonfunc';
import React from 'react'

export default function DataHarianInteractiveSection(props: DataHarianInteractiveProps) {
    const date = new Date();
    return (
        <div className={props.className}>
            <div className='w-full bg-purple-200 text-center rounded-lg p-2'>
                <p>Menampilkan data untuk hari</p>
                <p className='font-bold'>{formatDate(date)}</p>
                <DatePicker />
            </div>
            <DashboardCard with_button={false} />
            <div>
                <p className="font-bold text-xl">Keterangan</p>
                <p className="pb-3">Tambahkan keterangan di sini (misal acara mingguan, acara spesial, dll) untuk data hari ini.</p>
                <textarea
                    placeholder="Tambahkan keterangan di sini"
                    className="border border-black/30 w-full min-h-20 rounded-lg p-2" />
            </div>
        </div>
    )
}
