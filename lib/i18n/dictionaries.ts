export type Locale = "ro" | "ru" | "en"

export const defaultLocale: Locale = "ro"

export const locales: Locale[] = ["ro", "ru", "en"]

export const localeNames: Record<Locale, string> = {
  ro: "RO",
  ru: "RU",
  en: "EN",
}

export type Dictionary = typeof dictionaries.en

export const dictionaries = {
  ro: {
    nav: {
      about: "Despre noi",
      services: "Servicii",
      portfolio: "Portofoliu",
      process: "Proces",
      testimonials: "Recenzii",
      contact: "Contacte",
    },
    hero: {
      headline: "Mobilier personalizat premium & soluții interioare din 2004",
      subheadline:
        "Design personalizat. Meșteșug excepțional. Interioare atemporale.",
      cta: "Solicită consultație gratuită",
    },
    about: {
      label: "Despre noi",
      title: "Creăm interioare excepționale din 2004",
      description:
        "Fondată în 2004 în Moldova, Artpin s-a dedicat creării de mobilier personalizat și soluții interioare care îmbină funcționalitatea cu estetica rafinată. Fiecare proiect este unic, conceput special pentru a reflecta personalitatea și nevoile clientului nostru.",
      features: [
        "Consultanță gratuită de design",
        "Proiecte individuale personalizate",
        "Atenție la fiecare detaliu",
        "Materiale premium selectate",
      ],
      cycle: "Ciclu complet: consultanță → măsurători → design → producție → instalare",
    },
    services: {
      label: "Servicii",
      title: "Ce oferim",
      items: [
        { title: "Bucătării personalizate", description: "Design și producție de bucătării unice" },
        { title: "Uși din lemn", description: "Uși interioare și exterioare din lemn masiv" },
        { title: "Uși metalice", description: "Uși de intrare sigure și elegante" },
        { title: "Scări", description: "Scări din lemn și metal personalizate" },
        { title: "Birouri & Spații comerciale", description: "Mobilier pentru office și spații comerciale" },
        { title: "Panouri de perete", description: "Panouri decorative din lemn natural" },
        { title: "Mobilier personalizat", description: "Orice piesă de mobilier la comandă" },
        { title: "Proiecte retail", description: "Interioare complete pentru magazine" },
      ],
    },
    portfolio: {
      label: "Portofoliu",
      title: "Proiectele noastre",
      all: "Toate",
      categories: {
        kitchens: "Bucătării",
        doors: "Uși",
        staircases: "Scări",
        offices: "Birouri",
        retail: "Retail",
        furniture: "Mobilier",
      },
      caseStudy: {
        title: "Proiect internațional — Franța",
        description:
          "Interior complet pentru un magazin retail de lux livrat în Franța, demonstrând capacitatea noastră de a executa proiecte la nivel internațional.",
      },
    },
    process: {
      label: "Proces",
      title: "Cum lucrăm",
      steps: [
        { number: "01", title: "Consultanță", description: "Discutăm viziunea și nevoile dumneavoastră" },
        { number: "02", title: "Măsurători", description: "Vizită la fața locului pentru măsurători precise" },
        { number: "03", title: "Proiect de design", description: "Propunere gratuită de design 3D" },
        { number: "04", title: "Revizuiri & Aprobare", description: "Ajustări până la satisfacția completă" },
        { number: "05", title: "Producție", description: "Fabricare cu materiale premium" },
        { number: "06", title: "Instalare", description: "Montaj profesional la locație" },
      ],
    },
    testimonials: {
      label: "Recenzii",
      title: "Ce spun clienții noștri",
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
    contact: {
      label: "Contact",
      title: "Hai să discutăm",
      subtitle:
        "Suntem aici să vă ajutăm cu următorul proiect. Contactați-ne pentru o consultație gratuită.",
      phone: "Telefon",
      email: "Email",
      address: "Adresă",
      addressValue: "Chișinău, Moldova",
      social: "Social Media",
      formName: "Nume",
      formEmail: "Email",
      formMessage: "Mesaj",
      formSend: "Trimite mesajul",
    },
    footer: {
      rights: "Toate drepturile rezervate.",
      tagline: "Mobilier premium & soluții interioare",
    },
  },
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      portfolio: "Портфолио",
      process: "Процесс",
      testimonials: "Отзывы",
      contact: "Контакт",
    },
    hero: {
      headline: "Премиальная мебель на заказ & интерьерные решения с 2004 года",
      subheadline:
        "Индивидуальный дизайн. Исключительное мастерство. Вневременные интерьеры.",
      cta: "Запросить бесплатную консультацию",
    },
    about: {
      label: "О нас",
      title: "Создаём исключительные интерьеры с 2004 года",
      description:
        "Основанная в 2004 году в Молдове, Artpin посвятила себя созданию мебели на заказ и интерьерных решений, которые сочетают функциональность с изысканной эстетикой. Каждый проект уникален, специально разработан, чтобы отражать личность и потребности клиента.",
      features: [
        "Бесплатная дизайн-консультация",
        "Индивидуальные проекты",
        "Внимание к каждой детали",
        "Премиальные материалы",
      ],
      cycle: "Полный цикл: консультация → замеры → дизайн → производство → монтаж",
    },
    services: {
      label: "Услуги",
      title: "Что мы предлагаем",
      items: [
        { title: "Кухни на заказ", description: "Дизайн и производство уникальных кухонь" },
        { title: "Деревянные двери", description: "Интерьерные и входные двери из массива" },
        { title: "Металлические двери", description: "Надёжные и элегантные входные двери" },
        { title: "Лестницы", description: "Лестницы из дерева и металла на заказ" },
        { title: "Офисы и коммерция", description: "Мебель для офисов и коммерческих помещений" },
        { title: "Стеновые панели", description: "Декоративные панели из натурального дерева" },
        { title: "Мебель на заказ", description: "Любая мебель по индивидуальному проекту" },
        { title: "Проекты для ритейла", description: "Полные интерьеры для магазинов" },
      ],
    },
    portfolio: {
      label: "Портфолио",
      title: "Наши проекты",
      all: "Все",
      categories: {
        kitchens: "Кухни",
        doors: "Двери",
        staircases: "Лестницы",
        offices: "Офисы",
        retail: "Ритейл",
        furniture: "Мебель",
      },
      caseStudy: {
        title: "Международный проект — Франция",
        description:
          "Полный интерьер для премиального розничного магазина, доставленный во Францию, демонстрируя нашу способность реализовывать проекты на международном уровне.",
      },
    },
    process: {
      label: "Процесс",
      title: "Как мы работаем",
      steps: [
        { number: "01", title: "Консультация", description: "Обсуждаем ваше видение и потребности" },
        { number: "02", title: "Замеры", description: "Выезд на объект для точных измерений" },
        { number: "03", title: "Дизайн-проект", description: "Бесплатное предложение с 3D-визуализацией" },
        { number: "04", title: "Корректировки", description: "Правки до полного одобрения" },
        { number: "05", title: "Производство", description: "Изготовление из премиальных материалов" },
        { number: "06", title: "Монтаж", description: "Профессиональная установка на объекте" },
      ],
    },
    testimonials: {
      label: "Отзывы",
      title: "Что говорят наши клиенты",
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
    contact: {
      label: "Контакт",
      title: "Давайте обсудим",
      subtitle:
        "Мы готовы помочь вам с вашим следующим проектом. Свяжитесь с нами для бесплатной консультации.",
      phone: "Телефон",
      email: "Email",
      address: "Адрес",
      addressValue: "Кишинёв, Молдова",
      social: "Социальные сети",
      formName: "Имя",
      formEmail: "Email",
      formMessage: "Сообщение",
      formSend: "Отправить сообщение",
    },
    footer: {
      rights: "Все права защищены.",
      tagline: "Премиальная мебель & интерьерные решения",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      process: "Process",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      headline: "Premium custom furniture & interior solutions since 2004",
      subheadline:
        "Tailored design. Exceptional craftsmanship. Timeless interiors.",
      cta: "Request Free Consultation",
    },
    about: {
      label: "About Us",
      title: "Crafting exceptional interiors since 2004",
      description:
        "Founded in 2004 in Moldova, Artpin has been dedicated to creating custom furniture and interior solutions that blend functionality with refined aesthetics. Every project is unique, specially designed to reflect the personality and needs of our client.",
      features: [
        "Free design consultation",
        "Individual custom projects",
        "Attention to every detail",
        "Premium selected materials",
      ],
      cycle: "Full cycle: consultation → measurements → design → production → installation",
    },
    services: {
      label: "Services",
      title: "What we offer",
      items: [
        { title: "Custom Kitchens", description: "Design and production of unique kitchens" },
        { title: "Wooden Doors", description: "Interior and exterior solid wood doors" },
        { title: "Metal Doors", description: "Secure and elegant entry doors" },
        { title: "Staircases", description: "Custom wood and metal staircases" },
        { title: "Office & Commercial", description: "Furniture for offices and commercial spaces" },
        { title: "Wall Panels", description: "Decorative natural wood panels" },
        { title: "Custom Furniture", description: "Any piece of furniture made to order" },
        { title: "Retail Projects", description: "Complete interiors for retail stores" },
      ],
    },
    portfolio: {
      label: "Portfolio",
      title: "Our projects",
      all: "All",
      categories: {
        kitchens: "Kitchens",
        doors: "Doors",
        staircases: "Staircases",
        offices: "Offices",
        retail: "Retail",
        furniture: "Furniture",
      },
      caseStudy: {
        title: "International Project — France",
        description:
          "Complete interior for a luxury retail store delivered to France, showcasing our capability to execute projects at an international level.",
      },
    },
    process: {
      label: "Process",
      title: "How we work",
      steps: [
        { number: "01", title: "Consultation", description: "We discuss your vision and needs" },
        { number: "02", title: "On-site Measurements", description: "Site visit for precise measurements" },
        { number: "03", title: "Design Proposal", description: "Free 3D design proposal" },
        { number: "04", title: "Revisions & Approval", description: "Adjustments until complete satisfaction" },
        { number: "05", title: "Production", description: "Manufacturing with premium materials" },
        { number: "06", title: "Installation", description: "Professional on-site installation" },
      ],
    },
    testimonials: {
      label: "Testimonials",
      title: "What our clients say",
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
    contact: {
      label: "Contact",
      title: "Let's talk",
      subtitle:
        "We're ready to help you with your next project. Contact us for a free consultation.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressValue: "Chisinau, Moldova",
      social: "Social Media",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSend: "Send message",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Premium furniture & interior solutions",
    },
  },
} as const
