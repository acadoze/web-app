"use client"
import StudentHeader from "@/components/StudentHeader"
import {useState, useEffect} from 'react'
import Watch from "@/components/LearningMode/Watch"
import Assessment from "@/components/LearningMode/Assessment"
import Experience from "@/components/LearningMode/Tutor/Experience"
import Read from "@/components/LearningMode/Read"

import { Outfit } from "next/font/google";
import { useStore } from "../../hooks/useStore";
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const learningMode = useStore(state => state.learningMode)
  const setLearningMode = useStore(state => state.setLearningMode)
  const [studentName, setName] = useState("Alex");

  useEffect(() => {
    console.log(learningMode)
  }, [learningMode])

  return (
    <main className="">
      <StudentHeader name={studentName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="x_spacing flex justify-center items-center flex-col relative">
          <img src="Group 77808.png" className="w-[auto] h-[450px]" />
          <h2 className={`${outfit.className} absolute top-[80%] text-[1.5rem] text-[white] font-[600]`}> HISTORY </h2>
        </div>

        <div className="w-[650px] h-[400px] mx-[auto] bg-[white] rounded-2xl relative">
          <div className="w-[inherit] h-[340px] mx-[auto] bg-[white] shadow-2xl rounded-[inherit]">
            {
              learningMode === "watch" ?
                <Watch />
              : learningMode === "assessment" ?
                <Assessment />
              : learningMode === "tutor" ?
                <Experience />
              : <Read />
            }
          </div>
          <div className="absolute bottom-[-17px] z-[4] w-[100%] flex justify-center gap-x-[10px]">
            {
              ["watch", "tutor", "read", "assessment"].map((mode, i) => {
                return (
                  <button 
                    key={i} 
                    onClick={() => setLearningMode(mode)}
                    className={`mode_btn rounded-[50px] border-[2] bg-[white] border-solid border-lightCyan px-5 py-3 uppercase text-[.6rem] ${learningMode === mode ? "active_l" : ""}`}
                  > 
                    {mode}
                  </button>
                )
              })
            }
          </div>
        </div>
      </section>
    </main>
  );
}