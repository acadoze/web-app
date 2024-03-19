import {NextResponse } from 'next/server'
import * as speechSDK from "microsoft-cognitiveservices-speech-sdk"
import { PassThrough } from 'stream'

const topicContents = [
  {
    topic: "history",
    textContent: "What question do you have concerning the topic of history"
  }
]
export async function GET(req) {
	const speechconfig = speechSDK.SpeechConfig.fromSubscription(
		process.env["AZURE_SPEECH_KEY"],
		process.env["AZURE_SPEECH_REGION"]
	)
	let content

	/** Louisa or Klaus will be accepted **/
	const teacher = req.nextUrl.searchParams.get("teacher") || "Olivia" // or Oliver
	const resourceType = req.nextUrl.searchParams.get("resource_type")

	if (resourceType === "topic") {
		let topic = req.nextUrl.searchParams.get("topic");
		let find = topicContents.find(i => i.topic === topic) || topicContents[0]
		content = find.textContent
	}
	if (resourceType === "content") {
		content = req.nextUrl.searchParams.get("content")
	}

	speechconfig.speechSynthesisVoiceName = `en-GB-${teacher}Neural` // UK

	const speechSynthesizer = new speechSDK.SpeechSynthesizer(speechconfig)
	const visemes = []
	speechSynthesizer.visemeReceived = function (s, e) {
		visemes.push([e.audioOffset / 10000 , e.visemeId])
	}

	
	const audioStream = await new Promise((resolve, reject) => {
		speechSynthesizer.speakTextAsync(
			content,
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

	return new Response(audioStream, {
		headers: {
			"Content-Type": "audio/mpeg",
			"Content-Dsiposition": `inline; filename=tts.mp3`,
			"visemes": JSON.stringify(visemes)
		}
	})
}
