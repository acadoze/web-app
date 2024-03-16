"use client"
import StudentHeader from "@/components/StudentHeader"
import {useState, useEffect} from 'react'
import Experience from "@/components/Player/Experience"

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const [studentName, setName] = useState("Alex");
  useEffect(() => {
    
  }, [])

  return (
    <main className="">
      <StudentHeader name={studentName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="x_spacing flex justify-center items-center flex-col relative">
          <img src="Group 77808.png" className="w-[auto] h-[450px]" />
          <h2 className={`${outfit.className} absolute top-[80%] text-[1.5rem] text-[white] font-[600]`}> HISTORY </h2>
        </div>

        <div className="w-[600px] h-[400px] mx-[auto] bg-[white] rounded-2xl">
          <Experience />
        </div>
      </section>
    </main>
  );
}