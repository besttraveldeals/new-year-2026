import type React from "react"
import Script from "next/script"

export default function NY26Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </>
  )
}
