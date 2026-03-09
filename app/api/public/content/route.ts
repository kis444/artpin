// app/api/public/content/route.ts
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

const DB_NAME = "artpin"
const COLLECTION = "content"

// GET /api/public/content?section=hero
export async function GET(req: NextRequest) {
  try {
    const section = req.nextUrl.searchParams.get("section")
    
    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)
    
    const doc = await collection.findOne({ _id: "main" } as any)
    
    if (!doc || !(doc as any).data) {
      return NextResponse.json({})
    }
    
    return NextResponse.json((doc as any).data[section] || {})
    
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}