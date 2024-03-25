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
  const [studentName, setName] = useState("Alex")
  const assignedTopics = useStore(state => state.assignedTopics)
  const setAssignedTopics = useStore(state => state.setAssignedTopics)
  const router = useRouter()
  
  
  useEffect(() => {
    async function fetchTopics(argument) {
      let authToken
      authToken = localStorage.getItem("authToken") || ""
      const topics = await fetch(`${process.env["API_BASE"]}/student/topics`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      let jsonRes = await topics.json()
      if (topics.status === 401) {
        router.push('/auth')
      } else {
        topics && setAssignedTopics(jsonRes.topics)
      }
    }
    fetchTopics()
    
    
  }, [])

  return (

    <main className="">
      <StudentHeader name={studentName} />
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
               <img src="Mask group.png" className="absolute left-[30px] h-[250px] w-[auto] top-[-32px]" />
            </div>

          </div>

          <div className="bg-electricPurple rounded-[50px] relative top-[156px] z-[1] h-[230px] w-[90%] shadow-2xl "></div>
        </div>

        <div className="flex flex-col  text-[white] x_spacing ">
          <h2 className={` ${outfit.className} font-[500] mb-[30px] text-[2rem] w-[500px]`}> 
          { assignedTopics.length === 0 ?
            `Hey ${studentName} you have not yet been assigned a topic `
            : `Hey ${studentName} you have been assigned the following: `
          }
          </h2>
          <div className="flex justify-start gap-x-[5px] topics">
            { assignedTopics.length > 0 &&
              assignedTopics.map(topic => {
                return (
                  <Link className="relative" key={topic.id} href={`/learn/${topic.Topic.id}`}>
                    <img src={"/Mask group (1).png"} className="z-[1]" />
                    <div className="z-[2] h-[inherit] w-[inherit] absolute" />
                    <h3 className="absolute top-[60px] z-[3] text-[1.8rem] font-[500]"> {topic.Topic.title} </h3>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </section>
    </main>
  );
}

