import { NextResponse } from "next/server";
import OpenAI from "openai"
import * as speechSDK from "microsoft-cognitiveservices-speech-sdk"
import { PassThrough } from 'stream'
import fs from "fs"
const speechconfig = speechSDK.SpeechConfig.fromSubscription(
  process.env["AZURE_SPEECH_KEY"],
  process.env["AZURE_SPEECH_REGION"]
)
const config = {
  apiKey: process.env["OPENAI_KEY"]
}
const openai = new OpenAI(config)
const messages = []

export async function GET(req, {params}) {
  const {topic} = params

  if (!["history"].includes(topic)) {
    return NextResponse.json({
      success: false, message: "This topic is invalid"
    }, {status: 400})
  }
  const knowledgeContent = fs.readFileSync(`knowledge/${topic}.txt`, 'utf8');

  
  const question = req.nextUrl.searchParams.get("question") 
  const teacher = "Ava" // or Andrew
  speechconfig.speechSynthesisVoiceName = `en-US-${teacher}Neural` // UK

  const speechSynthesizer = new speechSDK.SpeechSynthesizer(speechconfig)
  const visemes = []
  speechSynthesizer.visemeReceived = function (s, e) {
    visemes.push([e.audioOffset / 10000 , e.visemeId])
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        "role": "system",
        content: "Your Name is Acadoze and you are an experienced elementary teacher and also an expert in History. With a passion for History, you guide students towards a love for learning and exploration. Your response should have a full stop at the end of every sentence. Use 'umhs' when answering a question in the conversation and let the conversational style be for children. ,"
      },
      {
        "role": "system", 
        "content": knowledgeContent
      },
      {
        role: "user",
        content: question || ""
      }
    ],
    temperature: 0.5
  });
  console.log("--- CHAT COMPLETE ---")

  const chatAnswer = completion.choices[0].message.content
 
  const audioStream = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      chatAnswer,
      result => {
        const {audioData} = result
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
  console.log("--- AUDIO COMPLETE ---")

  return new Response(audioStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Dsiposition": `inline; filename=tts.mp3`,
      "visemes": JSON.stringify(visemes)
    }
  })
}