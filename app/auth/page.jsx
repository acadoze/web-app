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
import { FaRegTimesCircle } from "react-icons/fa";

function Auth({hidePopup, handleForm, showLoader}) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="bg-[rgb(0,0,0,0.4)] fixed w-[100vw] flex justify-center items-center h-[100vh] z-[4]">
      <div className="rounded-2xl h-[400px] w-[600px] flex justify-center flex-col items-center bg-[white] relative">
        <FaRegTimesCircle className="absolute top-[15px] right-[15px]" onClick={hidePopup} />
        <form className="site_form" onSubmit={e => {
          e.preventDefault()
          handleForm({email, password})
        }}>
          <li>
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" className="" value={email} onChange={e => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" className="" value={password} onChange={e => setPassword(e.target.value)} />
          </li>
          <div className="flex justify-center gap-x-[10px]">
            <button 
              onClick={hidePopup}
              className="align-center text-white flex justify-center items-center bg-[#deb887] text-[white] px-[10px] rounded-md py-[8px]" 
            > Cancel </button>
            <button 
              className="align-center text-white flex justify-center items-center bg-darkCyan text-[white] px-[10px] rounded-md py-[8px]" 
            > 
              Log In
              {
                showLoader ? 
                <ThreeCircles
                  className="ml-2"
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
          </div>
        </form>
      </div>

    </div>
  )
}

export default function Signin() {
  const [showLoader, setLoader] = useState(false)
  const [currentPopup, setCurrentPopup] = useState("")

  function handleForm({email, password}) {
    if (currentPopup === "") return
    if (email === "" || password === "") {
      toast.warn("Email or password must not be empty")
      return false
    }
    setLoader(true)
    axios.put(`/api/auth?identity=${currentPopup}`, {email, password})
    .then(async (response) => {
      const {data} = response
      toast.info(data.message);
      setLoader(false)
    })
    .catch(err => {
      console.log(err)
      toast.error(err.response.data.message || err.message)
      setLoader(false)
    })
  }
  function hidePopup(argument) {
    setCurrentPopup("")
    setLoader(false)
  }

  return (
    <>
    {
      currentPopup === "student" &&
        <Auth hidePopup={hidePopup} handleForm={(values) => handleForm(values)} showLoader={showLoader} />
    }
    {
      currentPopup === "teacher" &&
        <Auth hidePopup={hidePopup} handleForm={(values) => handleForm(values)} showLoader={showLoader} />
    }
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
            <button onClick={() => setCurrentPopup("student")} className="block uppercase bg-darkCyan px-2 text-[white] text-[.8rem] py-2 rounded-2xl" >Students login</button>
            <button onClick={() => setCurrentPopup("teacher")}  className="block uppercase bg-darkCyan px-2 text-[white] text-[.8rem] py-2 rounded-2xl">teachers/<br />parents login</button>
          </div>
        </div>
        <img src="/bottom (1).png" className="absolute w-[auto] h-[200px] top-[250px] z-[1]" />
      </section>
      <ToastContainer   />
    </main>
    </>
  )
}