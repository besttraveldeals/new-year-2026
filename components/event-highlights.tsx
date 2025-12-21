import { Card } from "@/components/ui/card"
import { Music, Tent, Waves, Check } from "lucide-react"

export function EventHighlights() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Music className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Event Highlights</h2>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">DJ Night Party with Live Music & Dance</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">Unlimited Pure Veg Starters Buffet</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">BYOB Allowed (Bring Your Own Beverages)</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">Midnight Cake Cutting at 12:00 AM</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">Camping Stay Available (30 camps)</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-card-foreground">Morning Adventure Activities Available</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Tent className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-card-foreground">Stay Arrangement</h3>
        </div>
        <p className="text-card-foreground mb-2">Comfortable overnight camping (paid extra)</p>
        <p className="text-sm text-muted-foreground">30 camps available - Limited slots, advance booking required</p>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-card-foreground">Morning Adventures</h3>
        </div>
        <p className="text-card-foreground mb-3">Exciting water & air activities (paid extra):</p>
        <ul className="space-y-2 text-sm text-card-foreground">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Paramotor Ride
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Speed Boat
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Water Scooter
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Banana Ride
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Bumper Ride
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-primary text-primary-foreground border-primary">
        <p className="text-sm font-medium mb-2">Contact & Booking Enquiry</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="tel:9111105275" className="hover:underline font-semibold">
            📞 9111105275
          </a>
          <span>|</span>
          <a href="tel:01169320078" className="hover:underline font-semibold">
            01169320078
          </a>
        </div>
      </Card>
    </div>
  )
}
