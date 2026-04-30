import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { LenisProvider } from "@/components/shared/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { ParticleFieldMount } from "@/components/three/ParticleFieldMount";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Selin Hair Studio · Old Town Alexandria",
  description:
    "Where artistry meets identity. A premium hair studio in Old Town Alexandria, VA. Color, cuts, styling and treatments since 2010.",
  metadataBase: new URL("https://selinhairstudio.com"),
  openGraph: {
    title: "Selin Hair Studio",
    description: "Where artistry meets identity. Old Town Alexandria.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${grotesk.variable}`}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text-light)]">
        <LenisProvider>
          <ScrollProgress />
          <GrainOverlay />
          <ParticleFieldMount />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#100E0B",
                border: "1px solid rgba(201,169,110,0.25)",
                color: "#F4F0E8",
                fontFamily: "var(--font-inter)",
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
