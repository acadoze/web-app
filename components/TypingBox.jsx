import { BsSend } from "react-icons/bs";
import {askTutor} from "@/hooks/useStore"
import {useState} from 'react'
import {useStore} from "@/hooks/useStore"

export default function TypingBox() {
  const askTutor = useStore(state => state.askTutor)
  const topic = useStore(state => state.topic);
  const [question, setQuestion] = useState("")

  return (
    <div className="w-[100%] flex justify-center items-center text-[.8rem]  mx-[auto] absolute z-[6] bottom-[5px]">
      <input 
        onChange={e => setQuestion(e.target.value)} 
        value={question} 
        placeholder="Type here" 
        className="text-[white] bg-[rgb(0,0,0,.2)] rounded-md px-3 py-2 border-0 outline-0" 
      />
      <button 
        className="ml-2 bg-[#10c6fe] text-[white] border-0 rounded-[40px] px-1 py-1 py-[7px] px-[20px]"
        onClick={() => askTutor(topic, question)}
      >
        Send
      </button>
      
    </div>
  )
}