// app/admin/layout.tsx
// Layout simplu pentru admin - fără header, footer sau alte elemente ale site-ului public

export const metadata = {
  title: "Artpin - Panou Administrare",
  description: "Panou de administrare pentru site-ul Artpin",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}