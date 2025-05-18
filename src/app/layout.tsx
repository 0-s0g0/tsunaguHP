import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "タイトル",
  description: "詳細",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex  flex-col  justify-center ">
            <main className="flex-1">{children}</main>
          </div>
      </body>
    </html>
  )
}
