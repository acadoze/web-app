import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex justify-between h-[100px] py-3 px-3">
      <div className="">
        <img src="/logo.png" className="object-cover" />
      </div>
      <div className="flex items-center">
        <div className="flex gap-x-5 mr-5">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/plans">Plans & Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </div>
        <div>
          <li>
            <Link href={"/signin"} className="py-2 px-5 flex items-center font-600 text-yellow-400">
              <IoMdPerson className="mr-2"/> Sign In
            </Link>
          </li>
        </div>
      </div>
    </header>
  )
}