'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PopupHandle } from "@/types/popup";
import DatePicker from "@/components/input/date_picker";
import DashboardCard from "@/components/cards/dashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DataHarian() {
  const datePicker = useRef<PopupHandle>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const [keterangan, setketerangan] = useState<string>("");
  const [selectedDate, setselectedDate] = useState<Date>(new Date(searchParam.get("date") ?? Date.now()));

  function setHref(pathname: string): ({ pathname: string, query: { date: string } }) {
    return { pathname: pathname, query: { date: selectedDate.toLocaleDateString("sv-SE") } };
  }

  function setDate(newDate: Date) {
    setselectedDate(newDate);
    datePicker.current?.hide();
  }

  useEffect(() => {
    router.replace(`${pathname}?date=${selectedDate.toLocaleDateString("sv-SE")}`);
  }, [selectedDate]);


  return (
    <div className="p-6 space-y-5">
      <div className="space-y-5">
        <div className='w-full bg-purple-200 text-center rounded-lg p-3 flex flex-col items-center'>
          <p>Menampilkan data untuk hari</p>
          <div className='w-full my-1'>
            <DatePicker ref={datePicker} selectedDate={selectedDate} onPositiveClick={setDate} />
          </div>
          <p className='text-sm text-black/50'>*Tekan ^ untuk memilih tanggal lain</p>
        </div>
        <DashboardCard with_button={false} />
        <div>
          <p className="font-bold text-xl">Keterangan</p>
          <p className="pb-3">Tambahkan keterangan di sini (misal acara mingguan, acara spesial, dll) untuk data hari ini.</p>
          <textarea
            value={keterangan}
            onChange={(e) => setketerangan(e.target.value)}
            // TODO: ganti onBlur di sini biar ngesave ke server untuk keterangan hari ini
            onBlur={() => { }}
            placeholder="Tambahkan keterangan di sini"
            className="border border-black/30 w-full min-h-20 rounded-lg p-2" />
        </div>
      </div>
      <div>
        <p className="font-bold text-xl">Data</p>
        <p className="pb-3">Pilih salah satu untuk menambahkan data penjualan/pengeluaran hari ini.</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 w-full">
          <Link href={setHref("/data_harian/daftar_pesanan")} className="w-full flex justify-center">
            <button className="h-28 w-full rounded-lg flex flex-col items-center justify-center space-y-2 bg-blue-200 active:scale-90 transition-all">
              <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="size-8"><rect width="512" height="512" x="0" y="0" rx="0" fill="transparent" stroke="transparent" strokeWidth="0" strokeOpacity="0%" paintOrder="stroke"></rect><svg width="512px" height="512px" viewBox="0 0 20 20" fill="#000000" x="0" y="0" role="img" xmlns="http://www.w3.org/2000/svg"><g fill="black"><path fill="currentColor" d="M7 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM7 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-1-11a.5.5 0 0 1 1 0V3h2.5v-.5a.5.5 0 0 1 1 0V3H13v-.5a.5.5 0 0 1 1 0V3h.5A1.5 1.5 0 0 1 16 4.5v4.732c-.326.14-.632.342-.898.609L15 9.943V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h3.72l-.163.653a1.936 1.936 0 0 0-.054.347H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3H6v-.5Zm9.81 8.048l-4.83 4.83a2.197 2.197 0 0 0-.578 1.02l-.375 1.498a.89.89 0 0 0 1.079 1.078l1.498-.374a2.194 2.194 0 0 0 1.02-.578l4.83-4.83a1.87 1.87 0 0 0-2.645-2.644Z" /></g></svg></svg>
              <p>Daftar Pesanan</p>
            </button>
          </Link>
          <Link href={setHref("/data_harian/pemasukan")} className="w-full flex justify-center">
            <button className="h-28 w-full rounded-lg flex flex-col items-center justify-center space-y-2 bg-blue-200 active:scale-90 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="leading-5">Pemasukan</p>
            </button>
          </Link>
          <Link href={setHref("/data_harian/pengeluaran")} className="w-full flex justify-center">
            <button className="h-28 w-full rounded-lg flex flex-col items-center justify-center space-y-2 bg-blue-200 active:scale-90 transition-all">
              <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="size-8"><rect width="512" height="512" x="0" y="0" rx="0" fill="transparent" stroke="transparent" strokeWidth="0" strokeOpacity="100%" paintOrder="stroke"></rect><svg width="512px" height="512px" viewBox="0 0 512 512" fill="currentColor" x="0" y="0" role="img" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path fill="currentColor" d="M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1l-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6c-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7l-1-112.09l-194.3-1.4zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4c12.6 6.4 22.4-3.5 30.4-23.3c3.3-13.5 8.2-23 23.4-39zm-79.6 96c-.4 0-.9 0-1.3.1c-3.3.7-7.2 4.2-9.8 12.2c-2.7 8-3.3 19.4-.9 31.6c2.4 12.1 7.4 22.4 13 28.8c5.4 6.3 10.4 8.1 13.7 7.4c3.4-.6 7.2-4.2 9.8-12.1c2.7-8 3.4-19.5 1-31.6c-2.5-12.2-7.5-22.5-13-28.8c-4.8-5.6-9.2-7.6-12.5-7.6zm82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3c-11.1 5.5-19.8 13.1-24.5 20.1c-4.7 6.9-5.1 12.1-3.6 15.2c1.5 3 5.9 5.9 14.3 6.3c8.4.5 19.7-1.8 30.8-7.3c11.1-5.5 19.8-13 24.5-20c4.7-6.9 5.1-12.2 3.6-15.2c-1.5-3.1-5.9-5.9-14.3-6.3c-1.1-.1-2.1-.1-3.3-.1zm-97.6 95.6c-4.7.1-9 .8-12.8 1.9c-8.5 2.5-13.4 7-15 12.3c-1.7 5.4 0 11.8 5.7 18.7c5.8 6.8 15.5 13.3 27.5 16.9c11.9 3.6 23.5 3.5 32.1.9c8.6-2.5 13.5-7 15.1-12.3c1.6-5.4 0-11.8-5.8-18.7c-5.7-6.8-15.4-13.3-27.4-16.9c-6.8-2-13.4-2.9-19.4-2.8z" /></g></svg></svg>
              <p className="leading-5">Pengeluaran / Belanja</p>
            </button>
          </Link>
        </div>
      </div>
    </div >
  )
}
