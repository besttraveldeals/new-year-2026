"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

type PackageType = "single" | "couple" | "group"

const PACKAGE_PRICES = {
  single: 2000,
  couple: 3500,
  group: 10000,
}

export function BookingForm() {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("single")
  const [wantsStay, setWantsStay] = useState(false)
  const [wantsAdventure, setWantsAdventure] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    groupSize: "",
  })

  const basePrice = PACKAGE_PRICES[selectedPackage]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to Google Sheets
      const sheetData = {
        timestamp: new Date().toISOString(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        package: selectedPackage,
        groupSize: selectedPackage === "group" ? formData.groupSize : selectedPackage === "couple" ? "2" : "1",
        wantsStay: wantsStay ? "Yes" : "No",
        wantsAdventure: wantsAdventure ? "Yes" : "No",
        amount: basePrice,
      }

      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetData),
      })

      if (!response.ok) throw new Error("Failed to submit booking")

      // Initiate Razorpay payment
      await initiatePayment()
    } catch (error) {
      console.error("[v0] Booking submission error:", error)
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const initiatePayment = async () => {
    try {
      const configResponse = await fetch("/api/razorpay-config")
      if (!configResponse.ok) throw new Error("Failed to fetch payment configuration")
      const { keyId } = await configResponse.json()

      // Create Razorpay order
      const orderResponse = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: basePrice,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        }),
      })

      if (!orderResponse.ok) throw new Error("Failed to create payment order")

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: keyId, // Use key fetched from server
        amount: orderData.amount,
        currency: "INR",
        name: "NYE Bash 2025",
        description: `${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} Package`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#d4af37",
        },
        handler: (response: any) => {
          toast({
            title: "Payment Successful!",
            description: "Your booking is confirmed. Check your email for details.",
          })
          // Reset form
          setFormData({ fullName: "", email: "", phone: "", groupSize: "" })
          setWantsStay(false)
          setWantsAdventure(false)
          setIsSubmitting(false)
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false)
          },
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("[v0] Payment initiation error:", error)
      toast({
        title: "Payment Failed",
        description: "Could not initiate payment. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6 lg:p-8 bg-card border-border">
      <h2 className="text-2xl font-bold mb-6 text-card-foreground">Book Your Tickets</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-card-foreground">Select Package</Label>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setSelectedPackage("single")}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedPackage === "single"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground">Single Entry</p>
                  <p className="text-sm text-muted-foreground">1 Person</p>
                </div>
                <p className="text-xl font-bold text-primary">₹2,000</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPackage("couple")}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedPackage === "couple"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground">Couple Package</p>
                  <p className="text-sm text-muted-foreground">2 People</p>
                </div>
                <p className="text-xl font-bold text-primary">₹3,500</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPackage("group")}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedPackage === "group"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground">Group Package</p>
                  <p className="text-sm text-muted-foreground">6 People</p>
                </div>
                <p className="text-xl font-bold text-primary">₹10,000</p>
              </div>
            </button>
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-card-foreground">
              Full Name *
            </Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              className="mt-1.5 bg-input border-border text-card-foreground"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-card-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="mt-1.5 bg-input border-border text-card-foreground"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-card-foreground">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="mt-1.5 bg-input border-border text-card-foreground"
            />
          </div>

          {selectedPackage === "group" && (
            <div>
              <Label htmlFor="groupSize" className="text-card-foreground">
                Number of People *
              </Label>
              <Input
                id="groupSize"
                type="number"
                required
                min="1"
                max="6"
                value={formData.groupSize}
                onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                placeholder="6"
                className="mt-1.5 bg-input border-border text-card-foreground"
              />
            </div>
          )}
        </div>

        {/* Add-ons */}
        <div className="space-y-3 pt-2 border-t border-border">
          <Label className="text-base font-semibold text-card-foreground">Additional Options (Paid Extra)</Label>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
            <Checkbox id="stay" checked={wantsStay} onCheckedChange={(checked) => setWantsStay(checked as boolean)} />
            <label
              htmlFor="stay"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-foreground cursor-pointer flex-1"
            >
              Camping Stay (Limited availability)
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
            <Checkbox
              id="adventure"
              checked={wantsAdventure}
              onCheckedChange={(checked) => setWantsAdventure(checked as boolean)}
            />
            <label
              htmlFor="adventure"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-foreground cursor-pointer flex-1"
            >
              Morning Adventure Activities
            </label>
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-card-foreground">Entry Package Total</span>
            <span className="text-2xl font-bold text-primary">₹{basePrice.toLocaleString()}</span>
          </div>
          {(wantsStay || wantsAdventure) && (
            <p className="text-xs text-muted-foreground mt-2">
              * Additional charges for stay and activities will be collected separately
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>Proceed to Payment</>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Limited passes available. Secure your spot now for an unforgettable New Year celebration!
        </p>
      </form>
    </Card>
  )
}
