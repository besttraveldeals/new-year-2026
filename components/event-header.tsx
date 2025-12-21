import { Sparkles, Calendar, Clock, MapPin } from "lucide-react"

export function EventHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl lg:text-5xl font-bold text-center text-balance">
            <span className="text-primary">NEW YEAR EVE BASH</span>
            <span className="block text-foreground mt-2">2025</span>
          </h1>
          <Sparkles className="h-6 w-6 text-primary" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm lg:text-base text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>31st December 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>8:00 PM Onwards</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <a
              href="https://maps.app.goo.gl/SVn9zkhik4QQsHZU7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Malai Marke, Barbati
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
