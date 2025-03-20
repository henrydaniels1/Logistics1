"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Fast & Reliable Logistics Solutions",
    description: "Track your packages in real-time and book services with just a few clicks.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Global Shipping Network",
    description: "Connect with our worldwide logistics network for seamless delivery.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Secure & Transparent",
    description: "End-to-end encryption and full transparency on your shipment status.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-orange-500 to-red-500",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-20`} />
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt="Logistics background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button asChild size="lg" className="gap-2">
                  <Link href="/track">
                    Track Package <Package className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link href="/booking">
                    Book Service <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-full h-full flex items-center justify-center">
                    <Truck className="h-32 w-32 text-primary" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-6" : "bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

