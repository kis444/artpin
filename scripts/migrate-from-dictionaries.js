// scripts/migrate-from-dictionaries.js
require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')
const path = require('path')

console.log('📖 Citim datele din dictionaries.ts...')

// Datele tale (extrase manual)
const dictionaries = {
  ro: {
    hero: {
      headline: "Mobilier personalizat premium & soluții interioare din 2004",
      subheadline: "Design personalizat. Meșteșug excepțional. Interioare atemporale.",
      cta: "Solicită consultație gratuită",
    },
    about: {
      label: "Despre noi",
      title: "Creăm interioare excepționale din 2004",
      description: "Fondată în 2004 în Moldova, Artpin s-a dedicat creării de mobilier personalizat și soluții interioare care îmbină funcționalitatea cu estetica rafinată. Fiecare proiect este unic, conceput special pentru a reflecta personalitatea și nevoile clientului nostru.",
      features: [
        "Consultanță gratuită de design",
        "Proiecte individuale personalizate",
        "Atenție la fiecare detaliu",
        "Materiale premium selectate",
      ],
      cycle: "Ciclu complet: consultanță → măsurători → design → producție → instalare",
    },
    testimonials: {
      items: [
        {
          name: "Maria Ciobanu",
          role: "Proprietar rezidențial",
          text: "Artpin a transformat complet bucătăria noastră. Calitatea materialelor și atenția la detalii sunt excepționale. Recomand cu încredere!",
        },
        {
          name: "Andrei Popescu",
          role: "Director comercial",
          text: "Am colaborat cu Artpin pentru amenajarea biroului nostru. Profesionalism impecabil și rezultate peste așteptări.",
        },
        {
          name: "Elena Rusu",
          role: "Designer interior",
          text: "Ca designer, apreciez partenerii care înțeleg viziunea mea. Artpin livrează mereu la cel mai înalt standard de calitate.",
        },
      ],
    },
    portfolio: {
      categories: {
        kitchens: "Bucătării",
        doors: "Uși",
        staircases: "Scări",
        offices: "Birouri",
        retail: "Retail",
        furniture: "Mobilier",
      },
      descriptions: {
        k1: "O capodoperă a designului contemporan, această bucătărie îmbină armonios liniile minimaliste cu texturi naturale. Fronturile mate în nuanță de grej sunt completate de blatul din quartz cu venaturi fine, iar insula centrală generoasă oferă atât spațiu de preparare cât și zonă de socializare. Sistemul de iluminat ambiental LED creează atmosfera perfectă pentru serile în familie.",
        k2: "Bucătărie spațioasă, gândită pentru pasionații de gastronomie care iubesc să gătească în compania celor dragi. Insula multifuncțională integrează plită, chiuvetă și zonă de servit, transformând prepararea meselor într-un spectacol interactiv. Fronturile din lemn masiv de stejar afumat aduc căldură naturală, în timp ce electrocasnicele inox, discret integrate, asigură performanță profesională.",
        k3: "Eleganța dusă la extrem prin simplitate. Fiecare detaliu al acestei bucătării a fost atent calibrat pentru a crea un spațiu aerisit, fără elemente vizuale care să distragă atenția. Fronturile complet plane, cu sistem de deschidere push-to-open, se confundă cu pereții, oferind o estetică pură, aproape sculpturală. Blatul din piatră naturală și insula suspendată adaugă note de rafinament discret.",
        d1: "Ușă din lemn masiv de stejar, sculptată manual și finisată cu uleiuri naturale care pun în valoare textura autentică a lemnului. Fierăria forjată manual completează designul atemporal, transformând fiecare trecere pragul într-un moment de grație.",
        s1: "Scară impunătoare din nuc american, cu linii curate și balustradă din sticlă securizată. Fiecare treaptă, sculptată dintr-o singură bucată de lemn, pare că plutește în aer datorită sistemului ingenios de prindere. O piesă centrală care definește întreaga arhitectură a casei.",
        o1: "Un spațiu de lucru care inspiră creativitate și productivitate. Biroul generos din lemn de cireș, rafturile suspendate și mobilierul ergonomic sunt gândite să ofere confort pe durata întregii zile. Lumina naturală pătrunde generos prin geamurile generoase, iar plantele verzi aduc o notă de prospețime și vitalitate.",
        r1: "Concept boutique pentru un brand francez de prestigiu. Spațiul îmbină elegant vitrinele generoase cu zonele de relaxare pentru clienți, create din materiale nobile precum marmura și alama periată. Iluminatul dramatic pune în valoare fiecare produs ca pe o operă de artă, oferind o experiență de shopping memorabilă.",
        f1: "O piesă de mobilier unică, sculptată manual din nuc bătrân de peste 100 de ani. Acest cabinet impresionează prin proporțiile armonioase, detaliile sculptate inspirate din natură și finisajul manual cu ceară naturală. Spațiile generoase de depozitare sunt completate de sertare tapițate în interior cu catifea.",
      },
      caseStudy: {
        title: "Proiect internațional — Franța",
        description: "Interior complet pentru un magazin retail de lux livrat în Franța, demonstrând capacitatea noastră de a executa proiecte la nivel internațional.",
      },
    },
  },
  ru: {
    hero: {
      headline: "Премиальная мебель на заказ & интерьерные решения с 2004 года",
      subheadline: "Индивидуальный дизайн. Исключительное мастерство. Вневременные интерьеры.",
      cta: "Запросить бесплатную консультацию",
    },
    about: {
      label: "О нас",
      title: "Создаём исключительные интерьеры с 2004 года",
      description: "Основанная в 2004 году в Молдове, Artpin посвятила себя созданию мебели на заказ и интерьерных решений, которые сочетают функциональность с изысканной эстетикой. Каждый проект уникален, специально разработан, чтобы отражать личность и потребности клиента.",
      features: [
        "Бесплатная дизайн-консультация",
        "Индивидуальные проекты",
        "Внимание к каждой детали",
        "Премиальные материалы",
      ],
      cycle: "Полный цикл: консультация → замеры → дизайн → производство → монтаж",
    },
    testimonials: {
      items: [
        {
          name: "Мария Чобану",
          role: "Владелец жилья",
          text: "Artpin полностью преобразил нашу кухню. Качество материалов и внимание к деталям — исключительные. Рекомендую с уверенностью!",
        },
        {
          name: "Андрей Попеску",
          role: "Коммерческий директор",
          text: "Мы сотрудничали с Artpin для оформления нашего офиса. Безупречный профессионализм и результаты сверх ожиданий.",
        },
        {
          name: "Елена Русу",
          role: "Дизайнер интерьера",
          text: "Как дизайнер, я ценю партнёров, которые понимают мою визию. Artpin всегда доставляет на высшем уровне качества.",
        },
      ],
    },
  },
  en: {
    hero: {
      headline: "Premium custom furniture & interior solutions since 2004",
      subheadline: "Tailored design. Exceptional craftsmanship. Timeless interiors.",
      cta: "Request Free Consultation",
    },
    about: {
      label: "About Us",
      title: "Crafting exceptional interiors since 2004",
      description: "Founded in 2004 in Moldova, Artpin has been dedicated to creating custom furniture and interior solutions that blend functionality with refined aesthetics. Every project is unique, specially designed to reflect the personality and needs of our client.",
      features: [
        "Free design consultation",
        "Individual custom projects",
        "Attention to every detail",
        "Premium selected materials",
      ],
      cycle: "Full cycle: consultation → measurements → design → production → installation",
    },
    testimonials: {
      items: [
        {
          name: "Maria Ciobanu",
          role: "Residential homeowner",
          text: "Artpin completely transformed our kitchen. The quality of materials and attention to detail are exceptional. I recommend with confidence!",
        },
        {
          name: "Andrei Popescu",
          role: "Commercial director",
          text: "We collaborated with Artpin for our office fit-out. Impeccable professionalism and results beyond expectations.",
        },
        {
          name: "Elena Rusu",
          role: "Interior designer",
          text: "As a designer, I appreciate partners who understand my vision. Artpin always delivers at the highest standard of quality.",
        },
      ],
    },
  },
}

// Datele din lib/data/portfolio.ts
const portfolioItems = [
  {
    id: "k1",
    title: "Modern #1",
    category: "kitchens",
    coverImage: "/images/portfolio/k1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k1a.jpg" },
      { type: 'image', src: "/images/portfolio/k1b.jpg" },
    ],
    featured: true,
  },
  {
    id: "k2",
    title: "Island #2",
    category: "kitchens",
    coverImage: "/images/portfolio/k2a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k2a.jpg" },
      { type: 'image', src: "/images/portfolio/k2b.jpg" },
      { type: 'image', src: "/images/portfolio/k2c.jpg" },
      { type: 'image', src: "/images/portfolio/k2d.jpg" },
    ],
  },
  {
    id: "k3",
    title: "Minimalist #3",
    category: "kitchens",
    coverImage: "/images/portfolio/k3a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k3a.jpg" },
      { type: 'image', src: "/images/portfolio/k3b.jpg" },
      { type: 'image', src: "/images/portfolio/k3c.jpg" },
    ],
  },
  {
    id: "d1",
    title: "Solid Wood Door",
    category: "doors",
    coverImage: "/images/portfolio/d1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/d1a.jpg" },
    ],
  },
  {
    id: "s1",
    title: "Walnut Staircase",
    category: "staircases",
    coverImage: "/images/portfolio/s1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/s1a.jpg" },
    ],
  },
  {
    id: "o1",
    title: "Bucuria Office",
    category: "offices",
    coverImage: "/images/portfolio/o1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/o1a.jpg" },
      { type: 'image', src: "/images/portfolio/o1b.jpg" },
    ],
  },
  {
    id: "r1",
    title: "Luxury Retail — France",
    category: "retail",
    coverImage: "/images/portfolio/r1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/r1a.jpg" },
    ],
    featured: true,
  },
  {
    id: "f1",
    title: "Walnut Cabinet",
    category: "furniture",
    coverImage: "/images/portfolio/f1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/f1a.jpg" },
    ],
  },
]

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
    
    const db = client.db('artpin')
    const collection = db.collection('content')

    // -------------------- HERO CONTENT --------------------
    console.log('📝 Procesăm Hero...')
    const heroContent = {
      headline_en: dictionaries.en.hero.headline,
      headline_ro: dictionaries.ro.hero.headline,
      headline_ru: dictionaries.ru.hero.headline,
      subheadline_en: dictionaries.en.hero.subheadline,
      subheadline_ro: dictionaries.ro.hero.subheadline,
      subheadline_ru: dictionaries.ru.hero.subheadline,
      cta_en: dictionaries.en.hero.cta,
      cta_ro: dictionaries.ro.hero.cta,
      cta_ru: dictionaries.ru.hero.cta,
    }

    // -------------------- ABOUT CONTENT --------------------
    console.log('📝 Procesăm About...')
    const aboutContent = {
      label_en: dictionaries.en.about.label,
      label_ro: dictionaries.ro.about.label,
      label_ru: dictionaries.ru.about.label,
      title_en: dictionaries.en.about.title,
      title_ro: dictionaries.ro.about.title,
      title_ru: dictionaries.ru.about.title,
      description_en: dictionaries.en.about.description,
      description_ro: dictionaries.ro.about.description,
      description_ru: dictionaries.ru.about.description,
      features: dictionaries.ro.about.features,
      cycle_en: dictionaries.en.about.cycle,
      cycle_ro: dictionaries.ro.about.cycle,
      cycle_ru: dictionaries.ru.about.cycle,
    }

    // -------------------- TESTIMONIALS --------------------
    console.log('📝 Procesăm Testimoniale...')
    const testimonials = dictionaries.ro.testimonials.items.map((item, index) => ({
      id: `testimonial-${index + 1}`,
      name: item.name,
      role: item.role,
      text_en: dictionaries.en.testimonials?.items?.[index]?.text || item.text,
      text_ro: item.text,
      text_ru: dictionaries.ru.testimonials?.items?.[index]?.text || item.text,
    }))

    // -------------------- PORTFOLIO --------------------
    console.log('📝 Procesăm Portofoliu...')
    const portfolio = portfolioItems.map(item => {
      // Obținem descrierile doar din RO (singura limbă care le are)
      const descriptionRo = dictionaries.ro.portfolio?.descriptions?.[item.id] || ""
      
      return {
        id: item.id,
        category: item.category,
        title_en: item.title,
        title_ro: item.title,
        title_ru: item.title,
        description_en: "", // EN nu are descrieri
        description_ro: descriptionRo,
        description_ru: "", // RU nu are descrieri
        coverImage: item.coverImage,
        media: item.media,
        featured: item.featured || false,
      }
    })

    // -------------------- CASE STUDY --------------------
    console.log('📝 Procesăm Case Study...')
    const caseStudy = {
      title_en: dictionaries.en.portfolio?.caseStudy?.title || "International Project — France",
      title_ro: dictionaries.ro.portfolio?.caseStudy?.title || "Proiect internațional — Franța",
      title_ru: dictionaries.ru.portfolio?.caseStudy?.title || "Международный проект — Франция",
      description_en: dictionaries.en.portfolio?.caseStudy?.description || "Complete interior for a luxury retail store delivered in France, demonstrating our ability to execute international projects.",
      description_ro: dictionaries.ro.portfolio?.caseStudy?.description || "Interior complet pentru un magazin retail de lux livrat în Franța, demonstrând capacitatea noastră de a executa proiecte la nivel internațional.",
      description_ru: dictionaries.ru.portfolio?.caseStudy?.description || "Полный интерьер для люксового розничного магазина, поставленный во Францию, демонстрирующий нашу способность выполнять международные проекты.",
      image: "/images/portfolio/r1a.jpg",
    }

    // -------------------- SETTINGS --------------------
    console.log('📝 Procesăm Setări...')
    const settings = {
      phone: "+373 123 456 789",
      email: "info@artpin.md",
      address: "Uzinelor 43, Chișinău, Moldova",
      instagram: "https://instagram.com/artpin",
      facebook: "https://facebook.com/artpin",
      telegram: "https://t.me/artpin",
    }

    // Construim documentul
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
    console.log('💾 Salvăm în MongoDB...')
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