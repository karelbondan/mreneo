import DashboardCard from '@/components/cards/dashboard'
import DatePicker from '@/components/input/date_picker';
import { DataHarianInteractiveProps } from '@/types/card'
import { PopupHandle } from '@/types/popup';
import { useRef, useState } from 'react';

export default function DataHarianInteractiveSection(props: DataHarianInteractiveProps) {
    const [selectedDate, setselectedDate] = useState<Date>(new Date());
    const datePicker = useRef<PopupHandle>(null);

    function setDate(newDate: Date) {
        setselectedDate(newDate);
        datePicker.current?.hide();
        console.log(newDate.toDateString());
    }

    return (
        <div className={props.className}>
            <div className='w-full bg-purple-200 text-center rounded-lg p-3 flex flex-col items-center'>
                <p>Menampilkan data untuk hari</p>
                <div className='w-full my-1'>
                    <DatePicker ref={datePicker} onPositiveClick={setDate} />
                </div>
                <p className='text-sm text-black/50'>*Tekan ^ untuk memilih tanggal lain</p>
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
