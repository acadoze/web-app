"use client"
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { ThreeCircles } from 'react-loader-spinner'
import { Orbitron, Poppins, Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

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
    <main className={`${outfit.className} relative bg-blue h-[100vh] w-[100vw]`}>
      <section className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-col z-[1]">
          <img src="/top (2).png" className="w-[auto] h-[350px]" />
          <img src="/ACADOZE__3_-removebg-preview 1.png" className="w-[auto] h-[70px] absolute top-[73px]" />
        </div>
        <div className="bg-[white] z-[2] relative bottom-[202px] w-[400px] spx_wrap shadow-lg h-[150px] w-[500px] h-[170px] rounded-[30px] flex justify-center items-center px-[3rem] ">
          <img src="/47.png" className="imgs " />
          <img src="/8.png" className="imgs " />
          <div className="w-[80%] flex justify-between items-center">
            <Link className="block uppercase bg-darkCyan px-2 text-[white] text-[.8rem] py-2 rounded-2xl" href="/signin">Students login</Link>
            <Link className="block uppercase bg-darkCyan px-2 text-[white] text-[.8rem] py-2 rounded-2xl" href="/signup">teachers/<br />parents login</Link>
          </div>
        </div>
        <img src="/bottom (1).png" className="absolute w-[auto] h-[200px] top-[250px] z-[1]" />
      </section>
      <ToastContainer   />
    </main>
  )
}