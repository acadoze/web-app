import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function POST(req: NextApiRequest) {
  const {fullName, email, password} = req.body
  
}
export function PUT(req: NextApiRequest) {
  const {email, password} = req.body
  
}