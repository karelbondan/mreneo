'use client'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function formatPathname(pathname: string) {
  const splitted = pathname.split("/");
  if (splitted.length > 3)
    return `${splitted[1]} - ... - ${splitted[splitted.length - 1]}`.replaceAll("_", " ")
  else
    return pathname.replace("/", "").replaceAll("_", " ").replaceAll("/", " - ");
}

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const formattedPathName = formatPathname(pathName);

  return (
    !pathName.startsWith("/login") ? (
      <div className={`border w-full flex items-center px-6 ${formattedPathName == "" ? "space-x-0 py-6" : "space-x-5 py-5"}`}>
        <button
          className={`bg-gray-300 size-10 min-w-10 min-h-10 rounded-lg items-center justify-center ${formattedPathName == "" ? "hidden" : "flex"} active:scale-75 transition-all`}
          onClick={() => router.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        {/* <h1 className="font-bold text-2xl">{formattedPathName == "" ? "Dashboard - Mreneo" : formattedPathName.split(" ").map(word => word[0]?.toUpperCase() + word.slice(1)).join(" ")}</h1> */}
        <h1 className="font-bold text-2xl">Mreneo</h1>
      </div>
    ) : null
  )
}
