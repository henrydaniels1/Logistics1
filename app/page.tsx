"use client"
import Link from "next/link"
import { Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LogiTrack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/track" className="text-sm font-medium transition-colors hover:text-primary">
              Track Package
            </Link>
            <Link href="/booking" className="text-sm font-medium transition-colors hover:text-primary">
              Book Service
            </Link>
            <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/track">Track Package</Link>
            </Button>
            <Button asChild>
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}

