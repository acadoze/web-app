import { NextResponse } from "next/server";
import OpenAI from "openai"

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
  const {topic} = params
  const question = req.nextUrl.searchParams.get("question") 
  const topicContent = topicContents.find(i => i.topic === topic) || topicContents[0]

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: {
      type: "json_object"
    },
    messages: [
      {
        "role": "system", 
        "content": `First evaluate the message and use ${topicContent.content} as your knowlegde bank. The message is a question. Limit your tokens to 100 tokens. You should respond in the following JSON format {
            question: "",
            answer: ""
          }`
      },
      {
        role: "user",
        content: `${question || `What does ${topicContent.topic} mean`} `
      }
    ],
  });
  return NextResponse.json({
    message: completion.choices[0].message
  })
}