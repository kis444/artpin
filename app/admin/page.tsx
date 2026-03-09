"use client"

import { useState, useEffect } from "react"
import { 
  Save, LogOut, Eye, FileText, Layers, MessageSquare, Settings,
  Plus, Trash2, Image as ImageIcon, Video, Folder, Upload, X, ChevronRight
} from "lucide-react"

// ==============================================
// TIPURI (copy from content-artpin)
// ==============================================
type Locale = "en" | "ro" | "ru"
type Tab = "hero" | "about" | "testimonials" | "portfolio" | "caseStudy" | "settings"

type HeroContent = {
  headline_en: string; headline_ro: string; headline_ru: string
  subheadline_en: string; subheadline_ro: string; subheadline_ru: string
  cta_en: string; cta_ro: string; cta_ru: string
}

type AboutContent = {
  label_en: string; label_ro: string; label_ru: string
  title_en: string; title_ro: string; title_ru: string
  description_en: string; description_ro: string; description_ru: string
  features: string[]
  cycle_en: string; cycle_ro: string; cycle_ru: string
}

type Testimonial = {
  id: string
  name: string
  role: string
  text_en: string; text_ro: string; text_ru: string
}

type PortfolioCategory = "kitchens" | "doors" | "staircases" | "offices" | "retail" | "furniture"

type MediaItem = {
  type: 'image' | 'video'
  src: string
  thumbnail?: string
}

type PortfolioProject = {
  id: string
  category: PortfolioCategory
  title_en: string; title_ro: string; title_ru: string
  description_en: string; description_ro: string; description_ru: string
  coverImage: string
  media: MediaItem[]
  featured?: boolean
}

type CaseStudy = {
  title_en: string; title_ro: string; title_ru: string
  description_en: string; description_ro: string; description_ru: string
  image: string
}

type SiteSettings = {
  phone: string
  email: string
  address: string
  instagram: string
  facebook: string
  telegram: string
}

// ==============================================
// PAROLA ADMIN
// ==============================================
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "kinelup123"

// ==============================================
// COMPONENTE MICI
// ==============================================

function Field({ label, value, onChange, multiline = false, rows = 3, type = "text" }: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
  type?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-600 resize-y"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
      )}
    </div>
  )
}

function LangTabs({ active, onChange }: { active: Locale; onChange: (l: Locale) => void }) {
  return (
    <div className="flex gap-1 mb-4">
      {[
        { code: 'en', label: 'EN' },
        { code: 'ro', label: 'RO' },
        { code: 'ru', label: 'RU' }
      ].map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code as Locale)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            active === l.code
              ? "bg-amber-600 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-slate-100 mt-6">
      {saved && <p className="text-xs text-green-600 font-medium">✓ Salvat cu succes</p>}
      {!saved && <div />}
      <button
        onClick={onSave}
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
      >
        <Save className="h-4 w-4" />
        Salvează
      </button>
    </div>
  )
}

// ==============================================
// HERO TAB - CORECTAT
// ==============================================
function HeroTab() {
  const [lang, setLang] = useState<Locale>("ro")
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState<HeroContent>({
    headline_en: "", headline_ro: "", headline_ru: "",
    subheadline_en: "", subheadline_ro: "", subheadline_ru: "",
    cta_en: "", cta_ro: "", cta_ru: "",
  })

  useEffect(() => {
    fetch("/api/admin/content?section=hero")
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  // VERSION CORECTATĂ - folosim string în loc de keyof
  const updateField = (field: string, value: string) => {
    setData(prev => ({ 
      ...prev, 
      [`${field}_${lang}`]: value 
    }))
    setSaved(false)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "hero", data }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Hero Section</h2>
      <LangTabs active={lang} onChange={setLang} />
      <div className="flex flex-col gap-4">
        <Field label="Titlu principal" value={data[`headline_${lang}`]} onChange={(v) => updateField("headline", v)} />
        <Field label="Subtitlu" value={data[`subheadline_${lang}`]} onChange={(v) => updateField("subheadline", v)} multiline rows={2} />
        <Field label="Buton CTA" value={data[`cta_${lang}`]} onChange={(v) => updateField("cta", v)} />
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}

// ==============================================
// ABOUT TAB - CORECTAT
// ==============================================
function AboutTab() {
  const [lang, setLang] = useState<Locale>("ro")
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState<AboutContent>({
    label_en: "", label_ro: "", label_ru: "",
    title_en: "", title_ro: "", title_ru: "",
    description_en: "", description_ro: "", description_ru: "",
    features: [],
    cycle_en: "", cycle_ro: "", cycle_ru: "",
  })

  useEffect(() => {
    fetch("/api/admin/content?section=about")
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  // VERSION CORECTATĂ - folosim string în loc de keyof
  const updateField = (field: string, value: string) => {
    setData(prev => ({ 
      ...prev, 
      [`${field}_${lang}`]: value 
    }))
    setSaved(false)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "about", data }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Despre Noi</h2>
      <LangTabs active={lang} onChange={setLang} />
      <div className="flex flex-col gap-4">
        <Field label="Etichetă" value={data[`label_${lang}`]} onChange={(v) => updateField("label", v)} />
        <Field label="Titlu" value={data[`title_${lang}`]} onChange={(v) => updateField("title", v)} />
        <Field label="Descriere" value={data[`description_${lang}`]} onChange={(v) => updateField("description", v)} multiline rows={5} />
        <Field label="Ciclu complet" value={data[`cycle_${lang}`]} onChange={(v) => updateField("cycle", v)} multiline rows={2} />
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}

// ==============================================
// TESTIMONIALS TAB
// ==============================================
function TestimonialsTab() {
  const [lang, setLang] = useState<Locale>("ro")
  const [saved, setSaved] = useState(false)
  const [items, setItems] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch("/api/admin/content?section=testimonials")
      .then(r => r.json())
      .then(arr => setItems(Array.isArray(arr) ? arr : []))
      .catch(() => setItems([]))
  }, [])

  const update = (idx: number, field: string, value: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item))
    setSaved(false)
  }

  const updateLang = (idx: number, field: string, value: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [`${field}_${lang}`]: value } : item))
    setSaved(false)
  }

  const add = () => {
    setItems(prev => [...prev, {
      id: `t-${Date.now()}`,
      name: "",
      role: "",
      text_en: "", text_ro: "", text_ru: "",
    }])
    setSaved(false)
  }

  const remove = (idx: number) => {
    setItems(prev => prev.filter((_, i) => i !== idx))
    setSaved(false)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "testimonials", data: items }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Testimoniale</h2>
        <button onClick={add} className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-800">
          <Plus className="h-4 w-4" /> Adaugă
        </button>
      </div>
      <LangTabs active={lang} onChange={setLang} />
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <Field label="Nume" value={item.name} onChange={(v) => update(idx, "name", v)} />
                <Field label="Funcție" value={item.role} onChange={(v) => update(idx, "role", v)} />
              </div>
              <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-600 mt-5">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Field label={`Text (${lang.toUpperCase()})`} value={item[`text_${lang}`] ?? ""} onChange={(v) => updateLang(idx, "text", v)} multiline rows={3} />
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}

// ==============================================
// CASE STUDY TAB - CORECTAT
// ==============================================
function CaseStudyTab() {
  const [lang, setLang] = useState<Locale>("ro")
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState<CaseStudy>({
    title_en: "", title_ro: "", title_ru: "",
    description_en: "", description_ro: "", description_ru: "",
    image: "",
  })

  useEffect(() => {
    fetch("/api/admin/content?section=caseStudy")
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  // VERSION CORECTATĂ - folosim string în loc de keyof
  const updateField = (field: string, value: string) => {
    setData(prev => ({ 
      ...prev, 
      [`${field}_${lang}`]: value 
    }))
    setSaved(false)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "caseStudy", data }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Case Study</h2>
      <LangTabs active={lang} onChange={setLang} />
      <div className="flex flex-col gap-4">
        <Field label="Titlu" value={data[`title_${lang}`]} onChange={(v) => updateField("title", v)} />
        <Field label="Descriere" value={data[`description_${lang}`]} onChange={(v) => updateField("description", v)} multiline rows={4} />
        <Field label="URL Imagine" value={data.image} onChange={(v) => setData(prev => ({ ...prev, image: v }))} />
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}

// ==============================================
// SETTINGS TAB
// ==============================================
function SettingsTab() {
  const [saved, setSaved] = useState(false)
  const [data, setData] = useState<SiteSettings>({
    phone: "", email: "", address: "",
    instagram: "", facebook: "", telegram: "",
  })

  useEffect(() => {
    fetch("/api/admin/content?section=settings")
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  const update = (field: keyof SiteSettings, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "settings", data }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Setări Site</h2>
      <div className="flex flex-col gap-4">
        <Field label="Telefon" value={data.phone} onChange={(v) => update("phone", v)} />
        <Field label="Email" value={data.email} onChange={(v) => update("email", v)} />
        <Field label="Adresă" value={data.address} onChange={(v) => update("address", v)} multiline rows={2} />
        <div className="border-t pt-4 mt-2">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Social Media</h3>
          <div className="grid grid-cols-1 gap-3">
            <Field label="Instagram" value={data.instagram} onChange={(v) => update("instagram", v)} />
            <Field label="Facebook" value={data.facebook} onChange={(v) => update("facebook", v)} />
            <Field label="Telegram" value={data.telegram} onChange={(v) => update("telegram", v)} />
          </div>
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}


// ==============================================
// PORTOFOLIO TAB - CU UPLOAD
// ==============================================
function PortfolioTab() {
  const [lang, setLang] = useState<Locale>("ro")
  const [saved, setSaved] = useState(false)
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | "all">("all")
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content?section=portfolio")
      .then(r => r.json())
      .then(arr => setProjects(Array.isArray(arr) ? arr : []))
      .catch(() => setProjects([]))
  }, [])

  const categories: PortfolioCategory[] = ["kitchens", "doors", "staircases", "offices", "retail", "furniture"]

  const categoryNames: Record<PortfolioCategory, string> = {
    kitchens: "Bucătării",
    doors: "Uși",
    staircases: "Scări",
    offices: "Birouri",
    retail: "Retail",
    furniture: "Mobilă"
  }

  const filtered = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  // Funcție pentru upload imagini
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        })
        
        if (!response.ok) throw new Error('Upload failed')
        const blob = await response.json()
        
        return {
          type: 'image' as const,
          src: blob.url
        }
      })
      
      const newMedia = await Promise.all(uploadPromises)
      
      // Adăugăm noile imagini la proiect
      if (editingProject) {
        const updatedProject = {
          ...editingProject,
          media: [...editingProject.media, ...newMedia]
        }
        setEditingProject(updatedProject)
        
        // Dacă nu există coverImage, setăm prima imagine ca cover
        if (!updatedProject.coverImage && updatedProject.media.length > 0) {
          updatedProject.coverImage = updatedProject.media[0].src
        }
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Eroare la upload. Încearcă din nou.')
    } finally {
      setUploading(false)
      // Resetăm inputul
      e.target.value = ''
    }
  }

  // Funcție pentru a șterge un proiect
const deleteProject = async (projectId: string) => {
  if (!confirm('Sigur vrei să ștergi acest proiect?')) return

  try {
    const response = await fetch(`/api/admin/content?section=portfolio&id=${projectId}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Delete failed')

    // Actualizăm lista de proiecte
    setProjects(projects.filter(p => p.id !== projectId))
    setSaved(false)
    
  } catch (error) {
    console.error('Delete error:', error)
    alert('Eroare la ștergere. Încearcă din nou.')
  }
}

  // Funcție pentru a seta o imagine ca cover
  const setAsCover = (project: PortfolioProject, mediaSrc: string) => {
    const updatedProject = { ...project, coverImage: mediaSrc }
    setEditingProject(updatedProject)
  }

  // Funcție pentru a șterge o imagine
  const removeMedia = (project: PortfolioProject, index: number) => {
    const newMedia = project.media.filter((_, i) => i !== index)
    const updatedProject = { 
      ...project, 
      media: newMedia,
      // Dacă ștergem cover-ul, setăm primul element ca new cover
      coverImage: project.coverImage === project.media[index].src 
        ? (newMedia[0]?.src || '') 
        : project.coverImage
    }
    setEditingProject(updatedProject)
  }

  const save = () => {
    fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "portfolio", data: projects }),
    }).then(() => setSaved(true))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Portofoliu</h2>
        <button
          onClick={() => {
            const newProject: PortfolioProject = {
              id: `p-${Date.now()}`,
              category: "kitchens",
              title_en: "", title_ro: "", title_ru: "",
              description_en: "", description_ro: "", description_ru: "",
              coverImage: "",
              media: [],
              featured: false,
            }
            setEditingProject(newProject)
          }}
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-800"
        >
          <Plus className="h-4 w-4" /> Proiect Nou
        </button>
      </div>

      {/* Categorii */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-amber-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Toate
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-amber-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      {/* Lista proiecte */}
      <div className="grid gap-3 mb-6">
     {filtered.map(project => (
  <div
    key={project.id}
    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
  >
    <div 
      className="flex-1 cursor-pointer"
      onClick={() => setEditingProject(project)}
    >
      <p className="font-medium text-slate-800">{project.title_ro}</p>
      <p className="text-sm text-slate-500">{categoryNames[project.category]}</p>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setEditingProject(project)
        }}
        className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
        title="Editează"
      >
        <FileText className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          deleteProject(project.id)
        }}
        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
        title="Șterge"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <ChevronRight className="h-5 w-5 text-slate-400" />
    </div>
  </div>
))}
      </div>

      {/* Editor proiect */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">
                {editingProject.id.startsWith('p-') ? 'Proiect Nou' : 'Editează Proiect'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <LangTabs active={lang} onChange={setLang} />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Titlu RO" value={editingProject.title_ro} onChange={(v) => setEditingProject({...editingProject, title_ro: v})} />
              <Field label="Titlu EN" value={editingProject.title_en} onChange={(v) => setEditingProject({...editingProject, title_en: v})} />
              <Field label="Titlu RU" value={editingProject.title_ru} onChange={(v) => setEditingProject({...editingProject, title_ru: v})} />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Categorie</label>
              <select
                value={editingProject.category}
                onChange={(e) => setEditingProject({...editingProject, category: e.target.value as PortfolioCategory})}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{categoryNames[cat]}</option>
                ))}
              </select>
            </div>

            {/* ZONA DE UPLOAD MEDIA */}
            <div className="mb-6 p-4 border border-slate-200 rounded-lg">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Imagini / Video
              </label>
              
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, editingProject.id)}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-amber-50 file:text-amber-700
                    hover:file:bg-amber-100"
                />
                {uploading && (
                  <span className="text-sm text-amber-600">Se încarcă...</span>
                )}
              </div>

              {/* Grid de imagini */}
              {editingProject.media.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {editingProject.media.map((media, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-slate-200">
                        <img 
                          src={media.src} 
                          alt={`Media ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Overlay cu acțiuni */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        {media.src !== editingProject.coverImage && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setAsCover(editingProject, media.src)
                            }}
                            className="p-1 bg-white rounded-full text-xs text-slate-700 hover:bg-amber-50"
                            title="Setează ca imagine cover"
                          >
                            ⭐
                          </button>
                        )}
                        {media.src === editingProject.coverImage && (
                          <span className="p-1 bg-amber-500 rounded-full text-xs text-white" title="Imagine cover">
                            ★
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeMedia(editingProject, idx)
                          }}
                          className="p-1 bg-white rounded-full text-xs text-red-600 hover:bg-red-50"
                          title="Șterge"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Field label="URL Imagine Cover (sau selectează de mai sus)" value={editingProject.coverImage} onChange={(v) => setEditingProject({...editingProject, coverImage: v})} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <Field label="Descriere RO" value={editingProject.description_ro} onChange={(v) => setEditingProject({...editingProject, description_ro: v})} multiline rows={3} />
              <Field label="Descriere EN" value={editingProject.description_en} onChange={(v) => setEditingProject({...editingProject, description_en: v})} multiline rows={3} />
              <Field label="Descriere RU" value={editingProject.description_ru} onChange={(v) => setEditingProject({...editingProject, description_ru: v})} multiline rows={3} />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Anulează
              </button>
              <button
                onClick={() => {
                  if (editingProject.id.startsWith('p-')) {
                    setProjects([...projects, editingProject])
                  } else {
                    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
                  }
                  setEditingProject(null)
                  setSaved(false)
                }}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700"
              >
                Salvează proiectul
              </button>
            </div>
          </div>
        </div>
      )}

      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}

// ==============================================
// PAGINA PRINCIPALĂ ADMIN
// ==============================================
const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "hero", label: "Hero", icon: Eye },
  { id: "about", label: "Despre noi", icon: FileText },
  { id: "testimonials", label: "Testimoniale", icon: MessageSquare },
  { id: "portfolio", label: "Portofoliu", icon: Layers },
  { id: "caseStudy", label: "Case Study", icon: ImageIcon },
  { id: "settings", label: "Setări", icon: Settings },
]

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("hero")

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError("")
    } else {
      setError("Parolă incorectă")
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Settings className="h-6 w-6 text-amber-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">ARTPIN Admin</h1>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              onClick={login}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg text-sm"
            >
              Intră
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-100">
          <p className="font-bold text-slate-800 text-sm">ARTPIN Admin</p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === id
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Ieși
          </button>
        </div>
      </aside>

      {/* Content */}
<main className="flex-1 p-8 overflow-y-auto pt-24">
        <div className="max-w-3xl mx-auto">
          {activeTab === "hero" && <HeroTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "portfolio" && <PortfolioTab />}
          {activeTab === "caseStudy" && <CaseStudyTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  )
}