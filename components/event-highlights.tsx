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
            <span className="text-card-foreground">Grand New Year Countdown Celebration</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Tent className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-card-foreground">Camping Stay (Optional)</h3>
        </div>
        <p className="text-card-foreground mb-2 font-semibold text-primary">₹1,200-1,500 per person</p>
        <ul className="space-y-2 text-sm text-card-foreground mb-3">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Riverside camping tents
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Includes Dinner
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Comfortable overnight stay
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">⚠️ Only 30 camps available - First come, first serve</p>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-card-foreground">Morning Adventure Activities</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Weekend prices apply | Subject to weather & availability</p>
        <ul className="space-y-2 text-sm text-card-foreground">
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Paramotor Ride
            </span>
            <span className="font-semibold text-primary">₹2,000-2,500</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Speed Boat
            </span>
            <span className="font-semibold text-primary">₹150-250</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Water Scooter
            </span>
            <span className="font-semibold text-primary">₹400-500</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Banana Ride
            </span>
            <span className="font-semibold text-primary">₹200-300</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Bumper Ride
            </span>
            <span className="font-semibold text-primary">₹400-500</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Mini Tractor Ride (Rider + 2)
            </span>
            <span className="font-semibold text-primary">₹200-300</span>
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
        <p className="text-xs mt-3 opacity-90">🌐 https://new-year.besttraveldeals.in/</p>
      </Card>
    </div>
  )
}
