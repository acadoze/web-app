"use client"
import StudentHeader from "@/components/StudentHeader"
import {useEffect, useState} from 'react'
import Link from "next/link";

import { Orbitron, Poppins, Outfit } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});
const outfit = Outfit({ subsets: ["latin"] });
import { useRouter  } from 'next/navigation'
import {useStore} from "@/hooks/useStore"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [classRooms, setClassRooms] = useState([])
  const [user, setUser] = useState({})
  const [loader, setLoader] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    let authToken
    localStorage.getItem("authToken") || ""
    
    async function fUsers() {
      const fetchUser = await fetch(`${process.env["API_BASE"]}/teacher`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const jsonRes = await fetchUser.json()
      console.log(jsonRes)
      if (fetchUser.status === 401) {
        router.push('/auth')
      } else {
        fetchUser && setUser(jsonRes.teacher)
      }
    } 

    async function fCR() {
      const fetchClassRooms = await fetch(`${process.env["API_BASE"]}/classRoom`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const jsonRes = await fetchClassRooms.json()
      if (fetchClassRooms.status === 401) {
        router.push('/auth')
      } else {
        setClassRooms(jsonRes.classRooms)
      }
    }

    new Promise.all([fUsers(), fCR()])
    .then(res => {
       
    })

    fUsers()
    fCR()
    
  }, [])

  if (loader) {
    return <></>
  }

  return (

    <main className="">
      <StudentHeader name={user.fullName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="flex flex-col items-center x_spacing h-[625px] w-[780px] mx-[auto]">
          <div className=" relative h-[700px] w-[inherit]">
            {/*<div className="bg-lightCyan rounded-[50px] h-[280px] shadow-2xl mb-[35px]"></div>*/}
            <img src="/top.png" className="z-[1]" />

            <div className={`${orbitron.className} z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] left-[10%] top-[220px] w-[630px] shadow-2xl absolute`}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.3rem] font-[900] mb-4"> welcome <span className={`block text-[.8rem] font-[600] ${poppins.className} `}>{user.fullName}</span> </h1>
                <p className={`${poppins.className} text-[.75rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
              
              <div className="flex flex-col absolute left-[185px] top-[35px]">
                <img src="/duo/br-circle.png" className="w-[250px] h-[250px] relative bottom-[80px]" />
                 <img src="Mask group.png" className="absolute left-[30px] h-[200px] w-[auto] top-[-32px]" />
              </div>

            </div>

            <div className="bg-electricPurple rounded-[50px] relative top-[-134px] z-[1] h-[230px] w-[780px] shadow-2xl "></div>
          </div>
        </div>

        <div className="flex flex-col  text-[white] x_spacing ">
          <h2 className={` ${outfit.className} font-[500] mb-[30px] uppercase text-[2rem] w-[500px]`}> 
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
            <Link className="relative flex flex-col items-center justify-center" href={'/'}>
              <img src={"/Plus_perspective_matte.png"} className="z-[1] h-[100px] w-[100px]" />
              <h3 className={`${orbitron.className} absolute top-[60px] z-[3] text-[1.8rem] font-[500]`}> 
                ADD CLASSES
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

