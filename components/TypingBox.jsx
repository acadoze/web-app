import { BsSend } from "react-icons/bs";
import {askTutor} from "@/hooks/useStore"
import {useState, useEffect, useRef} from 'react'
import {useStore} from "@/hooks/useStore"
import { ThreeCircles, Rings } from 'react-loader-spinner'
import { FaMicrophone  } from "react-icons/fa";
import { FaMicrophoneLines } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { FaPlay } from "react-icons/fa";
import { IoPauseOutline } from "react-icons/io5";

import 'react-toastify/dist/ReactToastify.css';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk'

import { getTokenOrRefresh } from '@/helpers/speech_utils';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

export default function TypingBox() {
  const askTutor = useStore(state => state.askTutor)
  const playAudio = useStore(state => state.playAudio)
  const pauseAudio = useStore(state => state.pauseAudio)
  const chatPlayerObject = useStore(state => state.chatPlayerObject)
  const [question, setQuestion] = useState("")
  const loadingAnswer = useStore(state => state.loadingAnswer);
  const [isRecording, setRecording] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [player, updatePlayer] = useState({p: undefined, muted: false});
  const [recTranscript, setRecTranscript] = useState("")
  const recognizer = useRef(null)

  useEffect(() => {
    displayText !== "" && toast.info(displayText);
  }, [displayText])

  useEffect(() => {
    return () => {
      pauseAudio()
    }
  }, [])

  function stopRecording(argument) {
    console.log('als')
    recognizer.current.stopContinuousRecognitionAsync(() => {
      console.log('Speech recognition stopped.');
    });
    setRecording(false)
  }


  async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';
    
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setDisplayText("Speak into the microphone...");

    setRecording(true)
    recognizer.current.startContinuousRecognitionAsync(() => {
      console.log('Speech recognition started.');
      setRecording(true)
    });
    recognizer.current.recognizing = (s, event) => {
      console.log(s, e)
      const result = event.result;

      if (result.reason === speechsdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log('Transcript: -->', transcript);
        // Call a function to process the transcript as needed

        setRecTranscript(transcript);
      }
    }

    recognizer.current.recognized = (s, e) => {
      const result = event.result;
      console.log(s, e)

      if (result.reason === speechsdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log('Transcript: -->', transcript);
        // Call a function to process the transcript as needed

        setRecTranscript(transcript);
      }
      setRecording(false)
    }
  }


  return (
    <>
    <div className="w-[100%] bg-[white] flex justify-center items-center text-[.8rem]  mx-[auto] absolute z-[6] bottom-[0]">
      <FaMicrophone
        className="text-[#10c6fe] cursor-pointer text-[1.8rem] mr-2" 
        onClick={sttFromMic}
      />

      <div className="text-[black] pt-2 w-[60%] bg-[white] rounded-md flex items-center">
        <textarea 
          onChange={e => setQuestion(e.target.value)} 
          value={question} 
          placeholder="Type here" 
          className="resize-none w-[90%] text-[black] bg-[white] rounded-md px-3 py-3 border-b-solid border-b-1 border-b-[#000] outline-0" 
        />
        {
          isRecording && 
          <Rings
            visible={true}
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass="cursor-pointer"
          />

        }
        <PlayControls 
          chatPlayerObject={chatPlayerObject}
          pauseAudio={pauseAudio}
          playAudio={playAudio}
        />
      </div>

      
      <button 
        className="flex justify-center items-center ml-2 bg-[#10c6fe] text-[white] border-0 rounded-[40px] px-1 py-1 py-[7px] px-[20px]"
        disabled={loadingAnswer}
        onClick={() => askTutor(question)}
      >
        Send
        {
          loadingAnswer &&
          <button onClick={stopRecording}>
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
          </button>
        }
      </button>
      
    </div>
    <ToastContainer   />
    </>
  )
}

function PlayControls({chatPlayerObject, playAudio, pauseAudio}) {
  if (chatPlayerObject && chatPlayerObject.audioPlaying) {
    return <IoPauseOutline className="text-[2rem] text-[#10c6fe]" onClick={pauseAudio} />
  } 

  if (chatPlayerObject && !chatPlayerObject.audioPlaying) {
      return <FaPlay className="text-[2rem] text-[#10c6fe]" onClick={playAudio} />
  }
  return <></>

}