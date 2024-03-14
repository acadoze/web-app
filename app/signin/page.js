"use client"
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { ThreeCircles } from 'react-loader-spinner'

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showLoader, setLoader] = useState(false)

  function handleForm(e) {
    e.preventDefault()
    if (email === "" || password === "") {
      toast.warn("Email or password must not be empty")
      return false
    }
    setLoader(true)
    axios.put(`${process.env.API_BASE}/api/auth`, {email, password})
    .then(async (response) => {
      const {data} = response
      toast.info(data.message);
      setLoader(false)
    })
    .catch(err => {
      toast.error(err.data.message)
      setLoader(false)
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
              className="text-white bg-yellow-400 flex justify-center items-center px-[10px] py-[10px]" 
            > 
              Sign In &nbsp;&nbsp;
              {
                showLoader ? 
                <ThreeCircles
                  visible={true}
                  height="20"
                  width="20"
                  color="#fff"
                  radius="9"
                  ariaLabel="loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                /> : <></>
              }
              
            </button>
          </li>
        </form>
      </section>
              <ToastContainer   />

    </main>
  )
}