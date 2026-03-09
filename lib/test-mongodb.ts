// lib/test-mongodb.ts
import { config } from 'dotenv'
import { resolve } from 'path'
// Folosim require pentru a evita erorile TypeScript
const clientPromise = require('./mongodb').default

config({ path: resolve(process.cwd(), '.env.local') })

async function testConnection() {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ există' : '❌ lipsește')
    
    const client = await clientPromise
    console.log('✅ Conexiune reușită la MongoDB!')
    
    const db = client.db('artpin')
    const collections = await db.listCollections().toArray()
    console.log('📊 Colecții existente:', collections.map((c: any) => c.name))
    
  } catch (error) {
    console.error('❌ Eroare conexiune:', error)
  }
}

testConnection()