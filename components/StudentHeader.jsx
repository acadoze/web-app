'use client'

import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { Orbitron, Poppins, Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import {useRouter} from "next/navigation"

export default function Header({name}) {
  const router = useRouter()
  async function logout() {
    await fetch(`${process.env["API_BASE"]}/auth`, {
      method: "delete"
    })
    router.push("/")
  }
  return (
    <header className={` ${outfit.className} flex justify-between h-[100px] bg-blue py-3 px-3`}>
      <div className="flex h-[90px] w-auto">
        <Link href="/" >
          <span className="block w-[150px] h-[auto]"><img src="/LOGO.png" className="object-cover" /></span>
        </Link>
      </div>
      <div className="flex items-start nav flex-1 justify-around">
        <div className="flex gap-x-5 mr-5 ">
          
        </div>
        <div>
          <li className="flex items-center text-[white] text-[1rem]">
            {name} 
            <img src="Mask group.png" className=" h-[30px] w-[auto] " />
            <span onClick={logout} className="cursor-pointer" href="/" > Log out </span>
          </li>
        </div>
      </div>
    </header>
  )
}
