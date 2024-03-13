"use client"
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [buttonDisabled, disableButton] = useState(true)

  useEffect(() => {
    if (email === "" || password === "" || fullName === "") {
      disableButton(true)
    } else {
      disableButton(false)
    }
  }, [email, password, fullName])

  function handleForm(e) {
    e.preventDefault()
    if (email === "" || password === "") {
      toast.warn("Email or password must not be empty")
      return false
    }
    disableButton(true)
    axios.put(`${process.env.API_BASE}/api/auth`, {email, password})
    .then(async ({data}) => {
      if (!data.success) {
        toast(data.message);
      }
      disableButton(false)
    
    })
  }

  return (
    <main className="relative bg-[#eaf2ff] h-[100vh] w-[100vw]">
      <Link href="/" className="absolute top-[30px] text-[1.8rem] right-[80px]">
        <LiaTimesSolid />
      </Link>
      <section className="flex flex-col justify-center items-center pt-[1rem]">
        <h1 className="text-[2.3rem] font-semibold">Sign In</h1>
        <p className="text-[1.2rem]">Not a member? <Link href="/signup" className="text-yellow-400 font-600">Sign Up</Link></p>
        <form className="site_form" onSubmit={handleForm}>
          <li>
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" className="" value={email} onChange={e => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" className="" value={password} onChange={e => setPassword(e.target.value)} />
          </li>
          <li>
            <button 
              type="submit"
              className="text-white bg-yellow-400 px-[10px] py-[10px]" 
              disabled={buttonDisabled}
            > 
              Sign In
            </button>
          </li>
        </form>
      </section>
              <ToastContainer   />

    </main>
  )
}