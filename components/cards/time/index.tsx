'use client'

import { formatDate } from "@/utils/commonfunc";
import { useEffect, useState } from "react";

export default function TimeCard() {
    const [currentDate, setcurrentDate] = useState(new Date());
    const [currentTime, setcurrentTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = new Date();
            setcurrentDate(newTime);
            const formattedTime = /^[\d:]+/i.exec(newTime.toTimeString()!);
            setcurrentTime(formattedTime![0]);
        }, 1000); // Update every second


        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div className="flex items-center space-x-2 rounded-lg bg-blue-200 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p>{formatDate(currentDate)}, {currentTime}</p>
        </div>
    )
}
