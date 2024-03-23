import PlayerLoader from "@/components/PlayerLoader"
import { useEffect, useState, useRef, fragment } from "react"
import {useParams} from "next/navigation"
import { useRouter  } from 'next/navigation'
import { GrNext, GrPrevious } from "react-icons/gr";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Asssessment() {
  const [showLoader, setLoader] = useState(true)
  const [quiz, setQuiz] = useState(false)
  const {topicId} = useParams()
  const questionProgressRef = useRef(null)
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(false)
  const [responses, setResponses] = useState([])
  const [currentQOption, setCurrentQuestionCheckedOption] = useState("")


  useEffect(() => {
    async function fetchQuiz() {
      let authToken
      authToken = localStorage.getItem("authToken") || ""
      const quizRes = await fetch(`${process.env["API_BASE"]}/quiz?topicId=${topicId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      const jsonRes = await quizRes.json()

      if (quizRes.statusText === "OK") {
        setQuiz(jsonRes.quiz)
      } 
      if (quizRes.status === 401) {
        toast.error("Please log in to continue")
        router.push('/auth')
      }
    }
    fetchQuiz()
  }, [])

  useEffect(() => {
    console.log(quiz)
    if (quiz.questions?.length > 0) {
      setCurrentQuestion(quiz.questions[0])
    }
  }, [quiz])
  useEffect(() => {
    // setCu
  }, [responses])

  function submitQuiz(argument) {
    // body...
  }

  function setNextQ() {
    if (!currentQuestion) return
    const find = quiz.questions.findIndex(i => i.id === currentQuestion.id)
    if (quiz.questions[find+1] === undefined) return
    setCurrentQuestion(quiz.questions[find+1])
  }

  function setPrevQ() {
    if (!currentQuestion) return
    const find = quiz.questions.findIndex(i => i.id === currentQuestion.id)
    if (quiz.questions[find-1] === undefined) return
    setCurrentQuestion(quiz.questions[find-1])


  }

  function clickOption(e, questionId, optionId) {
    const find = responses.findIndex(i => i.questionId === questionId)
    if (find === -1 || responses.length === 0) {
      setResponses([...responses, {
        questionId, optionId, attempts: 0
      }])
    } 
    if (find !== -1) {
      let newResponses = responses
      newResponses[find].optionId = optionId
      newResponses[find].attempts +=1
      setResponses(newResponses)
    }
  }

  
  return (

    !quiz ? <PlayerLoader /> 
    : <div className="flex flex-col py-[15px] items-center w-[65%]">
        <h2 className={"my-5 text-[#2f3a5c] font-[500] text-[1.6rem] text-center"}> {quiz.title} </h2>
        {/*<progress ref={questionProgressRef} className="" max="100" value={0} step="10"></progress>*/}
        {
          currentQuestion &&
          <div className="flex flex-col justify-center py-[20px]">
            <p className="mb-[3rem] text-center">{currentQuestion.question}</p>
            {
              currentQuestion.options.map(option => {
                return <fragment key={option.id} >

                  <input 
                    id={option.id}
                    className="absolute hidden options"
                    type="radio"
                    name={currentQuestion.id}
                    checked={false}
                    onChange={(e) => clickOption(e, currentQuestion.id, option.id)}
                  />

                  <label 
                    className={`cursor-pointer rounded-md text-center py-2 flex justify-center w-full text-[white] my-2 bg-${option.clicked ? "lightCyan" : "darkCyan"} `} 
                    htmlFor={option.id}
                    >
                      {option.value} 
                    </label>
                    
                </fragment>

              })
            }
            <div className="flex justify-center gap-x-[10px] mt-5 text-[1.5rem]">
              <GrPrevious className={`cursor-pointer mr-[30px`} onClick={() => {
                setPrevQ()
              }} />
              <GrNext className={`cursor-pointer`} onClick={() => {
                setNextQ()
              }} />
            </div>
          </div>

        }
          <button className="absolute bottom-[10px] bg-lightCyan px-5 py-2 rounded-md text-[white]"> SUBMIT </button>

    </div>
      
    
  )
}