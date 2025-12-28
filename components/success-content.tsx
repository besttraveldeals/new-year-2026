"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TicketPass } from "@/components/ticket-pass"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [ticketData, setTicketData] = useState<any>(null)

  useEffect(() => {
    // Get booking data from URL params
    const bookingId = searchParams.get("bookingId")
    const customerName = searchParams.get("customerName")
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")
    const packageType = searchParams.get("packageType")
    const totalAmount = searchParams.get("totalAmount")
    const wantsStay = searchParams.get("wantsStay") === "true"
    const selectedActivities = searchParams.get("selectedActivities")?.split(",").filter(Boolean) || []
    const numPeople = Number.parseInt(searchParams.get("numPeople") || "1")

    if (bookingId && customerName) {
      setTicketData({
        bookingId,
        customerName: decodeURIComponent(customerName),
        email: decodeURIComponent(email || ""),
        phone: decodeURIComponent(phone || ""),
        packageType,
        totalAmount: Number.parseInt(totalAmount || "0"),
        wantsStay,
        selectedActivities,
        numPeople,
      })
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Booking</h1>
            <p className="text-muted-foreground mb-6">Unable to load your ticket information.</p>
            <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground">
              Back to Booking
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Booking Confirmed!</h1>
            <p className="text-xl text-muted-foreground">Your ticket is ready. Download or print it below.</p>
          </div>

          <TicketPass {...ticketData} />

          <div className="mt-8 text-center">
            <Button onClick={() => router.push("/")} variant="outline" className="border-primary text-primary">
              Book Another Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
