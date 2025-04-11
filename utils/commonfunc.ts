import { Cookies } from "next-client-cookies";
import { days, months } from "./definition";

export function formatHarga(stringHarga: number): string {
    // split harga per 3 digit dari belakang
    return String(stringHarga).split(/(?=(?:...)*$)/).join(".")
}

export function formatDate(date: Date, and_time: boolean = false): string {
    const tanggal = date.toDateString().split(" ");
    const waktu = date.toLocaleTimeString("id-ID").replaceAll(".", ":");
    if (and_time) {
        return `${days[tanggal[0]]}, ${tanggal[2]} ${months[tanggal[1]]} ${tanggal[3]}, ${waktu}`;
    } else {
        return `${days[tanggal[0]]}, ${tanggal[2]} ${months[tanggal[1]]} ${tanggal[3]}`;
    }
}

export function getCurrentDateISO(): string {
    return new Date().toISOString();
}

export function getCommonHeaders(): { [key: string]: string } {
    return {
        "content-type": "application/json",
        "access-control-allow-origin": process.env.NEXT_PUBLIC_ORIGIN_DOMAIN!,
    }
}

export function getHeadersWithCSRF(cookies: Cookies): { [key: string]: string } {
    const xCsrfHeader = process.env.NEXT_PUBLIC_API_XCSRF_HEADER!;
    const xCsrf = process.env.NEXT_PUBLIC_API_XCSRF!;

    const reqHeaders = getCommonHeaders();
    reqHeaders[xCsrfHeader] = cookies.get(xCsrf)!;

    return reqHeaders;
}