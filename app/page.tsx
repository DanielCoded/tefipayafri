import HeroGeometric from "@/components/hero-geometric"
import { Partners } from "@/components/partners"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { PhotoGrid } from "@/components/photo-grid"
import { FounderBlogs } from "@/components/founder-blogs"
import { Footer } from "@/components/footer"
import { Showcase } from "@/components/showcase"

export default function Home() {
  return (
    <main className="bg-[#030303] min-h-screen">
      <HeroGeometric />
      <Partners />
      <Features />
      <Stats />
      <Showcase />
      <PhotoGrid />
      <FounderBlogs />
      <Footer />
    </main>
  )
}

