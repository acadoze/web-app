"use client"
import StudentHeader from "@/components/StudentHeader"
import {useState, useEffect} from 'react'
import Watch from "@/components/LearningMode/Watch"
import Assessment from "@/components/LearningMode/Assessment"
import Canvas from "@/components/LearningMode/Tutor/Canvas"
import Read from "@/components/LearningMode/Read"
import { useParams } from "next/navigation"
import {useStore} from "@/hooks/useStore"
import TypingBox from "@/components/TypingBox"

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const [studentName, setName] = useState("Alex");
  const [learningMode, setLearningMode] = useState("watch")
  const setTopic = useStore(state => state.setTopic)
  const {topic} = useParams()

  useEffect(() => {
    setTopic(topic)
  }, [])


  return (
    <main className="">
      <StudentHeader name={studentName} />
      <section className="bg-blue pb-[3rem] ">
        <div className="x_spacing flex justify-center items-center flex-col relative">
          <img src="/Group 77808.png" className="w-[auto] h-[450px]" />
          <h2 className={`${outfit.className} absolute top-[80%] text-[1.5rem] text-[white] font-[600]`}> HISTORY </h2>
        </div>

        <div className="w-[650px] h-[400px] mx-[auto] bg-[white] rounded-2xl relative">
          {
            <div className="w-[inherit] h-[340px] mx-[auto] bg-[white] shadow-2xl rounded-[inherit] relative">
              {
                learningMode === "watch" ?
                  <Watch />
                : learningMode === "assessment" ?
                  <Assessment />
                : learningMode === "tutor" ?
                  <><TypingBox />
                  <Canvas /></>
                : <Read />
              }
            </div>
          }
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