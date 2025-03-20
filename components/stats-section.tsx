"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Globe, Package, Truck, Users } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: 5000000,
    label: "Packages Delivered",
    suffix: "+",
  },
  {
    icon: Globe,
    value: 150,
    label: "Countries Served",
    suffix: "+",
  },
  {
    icon: Truck,
    value: 10000,
    label: "Delivery Vehicles",
    suffix: "+",
  },
  {
    icon: Users,
    value: 2000000,
    label: "Happy Customers",
    suffix: "+",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-primary-foreground/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <CountUp end={stat.value} suffix={stat.suffix} className="text-4xl md:text-5xl font-bold" />
              <p className="text-lg mt-2 text-primary-foreground/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
function CountUp ( { end, suffix = "", className = "" }: { end: number; suffix?: string; className?: string } )
{
  const [ count, setCount ] = useState( 0 )

  useEffect( () =>
  {
    let startTime: number
    let animationFrame: number

    const step = ( timestamp: number ) =>
    {
      if ( !startTime ) startTime = timestamp
      const progress = Math.min( ( timestamp - startTime ) / 2000, 1 )
      setCount( Math.floor( progress * end ) )

      if ( progress < 1 )
      {
        animationFrame = requestAnimationFrame( step )
      }
    }

    animationFrame = requestAnimationFrame( step )
    return () => cancelAnimationFrame( animationFrame )
  }, [ end ] )

  return (
    <div className={className}>
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

