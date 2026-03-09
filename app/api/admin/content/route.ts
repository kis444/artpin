// app/api/admin/content/route.ts
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

const DB_NAME = "artpin"
const COLLECTION = "content"

const ALLOWED_SECTIONS = ["hero", "about", "testimonials", "portfolio", "caseStudy", "settings"]

// GET /api/admin/content?section=hero
export async function GET(req: NextRequest) {
  try {
    const section = req.nextUrl.searchParams.get("section")
    
    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 })
    }

    if (!ALLOWED_SECTIONS.includes(section)) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)
    
    // Folosim any ca să evităm erorile de tip
    const doc = await collection.findOne({ _id: "main" } as any)
    
    if (!doc) {
      return NextResponse.json({})
    }
    
    return NextResponse.json((doc as any).data?.[section] || {})
    
  } catch (error) {
    console.error("MongoDB GET error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

// POST /api/admin/content
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { section, data } = body

    if (!section || !data) {
      return NextResponse.json({ error: "Missing section or data" }, { status: 400 })
    }

    if (!ALLOWED_SECTIONS.includes(section)) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)
    
    const existing = await collection.findOne({ _id: "main" } as any)
    
    if (existing) {
      await collection.updateOne(
        { _id: "main" } as any,
        { $set: { [`data.${section}`]: data } }
      )
    } else {
      await collection.insertOne({
        _id: "main",
        data: { [section]: data }
      } as any)
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("MongoDB POST error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}