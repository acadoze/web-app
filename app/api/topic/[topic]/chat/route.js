import { NextResponse } from "next/server";
import OpenAI from "openai"
import * as speechSDK from "microsoft-cognitiveservices-speech-sdk"
import { PassThrough } from 'stream'

const topicContents = [
  {
    topic: "history",
    textContent: "History of the antedeluvian times"
  }
]
const config = {
  apiKey: process.env["OPENAI_KEY"]
}
const openai = new OpenAI(config)

export async function GET(req, {params}) {
  const speechconfig = speechSDK.SpeechConfig.fromSubscription(
    process.env["AZURE_SPEECH_KEY"],
    process.env["AZURE_SPEECH_REGION"]
  )
  const {topic} = params
  const question = req.nextUrl.searchParams.get("question") 
  const topicContent = topicContents.find(i => i.topic === topic) || topicContents[0]
  const teacher = "Olivia" // or Oliver
  console.log(question)
  speechconfig.speechSynthesisVoiceName = `en-GB-${teacher}Neural` // UK

  const speechSynthesizer = new speechSDK.SpeechSynthesizer(speechconfig)
  const visemes = []
  speechSynthesizer.visemeReceived = function (s, e) {
    visemes.push([e.audioOffset / 10000 , e.visemeId])
  }


  console.log("---- CHAT PROCESSING ----- ")

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        "role": "system", 
        "content": `First evaluate the message and use ${topicContent.content} as your knowlegde bank. The message is a question. Limit your tokens to 100 tokens. You should respond with the answer`
      },
      {
        role: "user",
        content: `${question || `What does ${topicContent.topic} mean`} `
      }
    ],
  });

  const chatAnswer = completion.choices[0].message.content
  console.log("---- OPENAI PROCESSED ----- ", chatAnswer)
 
  const audioStream = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      chatAnswer,
      result => {
        const {audioData} = result
        console.log("---- AUDIO PROCESSED ---- ")
        speechSynthesizer.close()
        const bufferStream = new PassThrough()
        bufferStream.end(Buffer.from(audioData))
        resolve(bufferStream)
      },
      error => {
        console.error(error)
        speechSynthesizer.close()
        reject(error)
      }
    )
  })
  console.log("---- CHAT PROCESSING ENDED ----- ")

  return new Response(audioStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Dsiposition": `inline; filename=tts.mp3`,
      "visemes": JSON.stringify(visemes)
    }
  })
}