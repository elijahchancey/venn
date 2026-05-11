import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Venn",
  description: "Discover what you and a friend have in common on Reddit",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
