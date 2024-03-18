import {NextResponse } from 'next/server'
import * as speechSDK from "microsoft-cognitiveservices-speech-sdk"
import { PassThrough } from 'stream'

export async function GET(req) {
	const speechconfig = speechSDK.SpeechConfig.fromSubscription(
		process.env["AZURE_SPEECH_KEY"],
		process.env["AZURE_SPEECH_REGION"]
	)

	/** Louisa or Klaus will be accepted **/
	const teacher = req.nextUrl.searchParams.get("teacher") || "Louisa" // Female
	speechconfig.speechSynthesisVoiceName = `de-DE-${teacher}Neural` // German voice

	const speechSynthesizer = new speechSDK.SpeechSynthesizer(speechconfig)
	const visemes = []
	speechSynthesizer.visemeReceived = function (s, e) {
		visemes.push([e.audioOffset / 10000 , e.visemeId])
	}

	const topic = req.nextUrl.searchParams.get("topic") || "History"

	const audioStream = await new Promise((resolve, reject) => {
		speechSynthesizer.speakTextAsync(
			`Hi, I am your ${topic} instructor`,
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
			"visems": JSON.stringify(visemes)
		}
	})
}
