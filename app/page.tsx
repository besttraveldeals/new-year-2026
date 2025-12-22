import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-form"
import { EventHeader } from "@/components/event-header"
import { EventHighlights } from "@/components/event-highlights"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Masti Malai Marke - New Year Eve Bash 2025",
  description:
    "Join us for an unforgettable New Year celebration with DJ, unlimited food, camping, and adventure activities at Malai Marke Restaurant, Barbati",
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <EventHeader />
        <main className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <EventHighlights />
            <BookingForm />
          </div>
        </main>
        <footer className="border-t border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-center mb-4 text-card-foreground">Venue Location</h3>
            <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.4381762708194!2d80.000368!3d22.9709093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398053782215fcd3%3A0x4b38db069d660605!2sMalai%20Marke%20%7C%20River%20View%20Restaurant!5e0!3m2!1sen!2sin!4v1766383055190!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Malai Marke Restaurant Location"
              />
            </div>
            <div className="text-center mt-6 text-sm text-muted-foreground">
              <p>Malai Marke Restaurant, Barbati, Bargi Road, Jabalpur</p>
              <p className="mt-2">
                <a
                  href="https://maps.app.goo.gl/tdukoX1xs57XUyBS6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open in Google Maps →
                </a>
              </p>
            </div>
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm font-semibold text-card-foreground">Contact & Booking Enquiry</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a href="tel:9111105275" className="text-primary hover:underline">
                  📞 9111105275
                </a>
                <a href="tel:01169320078" className="text-primary hover:underline">
                  ☎️ 01169320078
                </a>
              </div>
            </div>
            <div className="text-center mt-6 text-xs text-muted-foreground">
              <p>⚠️ T&C Apply | Images are for illustration purposes only</p>
              <p className="mt-1">Safety instructions must be followed during activities</p>
              <p className="mt-1">Limited Seats | High Demand | Advance Booking Recommended</p>
            </div>
          </div>
        </footer>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </>
  )
}
