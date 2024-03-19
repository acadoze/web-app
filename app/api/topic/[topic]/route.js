import { NextResponse } from "next/server";

const topicContents = [
  {
    topic: "history",
    textContent: "History of the antedeluvian times"
  }
]

export function GET(req, {params}) {
	const {topic} = params
  const findTopic = topicContents.find(i => i.topic === topic)
  return NextResponse.json({
    topicContent: findTopic.textContent || topicContents[0].textContent
  })
}