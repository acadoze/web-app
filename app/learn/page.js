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
  const [studentName, setName] = useState("Alex");

  return (
    <main className="">
      <StudentHeader name={studentName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="x_spacing flex justify-center items-center flex-col relative">
          <img src="Group 77808.png" className="w-[auto] h-[450px]" />
          <h2 className={`${outfit.className} absolute top-[80%] text-[1.5rem] text-[white] font-[600]`}> HISTORY </h2>
        </div>

        <div className="flex flex-col  text-[white] x_spacing ">
          <div className="flex justify-start gap-x-[5px] topics">
            
          </div>
        </div>
      </section>
    </main>
  );
}

