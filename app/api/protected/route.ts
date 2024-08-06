import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ pesan: "Pesan pengembang: apabila Anda sudah melalui proses masuk dan dapat melihat pesan ini, maka kode bekerja semestinya." });
}