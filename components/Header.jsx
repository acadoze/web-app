import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import SearchIcon from '@/components/SearchIcon'

export default function Header() {
  return (
    <header className="flex justify-between h-[100px] bg-blue py-3 px-3">
      <div className="flex h-[90px] w-auto">
        <img src="/LOGO.png" className="object-cover" />
      </div>
      <div className="flex items-start nav flex-1 justify-around">
        <div className="flex gap-x-5 mr-5 ">
          <li><Link href="/how-it-works">How it works</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/plans">Plans & Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/signin">Free trial</Link></li>
          <SearchIcon />
        </div>
        <div>
          <li>
            <Link href={"/signin"} className="py-2 px-5 flex items-center text-white font-600">
              <IoMdPerson className="mr-2"/> Log In
            </Link>
          </li>
        </div>
      </div>
    </header>
  )
}