"use client"
import StudentHeader from "@/components/StudentHeader"
import Footer from "@/components/Footer"
import {useState} from 'react'
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn  } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";

import { Orbitron, Poppins, Outfit } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const [studentName, setName] = useState("Alex")
  const [topics, setTopics] = useState([
    {
      title: "History",
      img: "/Mask group (1).png",
      link: "/learn/1/1",
      id: 1
    },
    {
      title: "Science",
      img: "/Mask group (2).png",
      link: "/learn/1/1",
      id: 2
    }
  ])

  // function displayBg(e) {
  //   const 
  // }

  return (
    <main className="">
      <StudentHeader name={studentName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="flex flex-col items-center x_spacing h-[625px] w-[780px] mx-[auto]">
          <div className=" relative h-[700px] w-[inherit]">
            {/*<div className="bg-lightCyan rounded-[50px] h-[280px] shadow-2xl mb-[35px]"></div>*/}
            <img src="/top.png" className="z-[1]" />

            <div className={`${orbitron.className} z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] left-[10%] top-[220px] w-[630px] shadow-2xl absolute`}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.3rem] font-[900] mb-4"> welcome <span className={`block text-[.8rem] font-[600] ${poppins.className} `}>alex</span> </h1>
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
          <h2 className={` ${outfit.className} font-[500] mb-[30px] text-[2rem] w-[500px]`}> Hey {studentName} you have been assigned the following: </h2>
          <div className="flex justify-start gap-x-[5px] topics">
            {
              topics.map(topic => {
                return (
                  <Link className="relative" key={topic.id} href={topic.link}>
                    <img src={topic.img} className="z-[1]" />
                    <div className="z-[2] h-[inherit] w-[inherit] absolute" />
                    <h3 className="absolute top-[60px] z-[3] text-[1.8rem] font-[500]"> {topic.title} </h3>
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

