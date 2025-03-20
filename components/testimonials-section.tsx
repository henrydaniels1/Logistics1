"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "LogiTrack transformed our supply chain with their reliable tracking and booking system. The real-time updates have significantly improved our customer satisfaction.",
    author: "Sarah Johnson",
    role: "Operations Manager, TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The morph transitions on their platform make the user experience incredibly smooth. Their logistics services are as seamless as their website!",
    author: "Michael Chen",
    role: "Supply Chain Director, GlobalRetail",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "We've reduced delivery times by 30% since partnering with LogiTrack. Their booking system is intuitive and their tracking is precise.",
    author: "Emma Rodriguez",
    role: "Logistics Coordinator, FastShip Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses that have transformed their logistics with our solutions
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <Quote className="h-12 w-12 text-primary/20 mb-6" />
                    <p className="text-xl mb-8">{testimonials[current].quote}</p>
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].author} />
                      <AvatarFallback>
                        {testimonials[current].author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonials[current].author}</h4>
                      <p className="text-muted-foreground">{testimonials[current].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <Button size="icon" variant="outline" onClick={prev} aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" onClick={next} aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

