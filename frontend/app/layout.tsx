import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Navigation, { SideMenu } from "@/components/ui/navigation"
import { ApolloProviderWrapper } from "@/lib/graphql/provider"
import { DockMenu } from "@/components/layout/dock-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Apollo Finance Terminal: Stock Quotes, Market News, & Analysis",
  description:
    "Apollo Finance Terminal is an open source stock and finance terminal, showcasing the power of Apollo GraphOS and Next.js.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} min-h-screen bg-background pb-6 antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
        >
          <ApolloProviderWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SideMenu />
              <Navigation />
              <main className="container mt-6 pl-20">{children}</main>
              {/* <DockMenu /> */}
            </ThemeProvider>
          </ApolloProviderWrapper>
        </body>
      </html>
    </ViewTransitions>
  )
}
