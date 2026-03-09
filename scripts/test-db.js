// scripts/test-db.js
require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')

async function testConnection() {
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ există' : '❌ lipsește')
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI nu e setat în .env.local')
    return
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    console.log('✅ Conexiune reușită la MongoDB!')
    
    const db = client.db('artpin')
    const collections = await db.listCollections().toArray()
    console.log('📊 Colecții existente:', collections.map(c => c.name))
    
    await client.close()
  } catch (error) {
    console.error('❌ Eroare conexiune:', error)
  }
}

testConnection()