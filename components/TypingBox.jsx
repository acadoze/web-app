import { BsSend } from "react-icons/bs";
import {askTutor} from "@/hooks/useStore"
import {useState} from 'react'
import {useStore} from "@/hooks/useStore"
import { ThreeCircles } from 'react-loader-spinner'

export default function TypingBox() {
  const askTutor = useStore(state => state.askTutor)
  const [question, setQuestion] = useState("")
  const loadingAnswer = useStore(state => state.loadingAnswer);

  return (
    <div className="w-[100%] flex justify-center items-center text-[.8rem]  mx-[auto] absolute z-[6] bottom-[5px]">
      <input 
        onChange={e => setQuestion(e.target.value)} 
        value={question} 
        placeholder="Type here" 
        className="text-[white] bg-[rgb(0,0,0,.2)] rounded-md px-3 py-2 border-0 outline-0" 
      />
      <button 
        className="flex justify-center items-center ml-2 bg-[#10c6fe] text-[white] border-0 rounded-[40px] px-1 py-1 py-[7px] px-[20px]"
        onClick={() => askTutor(question)}
      >
        Send
        {
          loadingAnswer &&
          <ThreeCircles
            visible={true}
            height="20"
            width="20"
            color="#fff"
            radius="9"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass="ml-2"
          />
        }
      </button>
      
    </div>
  )
}