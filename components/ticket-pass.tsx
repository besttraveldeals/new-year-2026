"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"

interface TicketPassProps {
  bookingId: string
  customerName: string
  email: string
  phone: string
  packageType: string
  totalAmount: number
  wantsStay: boolean
  selectedActivities: string[]
  numPeople: number
}

const ACTIVITY_LABELS: Record<string, string> = {
  paramotor: "Paramotor Ride",
  speedBoat: "Speed Boat",
  waterScooter: "Water Scooter",
  bananaRide: "Banana Ride",
  bumperRide: "Bumper Ride",
  tractorRide: "Mini Tractor Ride",
}

export function TicketPass({
  bookingId,
  customerName,
  email,
  phone,
  packageType,
  totalAmount,
  wantsStay,
  selectedActivities,
  numPeople,
}: TicketPassProps) {
  const ticketRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvasAlternative(ticketRef.current)
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = `NYE-Ticket-${bookingId}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error("Download failed:", error)
        alert("Unable to download. Please try printing instead.")
      }
    }
  }

  const html2canvasAlternative = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    return new Promise((resolve) => {
      const width = element.offsetWidth
      const height = element.offsetHeight

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) throw new Error("Canvas context not available")

      canvas.width = width * 2
      canvas.height = height * 2
      ctx.scale(2, 2)

      const html = element.innerHTML
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="${width}" height="${height}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px; height:${height}px; ${element.getAttribute("style")}">
              ${html}
            </div>
          </foreignObject>
        </svg>
      `

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        resolve(canvas)
      }
      img.onerror = () => {
        ctx.fillStyle = "#1a3a52"
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = "#fcd34d"
        ctx.font = "24px Arial"
        ctx.textAlign = "center"
        ctx.fillText(bookingId, width / 2, height / 2)
        resolve(canvas)
      }
      img.src = `data:image/svg+xml;base64,${btoa(svg)}`
    })
  }

  const handlePrint = () => {
    if (ticketRef.current) {
      const printWindow = window.open("", "", "width=800,height=600")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>NYE Ticket - ${bookingId}</title>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                @media print { body { padding: 0; } }
              </style>
            </head>
            <body>
              ${ticketRef.current.outerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 250)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div
        ref={ticketRef}
        className="mx-auto w-full max-w-2xl p-8 rounded-lg"
        style={{
          backgroundImage: "linear-gradient(135deg, #1a3a52 0%, #0f1f2f 50%, #1a3a52 100%)",
          backgroundSize: "400% 400%",
        }}
      >
        {/* Fireworks Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎆✨</div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 mb-1">
            OFFICIAL TICKET PASS
          </h1>
          <p className="text-xl font-bold text-yellow-300">MASTI MALAI MARKE NEW YEAR EVE BASH 2025</p>
          <div className="mt-2 text-5xl">🍾</div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-yellow-300 my-6 opacity-50" />

        {/* Event Details */}
        <div className="space-y-3 mb-6 text-white text-sm md:text-base">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <span className="font-bold text-yellow-300">Venue:</span>
              <span className="ml-2">Malai Marke Restaurant, Barbati, Bargi Road, Jabalpur</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <span className="font-bold text-yellow-300">Date:</span>
              <span className="ml-2">31st December 2025</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <span className="font-bold text-yellow-300">Time:</span>
              <span className="ml-2">8:00 PM Onwards</span>
            </div>
          </div>
        </div>

        {/* Event Line-up */}
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-yellow-300/20">
          <p className="font-bold text-yellow-300 mb-2 text-center">EVENT LINE-UP</p>
          <div className="space-y-1 text-white text-sm">
            <div>💎 DJ Night with Live Music & Dance</div>
            <div>🍻 BYOB Allowed (Bring Your Own Beverages)</div>
            <div>🎂 Midnight Cake Cutting Ceremony at 12:00 AM</div>
            <div>🎉 Grand New Year Countdown Celebration</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-yellow-300 my-6 opacity-50" />

        {/* Pass Details */}
        <div className="mb-6">
          <p className="font-bold text-yellow-300 mb-3 text-center">PASS DETAILS</p>
          <div className="space-y-2 text-white text-sm md:text-base">
            <div className="flex justify-between border-b border-yellow-300/20 pb-2">
              <span className="font-semibold">Name:</span>
              <span>{customerName}</span>
            </div>
            <div className="flex justify-between border-b border-yellow-300/20 pb-2">
              <span className="font-semibold">Email:</span>
              <span className="text-xs md:text-sm">{email}</span>
            </div>
            <div className="flex justify-between border-b border-yellow-300/20 pb-2">
              <span className="font-semibold">Phone:</span>
              <span>{phone}</span>
            </div>
            <div className="flex justify-between border-b border-yellow-300/20 pb-2">
              <span className="font-semibold">Package Type:</span>
              <span className="capitalize font-bold text-yellow-300">
                {packageType === "single"
                  ? "Single Entry (1 Person)"
                  : packageType === "couple"
                    ? "Couple Pass (2 People)"
                    : `Group Pack (${numPeople} People)`}
              </span>
            </div>
            {wantsStay && (
              <div className="flex justify-between border-b border-yellow-300/20 pb-2">
                <span className="font-semibold">Add-On:</span>
                <span className="text-yellow-300">Riverside Camping Stay</span>
              </div>
            )}
            {selectedActivities.length > 0 && (
              <div className="flex justify-between border-b border-yellow-300/20 pb-2">
                <span className="font-semibold">Activities:</span>
                <span className="text-right text-xs md:text-sm">
                  {selectedActivities.map((a) => ACTIVITY_LABELS[a] || a).join(", ")}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-yellow-300 mt-2">
              <span className="font-bold text-lg text-yellow-300">Total Amount:</span>
              <span className="font-bold text-lg text-yellow-300">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Booking ID */}
        <div className="bg-yellow-300/10 border-2 border-yellow-300 rounded-lg p-4 text-center mb-6">
          <p className="text-xs text-gray-300 mb-1">UNIQUE BOOKING ID</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-300 font-mono tracking-widest">{bookingId}</p>
        </div>

        {/* Important Notes */}
        <div className="mb-6 p-3 bg-white/5 rounded-lg border border-yellow-300/20">
          <p className="font-bold text-yellow-300 mb-2 text-sm">IMPORTANT NOTES</p>
          <div className="space-y-1 text-white text-xs md:text-sm">
            <div>✓ This ticket must be presented (digital or printed) at entry</div>
            <div>✓ Riverside camping & adventure activities are optional and limited</div>
            <div>✓ Passes are limited; event may sell out – booked early!</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-yellow-300/20 pt-4">
          <p className="text-yellow-300 font-italic text-sm">Wishing you an unforgettable New Year's Eve!</p>
          <p className="text-yellow-300 font-semibold text-sm">— Best Travel Deals</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button onClick={handleDownload} className="bg-yellow-500 text-black hover:bg-yellow-400">
          Download Ticket
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="border-yellow-300 text-yellow-300 hover:bg-yellow-300/10 bg-transparent"
        >
          Print Ticket
        </Button>
      </div>
    </div>
  )
}
