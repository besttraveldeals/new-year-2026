import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, customerName, customerEmail, customerPhone } = await request.json()

    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

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

    const authHeader = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order")
    }

    const order = await response.json()

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
