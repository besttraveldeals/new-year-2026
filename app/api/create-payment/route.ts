import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, customerName, customerEmail, customerPhone } = await request.json()

    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID?.trim()
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim()

    console.log(
      "[v0] Razorpay Key ID:",
      RAZORPAY_KEY_ID ? `Present (${RAZORPAY_KEY_ID.substring(0, 10)}...)` : "Missing",
    )
    console.log(
      "[v0] Razorpay Key Secret:",
      RAZORPAY_KEY_SECRET ? `Present (length: ${RAZORPAY_KEY_SECRET.length})` : "Missing",
    )

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured")
    }

    // Create Razorpay order
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `nye_${Date.now()}`,
      notes: {
        customerName,
        customerEmail,
        customerPhone,
      },
    }

    const credentials = `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    const authHeader = Buffer.from(credentials, "utf-8").toString("base64")

    console.log("[v0] Auth header created (first 20 chars):", authHeader.substring(0, 20))
    console.log("[v0] Creating Razorpay order with amount:", amount * 100)

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(orderData),
    })

    const responseText = await response.text()
    console.log("[v0] Razorpay response status:", response.status)
    console.log("[v0] Razorpay response:", responseText.substring(0, 200))

    if (!response.ok) {
      throw new Error(`Failed to create Razorpay order: ${responseText}`)
    }

    const order = JSON.parse(responseText)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("[v0] Error creating payment order:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
