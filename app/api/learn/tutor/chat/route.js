import {NextResponse } from 'next/server'
import OpenAI from "openai"
import axios from 'axios'
import * as speechSDK from "microsoft-cognitiveservices-speech-sdk"

async function fetchResponse() {
	
}
export async function GET(req) {
	const speechconfig = speechSDK.SpeechConfig.fromSubscription(
		process.env["AZURE_SPEECH_KEY"],
		process.env["AZURE_SPEECH_REGION"]
	)

	/** Louisa or Klaus will be accepted **/
	const teacher = req.nextUrl.searchParams.get("teacher") || "Louisa" // Female
	speechconfig.speechSynthesisVoiceName = `de-DE-${teacher}Neural` // German voice

	const speechSynthesizer = new speechSDK.SpeechSynthesizer(speechSDK.SpeechConfig)

	const audioStream = await new Promise((resolve, reject) => {
		speechSynthesizer.speakTextAsync(
			
		)
	})
}

export async function PUT(req) {
	const topic = req.nextUrl.searchParams.get("topic")
	const question = req.nextUrl.searchParams.get("question")

	const completion = await openai.chat.completions.create({
	    model: "gpt-3.5-turbo",
	    response_format: {
	    	type: "json_object"
	    },
	    messages: [
	    	{"role": "system", "content": `You are a very educative teacher on ${topic}. Your students ask You questions on ${topicContent.topic}. Your response should be withing the bounds of your this knowlegde bank ${topicContent.content}. Limit your tokens to 100 tokens`},
	        {"role": "assistant", "content": `You are to use ${topicContent.content} a your knowlegde bank.`},
	        {
	        	role: "system",
	        	content: `You should respond in the following JSON format {
	        			question: "",
	        			answer: ""
	        		} `
	        },
	        {
	        	role: "user",
	        	content: `${question} || "What does ${topicContent.topic} mean"`
	        }
		],
	});
	console.log(completion.choices[0].message)
}