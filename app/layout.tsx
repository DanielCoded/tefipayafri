import { Lexend } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React
import Script from "next/script"

const lexend = Lexend({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "TefiPay",
              url: "https://www.tefipay.com",
              logo: "https://www.tefipay.com/logo.png",
              description:
                "TefiPay is a revolutionary fintech platform enabling seamless contactless payments across Africa. Users can link their bank cards for instant peer-to-peer and POS transactions without storing funds.",
              employee: [
                {
                  "@type": "Person",
                  name: "Isaac Chindah",
                  jobTitle: "CEO - Chief Executive Officer",
                },
                {
                  "@type": "Person",
                  name: "Daniel Ochowechi",
                  jobTitle: "CTO - Chief Technology Officer",
                },
                {
                  "@type": "Person",
                  name: "Abdulmalik Aruna",
                  jobTitle: "CMO - Chief Marketing Officer",
                },
                {
                  "@type": "Person",
                  name: "Eniola Rosilu Grace",
                  jobTitle: "COO - Chief Of Operations",
                },
              ],
              sameAs: [
                "https://twitter.com/TefiPayOfficial",
                "https://www.linkedin.com/company/tefipay/",
                "https://www.instagram.com/tefipay/",
                "https://www.facebook.com/profile.php?id=61571972757336",
              ],
            }),
          }}
        />
      </head>
      <body className={lexend.className}>{children}</body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
