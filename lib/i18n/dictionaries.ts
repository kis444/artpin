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
      descriptions: {
  k1: "Шедевр современного дизайна, эта кухня гармонично сочетает минималистичные линии с натуральными текстурами. Матовые фасады в оттенке греж дополнены столешницей из кварца с тонкими прожилками, а просторный центральный остров предлагает как место для приготовления пищи, так и зону для общения. Светодиодное освещение создает идеальную атмосферу для семейных вечеров.",
  k2: "Просторная кухня, созданная для любителей гастрономии, которые любят готовить в компании близких. Многофункциональный остров объединяет варочную панель, мойку и зону для сервировки, превращая приготовление пищи в интерактивное представление. Фасады из массива копченого дуба привносят природное тепло, а встроенная техника из нержавеющей стали обеспечивает профессиональную производительность.",
  k3: "Элегантность, доведенная до крайности через простоту. Каждая деталь этой кухни тщательно продумана для создания воздушного пространства без отвлекающих визуальных элементов. Полностью плоские фасады с системой открывания push-to-open сливаются со стенами, создавая чистую, почти скульптурную эстетику. Столешница из натурального камня и подвесной остров добавляют нотки сдержанного изыска.",
  d1: "Дверь из массива дуба, вырезанная вручную и отделанная натуральными маслами, которые подчеркивают аутентичную текстуру дерева. Кованая фурнитура ручной работы дополняет вневременной дизайн, превращая каждый переход порога в момент изящества.",
  s1: "Впечатляющая лестница из американского ореха с чистыми линиями и ограждением из закаленного стекла. Каждая ступень, вырезанная из цельного куска дерева, кажется парящей в воздухе благодаря изобретательной системе крепления. Центральный элемент, определяющий всю архитектуру дома.",
  o1: "Рабочее пространство, вдохновляющее на творчество и продуктивность. Просторный стол из вишневого дерева, подвесные полки и эргономичная мебель созданы для комфорта в течение всего дня. Естественный свет обильно проникает через большие окна, а зеленые растения придают нотку свежести и жизненной силы.",
  r1: "Бутик-концепция для престижного французского бренда. Пространство элегантно сочетает витрины с зонами отдыха для клиентов, созданными из благородных материалов, таких как мрамор и латунь. Драматическое освещение представляет каждый продукт как произведение искусства, обеспечивая незабываемый шопинг-опыт.",
  f1: "Уникальный предмет мебели, вырезанный вручную из старого ореха возрастом более 100 лет. Этот шкаф впечатляет гармоничными пропорциями, резными деталями, вдохновленными природой, и ручной отделкой натуральным воском. Просторные места для хранения дополнены выдвижными ящиками, обитыми внутри бархатом.",
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
      descriptions: {
  k1: "A masterpiece of contemporary design, this kitchen harmoniously blends minimalist lines with natural textures. The matte fronts in greige are complemented by a quartz countertop with fine veining, while the generous central island offers both food preparation space and a socializing area. The LED ambient lighting creates the perfect atmosphere for family evenings.",
  k2: "Spacious kitchen, designed for gastronomy enthusiasts who love to cook in the company of loved ones. The multifunctional island integrates a cooktop, sink and serving area, turning meal preparation into an interactive spectacle. The solid smoked oak fronts bring natural warmth, while the discreetly integrated stainless steel appliances ensure professional performance.",
  k3: "Elegance taken to the extreme through simplicity. Every detail of this kitchen has been carefully calibrated to create an airy space, without distracting visual elements. The completely flat fronts with push-to-open system blend with the walls, offering a pure, almost sculptural aesthetic. The natural stone countertop and suspended island add notes of discreet refinement.",
  d1: "Solid oak door, hand-carved and finished with natural oils that highlight the authentic wood texture. Hand-forged ironwork completes the timeless design, turning every threshold crossing into a moment of grace.",
  s1: "Impressive American walnut staircase with clean lines and tempered glass railing. Each step, carved from a single piece of wood, seems to float in the air due to the ingenious fastening system. A centerpiece that defines the entire architecture of the house.",
  o1: "A workspace that inspires creativity and productivity. The generous cherry wood desk, floating shelves and ergonomic furniture are designed to provide comfort throughout the day. Natural light pours generously through the large windows, while green plants add a touch of freshness and vitality.",
  r1: "Boutique concept for a prestigious French brand. The space elegantly combines generous display windows with client relaxation areas, created from noble materials such as marble and brushed brass. Dramatic lighting showcases each product as a work of art, offering a memorable shopping experience.",
  f1: "A unique piece of furniture, hand-carved from over 100-year-old walnut. This cabinet impresses with its harmonious proportions, carved details inspired by nature, and hand-finish with natural wax. Generous storage spaces are complemented by drawers lined with velvet inside.",
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
