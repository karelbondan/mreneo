'use client'

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
        <div className="rounded-lg bg-blue-200 p-3">
            <p>{currentDate.toDateString()}, {currentTime}</p>
        </div>
    )
}
