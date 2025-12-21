import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Google Sheets API endpoint
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!GOOGLE_SHEETS_URL) {
      throw new Error("Google Sheets webhook URL not configured")
    }

    // Submit to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets")
    }

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error submitting booking:", error)
    return NextResponse.json({ success: false, error: "Failed to submit booking" }, { status: 500 })
  }
}
