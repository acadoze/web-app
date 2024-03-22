"use client"
import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { ThreeCircles } from 'react-loader-spinner'
import { Orbitron, Poppins, Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import { FaRegTimesCircle } from "react-icons/fa";
import { useRouter  } from 'next/navigation'
import {useStore} from "@/hooks/useStore"

function Auth({hidePopup, role}) {

  const [authType, setAuthType] = useState("put")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [showLoader, setLoader] = useState(false)
  const setAuthToken = useStore(state => state.setAuthToken)
  const router = useRouter()

  function signIn(argument) {
    fetch(`${process.env.API_BASE}/auth?role=${role}`, {
      body: JSON.stringify({email, password}),
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async (response) => {
      let jsonRes = await response.json()
      if (response.status === 200) {
        router.push('/' + role)
        localStorage.setItem("authToken", jsonRes.data.authToken)
      } else {
        toast.warn(jsonRes.message)
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setLoader(false)
    })
  }
  function signUp(argument) {
    fetch(`${process.env.API_BASE}/auth?role=${role}`, {
      body: JSON.stringify({email, password, fullName}),
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async (response) => {
      let jsonRes = await response.json()
      if (response.status === 201) {
        toast.info(jsonRes.message)
      } else {
        toast.warn(jsonRes.message)
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setLoader(false)
    })
  }

  function handleForm(argument) {
    setLoader(true)
    if (authType === "put") signIn()
    if (authType === "post") signUp()
  }

  return (
    <div className="bg-[rgb(0,0,0,0.4)]  fixed w-[100vw] flex justify-center items-center h-[100vh] z-[4]">
      <div className="rounded-2xl min-h-[400px] pb-[35px] w-[600px] flex justify-center flex-col items-center bg-[white] relative">
        <FaRegTimesCircle className="absolute top-[15px] right-[15px]" onClick={hidePopup} />
        <form className="site_form" onSubmit={e => {
          e.preventDefault()
          handleForm({email, password})
        }}>
          <h2 className="uppercase text-[1.5rem] ">
            {
              authType === "put" ? "log IN " : "register "
            }
            as a 
            {
              role === "student" ? " STuDENT" : " teacher"
            }
          </h2>
          <p className="mb-5">
            {
              authType === "put" ? 
                <button  type="button"> Not registered?&nbsp; <span className="text-darkCyan" onClick={() => {setAuthType("post")}}> Register </span> </button>
              :  <button type="button"> 
                  Already have an account?&nbsp;
                  <span className="text-darkCyan"  onClick={() => {setAuthType("put")}}>Log In </span>
                </button>
            }
          </p>
          {
            authType === "post" &&
            <li>
              <label htmlFor="name"> Full name </label>
              <input type="text" id="name" className="" value={fullName} onChange={e => setFullName(e.target.value)} />
            </li>
          }
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
              className="w-full align-center uppercase text-white flex justify-center items-center bg-darkCyan text-[white] px-[10px] rounded-md py-[8px]" 
              disabled={showLoader}
            > 
              {
                authType === "put" ? "log in" : "register"
              }
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
                  wrapperClass="ml-1"
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
  const [currentPopup, setCurrentPopup] = useState("")

  function hidePopup(argument) {
    setCurrentPopup("")
  }

  return (
    <>
    {
      currentPopup === "student" &&
        <Auth hidePopup={hidePopup} role={"student"} />
    }
    {
      currentPopup === "teacher" &&
        <Auth hidePopup={hidePopup} role={"teacher"} />
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