import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-car.png"
            alt="Luxury Car"
            className="w-full h-full object-cover brightness-50"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <Badge className="bg-primary/20 text-white hover:bg-primary/30 border-primary/30 py-1 px-4 text-xs font-bold uppercase tracking-widest">
              Premium Car Rentals
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white">
              Drive the <span className="text-primary italic">Future</span> of Mobility
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Experience unparalleled luxury and performance. Browse our curated fleet of premium vehicles from top-tier agencies worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                <Link to="/cars">Explore Fleet</Link>
              </Button>
              {!user && (
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 glass">
                  <Link to="/register/customer">Join as Member</Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="hidden md:block animate-in fade-in zoom-in duration-1000 delay-300">
            <Card className="glass border-white/20 shadow-2xl overflow-hidden scale-110">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Today's Highlight</span>
                    <span className="text-xs font-black text-primary">NEW</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Executive Sedan Series</h3>
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" /> Electric
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" /> Autopilot
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">₹4,500 <span className="text-sm font-normal text-slate-400">/ day</span></p>
                    <Button size="sm" variant="secondary" className="font-bold">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose CarRent?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a seamless booking experience with transparent pricing and top-rated agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wide Variety",
                desc: "From compact city cars to luxurious SUVs, we have it all.",
                icon: "🚗"
              },
              {
                title: "Verified Agencies",
                desc: "Only the most reputable rental agencies are listed on our platform.",
                icon: "🛡️"
              },
              {
                title: "Best Prices",
                desc: "No hidden charges. What you see is exactly what you pay.",
                icon: "💎"
              }
            ].map((f, i) => (
              <Card key={i} className="border-none bg-background/50 hover:bg-background transition-colors card-hover">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Ready to hit the road?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied travelers who trust CarRent for their journeys.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-10">
              <Link to="/register/customer">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-black text-[10px]">C</div>
            <span className="font-bold tracking-tighter">CarRent</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 CarRent Systems. All rights reserved. Professional Mobility Solutions.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
