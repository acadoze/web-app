"use client"
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import {useState, useEffect} from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
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
    if (email === "" || password === "" || fullName === "") {
      toast.warn("Your Full Name, Email and Password field must not be empty")
      return false
    }
    disableButton(true)
    axios.post(`${process.env.API_BASE}/api/auth`, {fullName, email, password, role: "student"})
    .then(async ({data}) => {
      disableButton(false)
      if (!data.success) {
        toast(data.message);
      }
    })
  }
  return (
    <main className="relative bg-[#eaf2ff] h-[100vh] w-[100vw]">
      <Link href="/" className="absolute top-[30px] text-[1.8rem] right-[80px]">
        <LiaTimesSolid />
      </Link>
      <section className="flex flex-col justify-center items-center pt-[1rem]">
        <h1 className="text-[2.3rem] font-semibold">Sign Up</h1>
        <p className="text-[1.2rem]">Already a member? <Link href="/signin" className="text-yellow-400 font-600">Sign In</Link></p>
        <form className="site_form" onSubmit={handleForm}>
          <li>
            <label htmlFor="fullName"> Full Name </label>
            <input type="text" id="fullName" className="" value={fullName} onChange={e => setFullName(e.target.value)} />
          </li>
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
              className="text-white bg-yellow-400 px-[10px] py-[10px]" 
              disabled={buttonDisabled}
            > 
              Sign Up 
            </button>
          </li>
        </form>
      </section>
              <ToastContainer  />

    </main>
  )
}