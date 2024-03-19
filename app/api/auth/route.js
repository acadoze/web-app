import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {cookies} from "next/headers"
import jwt from "jsonwebtoken"
import {v4 as uuid } from "uuid"

const db = {
  users: []
}
export async function POST(req) {
  const {email, password, fullName} =  await req.json()
  const identity = req.nextUrl.searchParams.get("identity")
  if (!email || !password || !identity || !fullName || !["student", "teacher"].includes(identity)) {
    return NextResponse.json({
      success: false, message: "Invalid request body"
    }, {status: 400})
  };

  const findEmail = db.users.find(i => i.email === email)
  if (findEmail) {
    return NextResponse.json({
      success: false, message: "Email already exists"
    }, {status: 400})
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = {
    id: uuid(),
    password: hash,
    fullName,
    email,
    role: identity
  }
  db.users.push(user)

  return NextResponse.json({
    success: true, message: "Account registration successful"
  }, {status: 201})
  
}


export async function PUT(req) {
  const identity = req.nextUrl.searchParams.get("identity")
  const {email, password} = await req.json()

  if (!email || !password) {
    return NextResponse.json({
      success: false, message: "Invalid request body"
    }, {status: 400})
  }
  const user = await db.users.find(user => user.email === email)

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({
      success: false, message: "Invalid credentials"
    }, {status: 401})
  }

  const token = await createJwtToken({
    id: user.id,
    role: user.role
  });

  cookies().set( {
    name: "token",
    path: "/learn",
    httpOnly: true,
  });
  return NextResponse.json({
    success: true,
    message: "You are now logged in",
    data: {
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
    },
  }, {status: 200})
  
}

async function createJwtToken({id, role}) {
  const maxAge = "30 mins";
  return await jwt.sign(
    {id, role},
    process.env["JWT_SECRET"],
    { expiresIn: maxAge },
  );
}
