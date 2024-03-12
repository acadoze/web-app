import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex justify-between h-[100px] py-3 px-3">
      <div className="">
        <img src="/logo.png" clasName="object-cover" />
      </div>
      <div className="flex items-center">
        <div className="flex gap-x-5 mr-5">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/plans">Plans & Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </div>
        <div>
          <li>
            <Link href={"/login"} className="py-2 px-5 flex items-center text-yellow-400">
              <IoMdLogIn className="mr-2"/> Log in
            </Link>
          </li>
        </div>
      </div>
    </header>
  )
}