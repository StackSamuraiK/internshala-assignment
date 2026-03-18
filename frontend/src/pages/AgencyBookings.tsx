import { useEffect, useState } from "react";
import { getAgencyBookings } from "@/api/bookings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Booking {
  id: number;
  vehicle_model: string;
  vehicle_number: string;
  rent_per_day: string;
  customer_name: string;
  customer_email: string;
  start_date: string;
  num_days: number;
  total_cost: string;
}

export default function AgencyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgencyBookings()
      .then((res) => {
        setBookings(res.data as Booking[]);
      })
      .catch(() => {
        // Handle error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-sm text-muted-foreground">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customers who have booked your cars
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card className="glass border-dashed animate-in fade-in zoom-in duration-500">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No bookings found for your cars yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => (
            <Card key={b.id} className="card-hover border-border/40 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardHeader className="pb-3 px-6 pt-6">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                      {b.vehicle_model}
                    </CardTitle>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                      {b.vehicle_number}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter mb-1">Total Earnings</p>
                    <p className="text-xl font-bold text-primary">₹{parseFloat(b.total_cost).toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-muted/40 rounded-xl border border-border/10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Customer</p>
                    <p className="font-semibold text-sm">{b.customer_name}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{b.customer_email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Start Date</p>
                    <p className="font-semibold text-sm">
                      {new Date(b.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Duration</p>
                    <p className="font-semibold text-sm">
                      {b.num_days} {b.num_days === 1 ? "Day" : "Days"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Daily Rent</p>
                    <p className="font-semibold text-sm">₹{parseFloat(b.rent_per_day).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
