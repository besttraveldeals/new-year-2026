import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    console.log("[v0] Submitting booking data:", bookingData)

    // Google Sheets API endpoint
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!GOOGLE_SHEETS_URL) {
      throw new Error("Google Sheets webhook URL not configured")
    }

    const formData = new URLSearchParams()
    Object.entries(bookingData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value))
      }
    })

    console.log("[v0] Sending to Google Sheets")

    // Submit to Google Sheets using POST with form data
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      redirect: "follow",
    })

    console.log("[v0] Google Sheets response status:", response.status)
    const responseText = await response.text()
    console.log("[v0] Google Sheets response:", responseText.substring(0, 200))

    if (response.status >= 200 && response.status < 400) {
      console.log("[v0] Booking submitted successfully")
      return NextResponse.json({
        success: true,
        message: "Booking submitted successfully",
      })
    }

    throw new Error(`Google Sheets returned status ${response.status}`)
  } catch (error) {
    console.error("[v0] Error submitting booking:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit booking",
      },
      { status: 500 },
    )
  }
}
