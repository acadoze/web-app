"use client"
import TeacherHeader from "@/components/TeacherHeader"
import {useEffect, useState} from 'react'
import Link from "next/link";
import Footer from "@/components/Footer"

import { Orbitron, Poppins, Outfit } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});
import PlayerLoader from "@/components/PlayerLoader"
const outfit = Outfit({ subsets: ["latin"] });
import { useRouter  } from 'next/navigation'
import {useStore} from "@/hooks/useStore"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [classRooms, setClassRooms] = useState([])
  const [pageLoader, setPageLoader] = useState(true)
  const router = useRouter()
  const [profile, setProfile] = useState(false)
  
  useEffect(() => {
    let authToken = localStorage.getItem("authToken") || ""
    
    async function fUsers() {
      const fetchUser = await fetch(`${process.env["API_BASE"]}/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      return fetchUser
    } 

    async function fCR() {
      const fetchClassRooms = await fetch(`${process.env["API_BASE"]}/classRoom`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      return fetchClassRooms
    }

    Promise.all([fUsers(), fCR()])
    .then(async values => {
      const [profile, classRooms] = values
      const profileJson = await profile.json()
      const classRoomsJson = await classRooms.json()

      if (profile.status === 401 || classRooms.status === 401) {
        router.push("/auth")
        return
      }
      if (profile.status === 200 && classRooms.status === 200) {
        setProfile(profileJson.profile)
        setClassRooms(classRoomsJson.classRooms)
        setPageLoader(false)
      }

    })
    
  }, [])

  if (pageLoader) {
    return <PlayerLoader />
  }

  return (
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

          <div className="bg-electricPurple rounded-[50px] relative top-[156px] z-[1] h-[230px] w-[90%] shadow-2xl "></div>
        </div>


        <div className="flex flex-col items-center text-[white] x_spacing py-[4rem]">
          <h2 className={` ${outfit.className} font-[500] mb-[30px] uppercase text-[2rem] `}> 
            Your classes
          </h2>
          <div className="t_classes flex justify-start gap-x-[5px]">
            { classRooms.length > 0 &&
              classRooms.map(item => {
                return (
                  <Link className="relative flex flex-col items-center justify-center" key={item.id} href={item.link}>
                    <img src={item.img} className="z-[1]" />
                    <h3 className="absolute top-[60px] z-[3] text-[1.8rem] font-[500]"> {item.title} </h3>
                  </Link>
                )
              })
            }
            <Link className="relative flex flex-col bg-[white] items-center justify-center" href={'/'}>
              <img src={"/Plus_perspective_matte.png"} className="z-[1] h-[90px] w-[100px]" />
              <h3 className={`${orbitron.className} absolute top-[105px] z-[3] text-[1rem] font-[500]`}> 
                ADD A CLASS
              </h3>
            </Link>
          </div>
        </div>

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
  );
}

