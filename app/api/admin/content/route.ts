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

// DELETE /api/admin/content?section=portfolio&id=123
export async function DELETE(req: NextRequest) {
  try {
    const section = req.nextUrl.searchParams.get("section")
    const id = req.nextUrl.searchParams.get("id")

    if (!section || !id) {
      return NextResponse.json({ error: "Missing section or id" }, { status: 400 })
    }

    if (section !== "portfolio") {
      return NextResponse.json({ error: "Delete only supported for portfolio" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)
    
    // Ștergem proiectul din array-ul portfolio
    await collection.updateOne(
      { _id: "main" } as any,
      { $pull: { "data.portfolio": { id: id } } as any }
    )
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("MongoDB DELETE error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}