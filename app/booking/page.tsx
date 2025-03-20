"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Truck, Calendar, Clock, MapPin, Package, ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "@/components/footer"

const serviceTypes = [
  {
    id: "express",
    name: "Express Delivery",
    description: "Same-day or next-day delivery for urgent shipments",
    icon: Truck,
  },
  {
    id: "standard",
    name: "Standard Shipping",
    description: "2-3 business days delivery time",
    icon: Package,
  },
  {
    id: "international",
    name: "International Shipping",
    description: "Global shipping with customs clearance support",
    icon: MapPin,
  },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: "",
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: "",
    pickupTime: "",
    packageDetails: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceTypeChange = (value: any) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LogiTrack</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </a>
            <a href="/track" className="text-sm font-medium transition-colors hover:text-primary">
              Track Package
            </a>
            <a href="/booking" className="text-sm font-medium text-primary">
              Book Service
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Book a Logistics Service</h1>
              <p className="text-xl text-muted-foreground">
                Schedule a pickup and delivery with our reliable logistics services
              </p>
            </motion.div>

            {!isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Booking Form</CardTitle>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          1
                        </div>
                        <div className={`w-8 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          2
                        </div>
                        <div className={`w-8 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          3
                        </div>
                      </div>
                    </div>
                    <CardDescription>
                      {step === 1 && "Select service type and provide shipping details"}
                      {step === 2 && "Schedule pickup date and time"}
                      {step === 3 && "Provide contact information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <Label>Service Type</Label>
                            <RadioGroup
                              value={formData.serviceType}
                              onValueChange={handleServiceTypeChange}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              {serviceTypes.map((service) => (
                                <Label key={service.id} htmlFor={service.id} className="cursor-pointer">
                                  <div
                                    className={`border rounded-lg p-4 h-full transition-all ${
                                      formData.serviceType === service.id
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-muted-foreground/50"
                                    }`}
                                  >
                                    <RadioGroupItem value={service.id} id={service.id} className="sr-only" />
                                    <div className="flex flex-col h-full">
                                      <div className="mb-3">
                                        <service.icon className="h-8 w-8 text-primary" />
                                      </div>
                                      <h3 className="font-medium mb-1">{service.name}</h3>
                                      <p className="text-sm text-muted-foreground">{service.description}</p>
                                    </div>
                                  </div>
                                </Label>
                              ))}
                            </RadioGroup>
                          </div>

                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="pickupAddress">Pickup Address</Label>
                              <Textarea
                                id="pickupAddress"
                                name="pickupAddress"
                                value={formData.pickupAddress}
                                onChange={handleChange}
                                placeholder="Enter full address including city, state, and zip code"
                                rows={3}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="deliveryAddress">Delivery Address</Label>
                              <Textarea
                                id="deliveryAddress"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                                placeholder="Enter full address including city, state, and zip code"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={handleNext}
                              disabled={!formData.serviceType || !formData.pickupAddress || !formData.deliveryAddress}
                              className="gap-2"
                            >
                              Next Step <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="pickupDate">Pickup Date</Label>
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                                <Input
                                  id="pickupDate"
                                  name="pickupDate"
                                  type="date"
                                  value={formData.pickupDate}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pickupTime">Preferred Pickup Time</Label>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                                <Select
                                  value={formData.pickupTime}
                                  onValueChange={(value) => handleSelectChange("pickupTime", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                                    <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                                    <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="packageDetails">Package Details</Label>
                            <Textarea
                              id="packageDetails"
                              name="packageDetails"
                              value={formData.packageDetails}
                              onChange={handleChange}
                              placeholder="Describe your package (dimensions, weight, contents, special handling requirements, etc.)"
                              rows={4}
                            />
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button
                              type="button"
                              onClick={handleNext}
                              disabled={!formData.pickupDate || !formData.pickupTime}
                              className="gap-2"
                            >
                              Next Step <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="contactName">Full Name</Label>
                              <Input
                                id="contactName"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactPhone">Phone Number</Label>
                              <Input
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email Address</Label>
                            <Input
                              id="contactEmail"
                              name="contactEmail"
                              type="email"
                              value={formData.contactEmail}
                              onChange={handleChange}
                              placeholder="Enter your email address"
                            />
                          </div>

                          <div className="border rounded-lg p-4 bg-muted/50">
                            <h3 className="font-medium mb-4">Booking Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground mb-1">Service Type</p>
                                <p className="font-medium">
                                  {serviceTypes.find((s) => s.id === formData.serviceType)?.name || ""}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Pickup Date & Time</p>
                                <p className="font-medium">
                                  {formData.pickupDate} (
                                  {formData.pickupTime === "morning"
                                    ? "8AM - 12PM"
                                    : formData.pickupTime === "afternoon"
                                      ? "12PM - 4PM"
                                      : "4PM - 8PM"}
                                  )
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Pickup Address</p>
                                <p className="font-medium">{formData.pickupAddress}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Delivery Address</p>
                                <p className="font-medium">{formData.deliveryAddress}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={
                                isSubmitting ||
                                !formData.contactName ||
                                !formData.contactEmail ||
                                !formData.contactPhone
                              }
                              className="gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  Processing<span className="animate-pulse">...</span>
                                </>
                              ) : (
                                <>
                                  Complete Booking <ArrowRight className="h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="border-green-200 dark:border-green-900">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your booking has been successfully submitted. A confirmation email has been sent to{" "}
                      {formData.contactEmail}.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg text-left mb-6">
                      <h3 className="font-medium mb-4">Booking Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Booking Reference</p>
                          <p className="font-medium">
                            BK-
                            {Math.floor(Math.random() * 1000000)
                              .toString()
                              .padStart(6, "0")}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Service Type</p>
                          <p className="font-medium">
                            {serviceTypes.find((s) => s.id === formData.serviceType)?.name || ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Pickup Date & Time</p>
                          <p className="font-medium">
                            {formData.pickupDate} (
                            {formData.pickupTime === "morning"
                              ? "8AM - 12PM"
                              : formData.pickupTime === "afternoon"
                                ? "12PM - 4PM"
                                : "4PM - 8PM"}
                            )
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Contact</p>
                          <p className="font-medium">{formData.contactName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild variant="outline">
                        <a href="/">Return to Home</a>
                      </Button>
                      <Button asChild>
                        <a href="/track">Track Your Packages</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

