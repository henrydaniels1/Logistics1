"use client"

import { motion } from "framer-motion"
import { Truck, Package, Clock, Globe, Shield, BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day and next-day delivery options for urgent shipments.",
  },
  {
    icon: Package,
    title: "Warehousing",
    description: "Secure storage solutions with inventory management.",
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: "Reliable global logistics with customs clearance support.",
  },
  {
    icon: Clock,
    title: "Time-Critical Logistics",
    description: "Specialized solutions for time-sensitive deliveries.",
  },
  {
    icon: Shield,
    title: "Secure Transport",
    description: "Enhanced security measures for high-value shipments.",
  },
  {
    icon: BarChart3,
    title: "Supply Chain Analytics",
    description: "Data-driven insights to optimize your logistics operations.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Logistics Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to meet your business needs
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

