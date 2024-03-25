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
  const [showWarning, setWarning] = useState(false)
  const [responses, setResponses] = useState([])
  const fetchController = useRef(null)

  useEffect(() => {
    async function fetchQuiz() {
      let authToken = localStorage.getItem("authToken") || ""
      const quizRes = await fetch(`${process.env["API_BASE"]}/quiz?topicId=${topicId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      const jsonRes = await quizRes.json()

      if (quizRes.status === 200) {
        toast.info(jsonRes.message)
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
    if (quiz.questions?.length > 0) {
      setCurrentQuestion(quiz.questions[0])
    }
  }, [quiz])

  async function submitQuiz() {
    if (responses.length===0) {
      toast.error("You have not started the quiz yet")
      return
    }
    toast.info(
      "This quiz is being submitted. You can halt this submission by clicking the close button", {
        onClose: async () => {
          if (fetchController) fetchController.current.abort()
        } ,
        closeButton: true
      }
    )
    let authToken = localStorage.getItem("authToken") || ""
    fetchController.current = new AbortController()
    const sendResponse = await fetch(`${process.env["API_BASE"]}/quiz/${quiz.id}/submit`, {
      signal: fetchController.current.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      method: "PUT",
      body: JSON.stringify({responses})
    })

    const jsonRes = await sendResponse.json()
    if (sendResponse.status === 200) {
      toast.info(jsonRes.message)
    } else {
      toast.error(jsonRes.message)
    }
    
  }

  function setNextQ() {
    if (!currentQuestion) return
    const find = quiz.questions.findIndex(i => i.id === currentQuestion.id)
    if (quiz.questions[find+1] === undefined) return
    const nFind = responses.findIndex(i => i.questionId === currentQuestion.id)
    setCurrentQuestion(quiz.questions[find+1])



  }

  function setPrevQ() {
    if (!currentQuestion) return
    const find = quiz.questions.findIndex(i => i.id === currentQuestion.id)
    if (quiz.questions[find-1] === undefined) return
    const nFind = responses.findIndex(i => i.questionId === currentQuestion.id)
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

    setCurrentQuestion({...currentQuestion, clicked: optionId})
  }

  
  return (

    !quiz ? <PlayerLoader /> 
    : <><div className="flex flex-col py-[15px] items-center w-[65%]">
        <h2 className={"my-5 text-[#2f3a5c] font-[500] text-[1.6rem] text-center"}> {quiz.title} </h2>
        {/*<progress ref={questionProgressRef} className="" max="100" value={0} step="10"></progress>*/}
        {
          currentQuestion &&
          <div className="flex flex-col justify-center py-[20px] w-[450px]">
            <p className="mb-[3rem] text-center">{currentQuestion.question}</p>
            {
              currentQuestion.options.map(option => {
                return <fragment key={option.id} >

                  <input 
                    id={option.id}
                    className="absolute hidden options"
                    type="radio"
                    name={currentQuestion.id}
                    checked={responses.findIndex(i => i.questionId === currentQuestion.id && i.optionId === option.id) !== -1 ? true : false}
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
            <div className="flex justify-center absolute bottom-[37px] left-[200px] gap-x-[30px] mt-5 text-[1.5rem]">
              <GrPrevious className={`cursor-pointer mr-[30px`} onClick={() => {
                setPrevQ()
              }} />
              <GrNext className={`cursor-pointer`} onClick={() => {
                setNextQ()
              }} />
            </div>
          </div>

        }
          <button 
            className="absolute bottom-[10px] bg-darkCyan px-5 py-2 rounded-md text-[white]" 
            onClick={() => setWarning(true)}
          > 
            SUBMIT 
            
           
          </button>
          {
            showWarning &&
             <div className="absolute shadow-2xl px-4 py-5 z-[50] bg-[white] rounded-md w-[300px] bottom-[30px] flex flex-col right-[125px]">
                <p className="mb-3"> Are you sure you want to end the Asssessment? You cannot retake this quz after submission </p>
                <div className="flex">
                  <span className="px-4 cursor-pointer bg-[#00c2ff] mr-5 rounded-md text-[white] block py-2" onClick={() => setWarning(false)}> Cancel </span>
                  <span className="px-4 cursor-pointer bg-[#52d6ff] rounded-md text-[white] block py-2" onClick={() => submitQuiz()}> Submit </span>
                </div>
              </div>
          }

    </div>
      <ToastContainer />
      </>
    
  )
}
