// scripts/migrate-data.ts
import { config } from 'dotenv'
import { resolve } from 'path'
import { MongoClient } from 'mongodb'
import { portfolioItems } from '@/lib/data/portfolio'
import roLocale from '@/lib/i18n/locales/ro.json'
import enLocale from '@/lib/i18n/locales/en.json'
import ruLocale from '@/lib/i18n/locales/ru.json'

// Încarcă .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const DB_NAME = "artpin"
const COLLECTION = "content"

async function migrateData() {
  console.log('🚀 Începem migrarea datelor în MongoDB...')
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI lipsește din .env.local')
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ Conectat la MongoDB')
    
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)

    // Verificăm dacă există deja date
    const existing = await collection.findOne({ _id: "main" })
    
    if (existing) {
      console.log('⚠️ Există deja date în MongoDB. Folosește force pentru a suprascrie.')
      const force = process.argv.includes('--force')
      if (!force) {
        console.log('💡 Rulează cu --force pentru a suprascrie datele existente')
        process.exit(0)
      }
    }

    // -------------------- HERO CONTENT --------------------
    const heroContent = {
      headline_en: enLocale.hero.headline,
      headline_ro: roLocale.hero.headline,
      headline_ru: ruLocale.hero.headline,
      subheadline_en: enLocale.hero.subheadline,
      subheadline_ro: roLocale.hero.subheadline,
      subheadline_ru: ruLocale.hero.subheadline,
      cta_en: enLocale.hero.cta,
      cta_ro: roLocale.hero.cta,
      cta_ru: ruLocale.hero.cta,
    }

    // -------------------- ABOUT CONTENT --------------------
    const aboutContent = {
      label_en: enLocale.about.label,
      label_ro: roLocale.about.label,
      label_ru: ruLocale.about.label,
      title_en: enLocale.about.title,
      title_ro: roLocale.about.title,
      title_ru: ruLocale.about.title,
      description_en: enLocale.about.description,
      description_ro: roLocale.about.description,
      description_ru: ruLocale.about.description,
      features: roLocale.about.features, // Folosim array-ul din RO
      cycle_en: enLocale.about.cycle,
      cycle_ro: roLocale.about.cycle,
      cycle_ru: ruLocale.about.cycle,
    }

    // -------------------- TESTIMONIALS --------------------
    const testimonials = roLocale.testimonials.items.map((item: any, index: number) => ({
      id: `testimonial-${index + 1}`,
      name: item.name,
      role: item.role,
      text_en: enLocale.testimonials.items[index]?.text || item.text,
      text_ro: item.text,
      text_ru: ruLocale.testimonials.items[index]?.text || item.text,
    }))

    // -------------------- PORTFOLIO --------------------
    const portfolio = portfolioItems.map(item => ({
      id: item.id,
      category: item.category,
      title_en: item.title, // Presupunem că title e același pentru toate limbile
      title_ro: item.title,
      title_ru: item.title,
      description_en: "", // Poți completa dacă ai descrieri în EN
      description_ro: "", // Poți completa dacă ai descrieri în RO
      description_ru: "", // Poți completa dacă ai descrieri în RU
      coverImage: item.coverImage,
      media: item.media,
      featured: item.featured || false,
    }))

    // -------------------- CASE STUDY --------------------
    const caseStudy = {
      title_en: enLocale.portfolio.caseStudy?.title || "International Project — France",
      title_ro: roLocale.portfolio.caseStudy?.title || "Proiect internațional — Franța",
      title_ru: ruLocale.portfolio.caseStudy?.title || "Международный проект — Франция",
      description_en: enLocale.portfolio.caseStudy?.description || "Complete interior for a luxury retail store delivered in France, demonstrating our ability to execute international projects.",
      description_ro: roLocale.portfolio.caseStudy?.description || "Interior complet pentru un magazin retail de lux livrat în Franța, demonstrând capacitatea noastră de a executa proiecte la nivel internațional.",
      description_ru: ruLocale.portfolio.caseStudy?.description || "Полный интерьер для люксового розничного магазина, поставленный во Францию, демонстрирующий нашу способность выполнять международные проекты.",
      image: "/images/portfolio/r1a.jpg",
    }

    // -------------------- SETTINGS --------------------
    const settings = {
      phone: "+373 123 456 789",
      email: "info@artpin.md",
      address: "Uzinelor 43, Chișinău, Moldova",
      instagram: "https://instagram.com/artpin",
      facebook: "https://facebook.com/artpin",
      telegram: "https://t.me/artpin",
    }

    // Construim documentul complet
    const document = {
      _id: "main",
      data: {
        hero: heroContent,
        about: aboutContent,
        testimonials: testimonials,
        portfolio: portfolio,
        caseStudy: caseStudy,
        settings: settings,
      }
    }

    // Salvează în MongoDB
    await collection.replaceOne(
      { _id: "main" },
      document,
      { upsert: true }
    )

    console.log('✅ Datele au fost migrate cu succes în MongoDB!')
    console.log('📊 Statistici:')
    console.log(`   - Hero: 3 câmpuri x 3 limbi`)
    console.log(`   - About: 5 câmpuri x 3 limbi + 4 features`)
    console.log(`   - Testimoniale: ${testimonials.length} iteme`)
    console.log(`   - Portofoliu: ${portfolio.length} proiecte`)
    console.log(`   - Case Study: 2 câmpuri x 3 limbi`)
    console.log(`   - Setări: 6 câmpuri`)

  } catch (error) {
    console.error('❌ Eroare la migrare:', error)
  } finally {
    await client.close()
    console.log('🔌 Conexiune închisă')
  }
}

migrateData()