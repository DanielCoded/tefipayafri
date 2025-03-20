import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WaitlistForm } from "@/components/waitlist-form"
import { BackgroundAnimation } from "@/components/background-animation"
import Image from "next/image"

export default function WaitlistPage() {
  return (
    <main className="bg-[#030303] min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Future of Payments</h1>
              <p className="text-white/60 text-lg mb-8">
                Be among the first to experience TefiPay's revolutionary contactless payment solution. Sign up for our
                exclusive waitlist and get early access to the future of digital transactions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <Image
                  src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                  alt="TefiPay Waitlist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <p className="text-white text-lg font-medium">Join our growing community</p>
                    <p className="text-white/70 text-sm">Get early access and exclusive benefits</p>
                  </div>
                </div>
              </div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

