import { BsSend } from "react-icons/bs";
import {askTutor} from "@/hooks/useStore"
import {useState, useEffect} from 'react'
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

  useEffect(() => {
    displayText !== "" && toast.info(displayText);
  }, [displayText])

  useEffect(() => {
    return () => pauseAudio()
  }, [])


  async function sttFromMic() {
    setRecording(true)
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';
    
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setDisplayText("Speak into the microphone...");

    recognizer.recognizeOnceAsync(result => {
      setRecording(false)
      if (result.reason === ResultReason.RecognizedSpeech) {
        setQuestion(text => {
          text += ` ${result.text}`
          return text
        })
      } else {
        setDisplayText('Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
      }
    });
  }

  // async function textToSpeech() {
  //   const tokenObj = await getTokenOrRefresh();
  //   const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
  //   const myPlayer = new speechsdk.SpeakerAudioDestination();
  //   updatePlayer(p => {p.p = myPlayer; return p;});
  //   const audioConfig = speechsdk.AudioConfig.fromSpeakerOutput(player.p);

  //   let synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

  //   const textToSpeak = 'This is an example of speech synthesis for a long passage of text. Pressing the mute button should pause/resume the audio output.';
  //   setDisplayText(`speaking text: ${textToSpeak}...`);
  //   synthesizer.speakTextAsync(
  //   textToSpeak,
  //   result => {
  //     let text;
  //     if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
  //         text = `synthesis finished for "${textToSpeak}".\n`
  //     } else if (result.reason === speechsdk.ResultReason.Canceled) {
  //         text = `synthesis failed. Error detail: ${result.errorDetails}.\n`
  //     }
  //     synthesizer.close();
  //     synthesizer = undefined;
  //     setDisplayText(text);
  //   },
  //   function (err) {
  //     setDisplayText(`Error: ${err}.\n`);

  //     synthesizer.close();
  //     synthesizer = undefined;
  //   });
  // }


  return (
    <>
    <div className="w-[100%] flex justify-center items-center text-[.8rem]  mx-[auto] absolute z-[6] bottom-[5px]">
      <FaMicrophone
        className="text-[#10c6fe] cursor-pointer text-[1.8rem] mr-2" 
        onClick={sttFromMic}
      />

      <div className="text-[black] w-[60%] bg-[white] rounded-md flex items-center">
        <textarea 
          onChange={e => setQuestion(e.target.value)} 
          value={question} 
          placeholder="Type here" 
          className="resize-none w-[90%] text-[black] bg-[white] rounded-md px-3 py-2 border-0 outline-0" 
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
            wrapperClass=""
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