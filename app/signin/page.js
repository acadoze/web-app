"use client"
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import {useState} from 'react'

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="relative bg-[#eaf2ff] h-[100vh] w-[100vw]">
      <head>
        <title>Sign in | Acadoze</title>
      </head>
      <Link href="/" className="absolute top-[30px] text-[1.8rem] right-[80px]">
        <LiaTimesSolid />
      </Link>
      <section className="flex flex-col justify-center items-center pt-[1rem]">
        <h1 className="text-[2.3rem] font-semibold">Sign In</h1>
        <p className="text-[1.2rem]">Not a member? <Link href="/signup" className="text-yellow-400 font-600">Sign Up</Link></p>
        <form className="site_form">
          <li>
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" className="" />
          </li>
          <li>
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" className="" />
          </li>
          <li>
            <button 
              className="text-white bg-yellow-400 px-[10px] py-[10px]" 
              disabled={
                ( email === "" && password === "") ? true : false
              }
            > 
              Sign In
            </button>
          </li>
        </form>
      </section>
    </main>
  )
}