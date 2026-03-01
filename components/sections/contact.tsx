"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import { Phone, Mail, MapPin } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
    </svg>
  )
}

export function ContactSection() {
  const { t } = useLocale()

  return (
    <section id="contact" className="bg-card py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t.contact.label}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/60 bg-background/50">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t.contact.phone}
                </p>
                <a
                  href="tel:+37369124160"
                  className="mt-1 text-base text-foreground transition-colors hover:text-primary"
                >
                  +373 69 124 160
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/60 bg-background/50">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t.contact.email}
                </p>
                <a
                  href="mailto:artpin1@mail.ru"
                  className="mt-1 text-base text-foreground transition-colors hover:text-primary"
                >
                  artpin1@mail.ru
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/60 bg-background/50">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t.contact.address}
                </p>
                <p className="mt-1 text-base text-foreground">
                  Uzinelor 43, Chișinău, Moldova
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="mt-4">
              <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                {t.contact.social}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/artpin.md/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-4 aspect-video w-full overflow-hidden border border-border/60 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.6939712073495!2d28.8837203!3d47.00698159999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97bf719c46723%3A0x367d0c3dddf9e97b!2sStrada%20Uzinelor%2043%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1772236129503!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Artpin location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-border/60 bg-background/50 p-8 lg:p-10">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t.contact.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t.contact.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full resize-none border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-none border border-primary bg-primary py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
              >
                {t.contact.formSend}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}