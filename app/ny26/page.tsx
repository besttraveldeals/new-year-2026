import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-form"
import { EventHeader } from "@/components/event-header"
import { EventHighlights } from "@/components/event-highlights"

export const metadata: Metadata = {
  title: "New Year Eve Bash 2025 - Book Your Tickets",
  description:
    "Join us for an unforgettable New Year celebration with DJ, unlimited food, camping, and adventure activities at Malai Marke River View Restaurant",
}

export default function NYE2026Page() {
  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <EventHighlights />
          <BookingForm />
        </div>
      </main>
    </div>
  )
}
