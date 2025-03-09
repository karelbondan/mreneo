import { DaftarPesanan } from "@/types/common";
import { getHeadersWithCSRF } from "../commonfunc";
import { Cookies } from "next-client-cookies";

async function checkError(res: Response): Promise<void> {
    if (res.status === 500) {
        const parsed: { detail: string } = await res.json();
        throw parsed.detail;
    }
}

export async function getPesanan(cookies: Cookies): Promise<DaftarPesanan[]> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URI!}/pesanan/get`, {
        method: "GET",
        credentials: "include",
        headers: getHeadersWithCSRF(cookies)
    })
    checkError(data);
    const parsed: { detail: DaftarPesanan[] } = await data.json();
    console.log(parsed);
    return parsed.detail;
}

// export async function getPesananByDate(cookies: Cookies): Promise<DaftarPesanan[]> {
//     const data = await fetch(`${process.env.NEXT_PUBLIC_API_URI!}/`)
// }