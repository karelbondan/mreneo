import { NextResponse } from "next/server";

const responses = [
    "Such a futile struggle, how amusing...",
    "Not giving up? Marvelous! Truly marvelous!",
    "Such wonders of what these mortals can do!",
    "One... two... three... what's that? Nothing!",
    "Retrieving information, please wait...",
    "Měi cì dōu xiǎng zhuāng zuò hěn jué jiàng",
    "There be risen, the kingdom of floptok",
    "Halt, mortal! Tell me, what is it that thou seek?",
    "Keep entertaining me, mortal",
    "Retrieving information, please wait...",
    "You should not be here, mortal. Kindly leave or demise will be upon thee",
    "Peek around; fulfil your desires. What you seek is mere void",
    "An obstinate soul, I see. How peculiar...",
]

export async function GET() {
    // randomized 0-1 > *100 > floored > modulo of length
    const idx = Math.floor(Math.random() * 100) % responses.length

    return NextResponse.json({ "?": responses[idx] });
}