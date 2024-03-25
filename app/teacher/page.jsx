"use client"
import TeacherHeader from "@/components/TeacherHeader"
import {useEffect, useState} from 'react'
import Link from "next/link";
import Footer from "@/components/Footer"
import { FaRegTimesCircle } from "react-icons/fa";
import { CiHome } from "react-icons/ci";

import { Orbitron, Poppins, Outfit } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});
import PlayerLoader from "@/components/PlayerLoader"
const outfit = Outfit({ subsets: ["latin"] });
import { useRouter  } from 'next/navigation'
import {useTeacherPage} from "@/hooks/useStore"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner'
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoArrowUndoOutline } from "react-icons/io5";

export default function Home() {
  const [pageLoader, setPageLoader] = useState(true)
  const router = useRouter()


  const [currentTab, setCurrentTab] = useState("classes")

  const profile = useTeacherPage(state => state.profile)
  const setProfile = useTeacherPage(state => state.setProfile)

  const showSubBanner = useTeacherPage(state => state.showSubBanner)
  const setSubBanner = useTeacherPage(state => state.setSubBanner)

  const resources = useTeacherPage(state => state.resources)
  const setResources = useTeacherPage(state => state.setResources)

  
  useEffect(() => {
    let authToken = localStorage.getItem("authToken") || ""
    
    async function fU(argument) {
     const fetchUser = await fetch(`${process.env["API_BASE"]}/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const jSon = await fetchUser.json()

      if (fetchUser.status === 401 ) {
        router.push("/auth")
        return
      }
      if (fetchUser.status === 200) {
        setProfile(jSon.profile)
        setPageLoader(false)
      }
    }
    fU()
  }, [])

  if (pageLoader) {
    return <PlayerLoader />
  }

  return (
    <>
    <main className="">
      <TeacherHeader name={profile.fullName} />
      <section className="bg-blue pb-[3rem] ">
         <div className=" relative h-[700px] x_spacing w-[inherit] items-center flex flex-col">
            {/*<div className="bg-lightCyan rounded-[50px] h-[280px] shadow-2xl mb-[35px]"></div>*/}
            <img src="/top.png" className="z-[1] w-full absolute" />

            <div className={`${orbitron.className} z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] relative top-[200px] w-[85%] top-[300px] shadow-2xl `}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.3rem] font-[900] mb-4"> welcome <span className={`block text-[.8rem] font-[600] ${poppins.className} `}>alex</span> </h1>
                <p className={`${poppins.className} text-[.75rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
              
              <div className="flex flex-col relative left-[67px] top-[-10px]">
                <img src="/duo/br-circle.png" className="w-[300px] h-[300px] relative bottom-[80px]" />
                 <img src="teacher_dp.png" className="absolute left-[30px] h-[250px] w-[auto] top-[-32px]" />
              </div>

            </div>

            <div className="bg-electricPurple rounded-[50px] flex items-end  justify-center relative top-[156px] z-[1] h-[230px] w-[90%] shadow-2xl ">
              <div className="absolute bottom-[-18px] flex gap-x-[10px]">{
                ["classes", "students", "resources"].map((i, idx) => {
                  return <button onClick={() => setCurrentTab(i)} className={`p-[5px] text-[.88rem] border-solid border-lightCyan rounded-[40px] w-[100px] h-[50px] capitalize ${currentTab === i ? "active_l" : "bg-[white]"}  `} key={idx}>{i} </button>
                })
              }</div>
            </div>
          </div>
        {
          currentTab === "classes" ? <ClassTab />
          : currentTab === "students" ? <StudentTab  />
          : <ResourceTab />
        }

        

        <div className={`flex ${outfit.className} px-5 justify-center px-[2.5rem]  text-[white] x_spacing  mt-[5rem]`}>
          <div className="relative py-[2rem] px-[4rem] h-[200px] rounded-[30px] bg-[#659bd5]  w-[70%]">
            <h3 className="mb-[10px] text-[1.6rem]"> Questions? </h3>
            <ul className="pl-3 text-[1rem]">
              <li className="mt-3">Do you need help setting up your classrooms?</li>
            </ul>
            <div className="flex items-center absolute gap-y-[10px] top-[10px] right-[50px] flex-col">
            
              <img src="/Message_perspective_matte.png" className="w-[auto] h-[100px]" />
              <Link href="/contact" className="uppercase text-[1rem] py-1 px-2 bg-[#00c2ff] rounded-2xl h"> Let&apos;s talk </Link>
            </div>
          </div>

          
        </div>
      </section>

     

      <Footer />
    </main>
    <ToastContainer />
    </>
  );
}

function ClassTab() {
  const [showAdd, setAdd] = useState(false)
  const router = useRouter()
  const [showLoader, setLoader] = useState(false)

  const classRooms = useTeacherPage(state => state.classRooms)
  const setClassRooms = useTeacherPage(state => state.setClassRooms)

  const setActiveClassRoom = useTeacherPage(state => state.setActiveClassRoom)
  const activeClassRoom = useTeacherPage(state => state.activeClassRoom)


  async function fetchClassSubs() {
    let authToken = localStorage.getItem("authToken") || ""
    const fCR = await fetch(`${process.env["API_BASE"]}/classRoom`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    const jSon = await fCR.json()

    if (fCR.status === 401) {
      router.push("/auth")
      return
    }
    if (fCR.status === 200) {
      setClassRooms(jSon.classRooms)
    }

  }

  async function fClassRooms(argument) {
    setLoader(true)
    let authToken = localStorage.getItem("authToken") || ""
    const fCR = await fetch(`${process.env["API_BASE"]}/classRoom`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    const jSon = await fCR.json()

    if (fCR.status === 401) {
      router.push("/auth")
      return
    }
    if (fCR.status === 200) {
      setClassRooms(jSon.classRooms)
    }

    setLoader(false)
  }
  useEffect(() => {
    if (!classRooms) fClassRooms()
  }, [])

  if (showLoader) {
    return <PlayerLoader />
  }

  if (activeClassRoom && Object.keys(activeClassRoom).length > 0) {
    return (
      <>
      <div className="relative x_spacing">
        <IoArrowUndoOutline onClick={() => {
          setActiveClassRoom(null)
        }} className="absolute top-0 left-[150px] text-[2rem] text-[white]" />

        <div className="flex flex-col items-center text-[white] x_spacing py-[4rem]">
          <h2 className={` ${orbitron.className} font-[500] mb-[30px] uppercase text-[2rem] `}> 
            {activeClassRoom.name}
          </h2>
         <div className="flex">
            {
              [{text: 'not yet started', color: "#fff"}, {text: 'needs help', color: "#FF75F1"}, {text: 'getting there', color: "#B479FF"}, {text: 'on track', color: "#892CFF"}, {text: 'mastery', color: "#0DC5FF"}]
              .map((i, idx) => {
                return (
                  <button key={idx} className=" flex flex-col items-center">
                    <span className={`h-[35px] w-[130px] mb-2`} style={{background: i.color}} ></span>
                    <span className="text-[.9rem] capitalize"> {i.text} </span>
                  </button>
                )
              })
            }
         </div>
         <div className="bg-[#DAF7FF] mt-[5rem] px-3 ">
           <table className="s_table">
              <thead className="">
                <tr>
                  {
                    ["student", "last active", "Egyptian Geography ", "king tut", "Hieroglyphics"]
                    .map((i, idx) => {
                      return <th className="bg-[#AEECFF] font-[400] text-[#000] text-[.9rem] capitalize px-[40px] pb-[5px] pt-[15px]"> {i} </th> 
                    })
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex items-center">
                    <img src="/Mask group.png" className="w-[auto] h-[50px]" />
                    <span className="text-[.8rem] text-darkCyan"> Alex </span>
                  </td>
                  <td className="">
                    <span className="text-[.8rem] text-[#000]"> 2024/09/04 </span>
                  </td>
                  <td className="">
                    <span className="text-[.8rem] px-3 py-2 text-[white] bg-[#FF75F1]"> NEEDS HELP </span>
                  </td>
                  <td className="">
                    <span className="text-[.8rem] px-3 py-2 text-[white] bg-[#0DC5FF]"> Mastery </span>
                  </td>
                  <td className="">
                    <span className="text-[.8rem] px-3 py-2 text-[white] bg-[#892CFF]"> ON TRACK </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
    
    <div className="flex flex-col items-center text-[white] x_spacing py-[4rem]">
      <h2 className={` ${orbitron.className} font-[500] mb-[30px] uppercase text-[2rem] `}> 
        Your classes
      </h2>
      <div className="t_classes flex justify-start gap-x-[30px]">
        { classRooms && classRooms.length > 0 &&
          classRooms.map(item => {
            return (
              <button onClick={() => setActiveClassRoom(item)} className="relative  bg-[white] flex flex-col items-center justify-center" key={item.id} >
                <img src={"/Diagram_perspective_matte.png"} className="z-[1]" />
                <h3 className="absolute top-[105px] z-[3] text-[1rem] font-[500]"> {item.name} </h3>
              </button>
            )
          })
        }
        <button onClick={() => {
          setAdd(true); 
          console.log(showAdd)
        }}
          className="relative flex flex-col bg-[white] items-center justify-center" >
          <img src={"/Plus_perspective_matte.png"} className="z-[1] h-[90px] w-[100px]" />
          <h3 className={`${orbitron.className} absolute top-[105px] z-[3] text-[1rem] font-[500]`}> 
            ADD A CLASS
          </h3>
          {
            showAdd && <AddClassRoom close={() => setAdd(false)} onSuccess={fClassRooms} />
          }
        </button>
        
      </div>
    </div>
    </>
  )
}

function AddClassRoom({close, onSuccess}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [showLoader, setLoader] = useState(false)

  async function addClassRoom() {
    let authToken = localStorage.getItem("authToken") || ""
    setLoader(true)

    const addClass = await fetch(`${process.env["API_BASE"]}/classRoom`, {
      method: "POST",
      body: JSON.stringify({name}),
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    })
    const jSon = await addClass.json()
    if (addClass.status === 401) {
      router.push("/auth")
      return
    }
    if (addClass.status === 201) {
      onSuccess()
      toast.info(jSon.message)
      close()
    }
    else {
     toast.error(jSon.message)
    }

    setLoader(false)

  }

  return  (
    <div className="rounded-2xl flex justify-center flex-col items-center bg-[white] absolute z-[10] left-[121px] top-[52px]">
      <FaRegTimesCircle className="absolute text-[black] top-[15px] right-[15px]" onClick={() => close()} />
      <form className="px-[20px] py-[20px]" onSubmit={e => {
        e.preventDefault()
        addClassRoom()
      }}>
        <li>
          <input type="text" className="px-4 py-5 border-0 text-[#000] outline-0" placeholder="Class Name" value={name} onChange={e => setName(e.target.value)} />
        </li>
        <div className="flex justify-center gap-x-[10px]">
          <button 
            className="w-full align-center uppercase text-white flex justify-center items-center bg-darkCyan text-[white] px-[10px] rounded-md py-[8px]" 
            disabled={showLoader}
          > 
            ADD
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
  )
}

function ResourceTab(argument) {
  return (
    <div className="flex flex-col items-center text-[white] x_spacing py-[4rem]">
      <h2 className={` ${orbitron.className} font-[500] mb-[30px] uppercase text-[2rem] `}> 
       what are we learning today?
      </h2>
      <div className="flex justify-center  gap-y-[30px] gap-x-[30px] w-[60%] flex-wrap mx-[auto]">
        { ["history", "science", "geography", "hour of code", "life skills", "arts", "digital civilization"]
          .map((item, idx) => {
            return (
              <button className={` ${orbitron.className} h-[60px] w-[130px] rounded-[40px] bg-lightCyan relative flex flex-col items-center text-[.8rem] uppercase justify-center`} key={idx} >
                {item}
              </button>
            )
          })
        }
        
      </div>
    </div>
  )
}
function StudentTab() {

  const students = useTeacherPage(state => state.students)
  const setStudents = useTeacherPage(state => state.setStudents)
  const setCurrentStudentRecord = useTeacherPage(state => state.setCurrentStudentRecord)
  const currentStudentRecord = useTeacherPage(state => state.currentStudentRecord)

  const [loader, setLoader] = useState(false)
  const [showRecord, setRecord] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let authToken = localStorage.getItem("authToken") || ""

    async function fStud(argument) {
      const fetchStudents = await fetch(`${process.env["API_BASE"]}/student`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const jSon = await fetchStudents.json()

      if (fetchStudents.status === 401) {
        router.push("/auth")
        return
      }
      if (fetchStudents.status === 200) {
        toast.info(jSon.message)
        setStudents(jSon.students)
      }

      setLoader(false)
    }

    if (!students) {
      fStud()
    } else {
      setLoader(false)
    }
    
  }, [])

  if (loader) {
    return <PlayerLoader />
  }
  if (currentStudentRecord && Object.keys(currentStudentRecord).length > 0) {
    return <StudentRecord />
  }
  return (
    <div className="flex flex-col items-center text-[white] x_spacing py-[4rem]">
      <h2 className={` ${outfit.className} font-[500] mb-[30px] uppercase text-[2rem] `}> 
        Your students
      </h2>
      <div className="t_classes flex justify-start gap-x-[5px]">
        { 
          [{name: "Alex"}].map((item, idx) => {
            return (
              <button onClick={() => setCurrentStudentRecord(item)} className="relative flex flex-col items-center justify-center" key={idx} href={item.link}>
                <img src={"/Mask group.png"} className="z-[1] h-[100px] w-[auto]" />
              </button>
            )
          })
        }
        
      </div>
    </div>
  )
}

function StudentRecord() {
  const currentStudentRecord = useTeacherPage(state => state.currentStudentRecord)
  const setCurrentStudentRecord = useTeacherPage(state => state.setCurrentStudentRecord)
  return (

    <div className={` ${orbitron.className} x_spacing my-[4rem] relative`}>
      <IoArrowUndoOutline onClick={() => setCurrentStudentRecord(null)} className="absolute top-0 left-[150px] text-[2rem] text-[white]" />
      <div className="flex text-[.9rem] flex-col items-center w-[400px] mx-[auto]">
        <div className="flex items-center mb-[2rem]">
          <img className="w-[auto] h-[80px]" src="/Mask group.png" />
          <h2 className="font-[500] text-[1.3rem] text-[white]"> ALEX'S<br /> PROFILE </h2>
        </div>

        <div className="w-full mb-[1.7rem] relative mb-[35px]">
          <li className="text-[white] w-[200px] flex"> <span> USERNAME: </span> <span className="s_right">  Alex201 </span> </li>
          <li className="text-[white] w-[200px] flex"> <span> PASSWORD: </span> <span className="s_right">  Pass </span> </li>
          <li className="text-[white] w-[200px] flex"> <span> CLASS: </span>  <span className="s_right"> GRADE 3</span> </li>
        </div>
        <div className="text-[white] w-full relative mb-[35px]">
          <span> COMPLETED ASSIGNMENTS </span>
          <li><span className="flex gap-x-[2rem] relative left-[230px] text-[#bfbfbf]"> MUMIFICATION 50% </span></li>
          <li><span className="flex gap-x-[2rem] relative left-[230px] text-[#bfbfbf]"> Egyptian Geography 50% </span></li>
          <li><span className="flex gap-x-[2rem] relative left-[230px] text-[#bfbfbf]"> King Tut 50% </span></li>
        </div>
        <div className="text-[white] relative w-full mb-[35px]">
          <span> MISSING ASSIGNMENTS </span>
          <li><span className="flex gap-x-[2rem] relative left-[230px] text-[#bfbfbf]"> MUMIFICATION  </span></li>
        </div>
        <div className="text-[white] w-full mb-[35px]">
          <span className='mb-2'>OVERALL ANALYSIS </span>
          <div className="flex relative">
            <img src="/Mask group.png" className="absolute right-[-33px] bottom-[55px] h-[40px] w-[auto]" />
            {
              [{text: 'not yet started', color: "#fff"}, {text: 'needs help', color: "#FF75F1"}, {text: 'getting there', color: "#B479FF"}, {text: 'on track', color: "#892CFF"}, {text: 'mastery', color: "#0DC5FF"}]
              .map((i, idx) => {
                return (
                  <button key={idx} className=" flex flex-col items-center">
                    <span className={`h-[34px] w-[120px] mb-1`} style={{background: i.color}} ></span>
                    <span className="text-[.7rem] capitalize"> {i.text} </span>
                  </button>
                )
              })
            }
         </div>
        </div>

        <div className="text-[white] mt-[2rem] w-full">
          <span className="">RECOMMENDATION <span className="text-[#bfbfbf] "> .(use the + to assign to alex </span></span>
          <span className="flex items-center text-[white]"> <img src="/Plus_perspective_matte.png" className="w-[auto] h-[25px]" />MUMIFICATION </span>
          <span className="flex items-center text-[white]"> <img src="/Plus_perspective_matte.png" className="w-[auto] h-[25px]" />PYRAMIDS </span>
        </div>
      </div>
    </div>
  )
}