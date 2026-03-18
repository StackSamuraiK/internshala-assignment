import { useEffect, useState } from "react";
import { getAgencyBookings } from "@/api/bookings";
import {
  Card,
  CardContent,
  CardDescription,
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
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
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
        <p className="text-sm text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-base">{b.vehicle_model}</CardTitle>
                    <CardDescription>{b.vehicle_number}</CardDescription>
                  </div>
                  <Badge variant="outline">
                    ₹{parseFloat(b.total_cost).toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="font-medium">{b.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{b.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start date</p>
                    <p className="font-medium">
                      {new Date(b.start_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {b.num_days} {b.num_days === 1 ? "day" : "days"}
                    </p>
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
