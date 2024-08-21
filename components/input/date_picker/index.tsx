import CustomPopup from '@/components/popup'
import { DatePickerProps } from '@/types/input';
import { PopupHandle } from '@/types/popup'
import { formatDate } from '@/utils/commonfunc';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CustomDropdown from '../dropdown';
import { months, monthsIndex } from '@/utils/definition';
import SpinnerInput from '../spinner';

const DatePicker = forwardRef<PopupHandle, DatePickerProps>((props, ref) => {
  const today = new Date();
  const [selectedDate, setselectedDate] = useState<Date>(props.selectedDate ?? new Date());
  const [display, setdisplay] = useState({
    tahun: selectedDate.getFullYear(),
    bulan: selectedDate.getMonth()
  })
  const pickerPopup = useRef<PopupHandle>(null);

  useImperativeHandle(ref, () => pickerPopup.current!, []);

  function setDate() {
    props.onPositiveClick?.(selectedDate);
  }

  function createButton(date: number, month: number, disabled: boolean = false): Node {
    const bt = document.createElement("button");
    const btDate = new Date(display.tahun, month, date);

    // is today? 
    const today = new Date();
    const isToday = btDate.toDateString() === today.toDateString();

    // is selectedDate?
    const isSelected = btDate.toDateString() === selectedDate.toDateString();

    // bt config
    bt.innerText = String(date);
    bt.disabled = disabled;
    bt.className = `rounded-lg p-2 border-2 ${isToday ? "border-blue-200" : "border-transparent"}`;
    bt.classList.toggle("disabled", disabled);
    bt.classList.toggle("selected", isSelected);
    bt.onclick = () => setselectedDate(btDate);
    return bt;
  }


  function displayDates() {
    const dates = document.getElementById("dates")!;
    dates.innerHTML = "";
    const nextMonth = new Date(display.tahun, display.bulan + 1, 0);
    const thisMonth = new Date(display.tahun, display.bulan, 1);
    const prevMonth = new Date(display.tahun, display.bulan, 0);

    // filler for prev month if first day not sunday
    for (let kemarin = 0; kemarin < thisMonth.getDay(); kemarin++) {
      const tanggalKemarin = prevMonth.getDate() - prevMonth.getDay();
      dates.appendChild(createButton(tanggalKemarin + kemarin, thisMonth.getMonth() - 1, true));
    }

    // max days for this month
    for (let sekarang = 0; sekarang < nextMonth.getDate(); sekarang++) {
      dates.appendChild(createButton(sekarang + 1, thisMonth.getMonth()));
    }

    // filler for next month; +1 karena ngambil hari terakhir bulan ini
    for (let besok = nextMonth.getDay() + 1; besok < 7; besok++) {
      dates.appendChild(createButton(besok - nextMonth.getDay(), thisMonth.getMonth() + 1, true));
    }
  }

  function changeDates(action: "next" | "prev") {
    let newYear: number | undefined, newMonth: number;
    if (action === 'next') {
      if (display.bulan === 11) {
        newYear = display.tahun + 1;
      }
      newMonth = (display.bulan + 1) % 12;
    } else {
      if (display.bulan === 0) {
        newYear = display.tahun - 1;
      }
      newMonth = (display.bulan - 1 + 12) % 12;
    }
    setdisplay({ tahun: newYear ?? display.tahun, bulan: newMonth });
  }

  useEffect(() => {
    displayDates();
  }, [selectedDate, display]);


  return (
    <div className='w-full'>
      <div className='flex items-center justify-between gap-3 w-full border border-black/30 rounded-lg p-2 cursor-pointer active:scale-90 transition-all'
        onClick={() => pickerPopup.current?.show()}>
        <p className='select-none font-semibold'>{formatDate(selectedDate)}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      </div>
      <CustomPopup
        title='Pilih tanggal'
        positiveButtonTitle='OK'
        negativeButtonTitle='Hari ini'
        onPositiveClick={setDate}
        onNegativeClick={() => { setselectedDate(today); setdisplay({ bulan: today.getMonth(), tahun: today.getFullYear() }) }}
        dismissOnOptionClick={false}
        ref={pickerPopup}
      >
        <div className='flex flex-col items-center justify-center w-full '>
          <div id='header' className='flex w-full justify-between py-4'>
            <button id='prevMonth' className='p-2 border bg-gray-200 rounded-lg active:scale-75 transition-all'
              onClick={() => changeDates('prev')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className='flex w-fit smol:w-3/5'>
              <CustomDropdown
                pilihan={Object.values(months).map((month, idx) => { return { idx: idx, month: month } })}
                value={monthsIndex[display.bulan]}
                pilihanString={Object.values(months)}
                title='Pilih bulan'
                onChange={(bulan: { idx: number, month: string }) => setdisplay({ ...display, bulan: bulan.idx })}
              />
              <SpinnerInput
                jumlah={display.tahun}
                min={display.tahun - 1000}
                max={display.tahun + 1000}
                className='border border-black/30 w-20 py-5'
                spinnerClassName='border border-black/30'
                showTimes={false}
                onChange={(tahun) => setdisplay({ ...display, tahun: tahun })}
              />
            </div>
            <button id='nextMonth' className='p-2 border bg-gray-200 rounded-lg active:scale-75 transition-all'
              onClick={() => changeDates('next')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          <div id='date_container' className='w-full [&>div]:gap-2 smol:w-fit smol:[&>div]:gap-3 space-y-2'>
            <div id='days' className='grid grid-cols-7 font-semibold'>
              <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
            </div>
            <hr className='border-1 border-black/20' />
            <div id='dates' className='grid grid-cols-7 [&>button]:aspect-square [&_.disabled]:text-black/30 [&_.selected]:bg-blue-100'></div>
            <hr className='border-1 border-black/20' />
          </div>
        </div>
      </CustomPopup>
    </div>
  )
})

export default DatePicker