'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  const formattedPathName = pathName.replace("/", "").replace("_", " ");
  return (
    <div className="border w-full justify-between flex p-6">
      <Link href={"/"}>
        <h1 className="font-bold text-2xl">{formattedPathName == "" ? "Dashboard" : formattedPathName.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</h1>
      </Link>
    </div>
  )
}
